import { useEffect, useState } from "react";
import Card from "./components/Card/Card";
import Drawer from "./components/Drawer";
import Favorites from "./components/Favorites";
import Header from "./components/Header";

function App() {

	const [items, setItems] = useState([])

	const [cartOpened, setCartOpend] = useState(false)
	const [cartItems, setCartItems] = useState([])

	const [favoritesOpened, setFavoritesOpend] = useState(false)
	const [favoritestItems, setFavoritesItems] = useState([])

	useEffect(() => {
		// async await/try catch?????
		fetch('https://62dbd59bd1d97b9e0c54ca6b.mockapi.io/items')
		.then(resp => {
			return resp.json()
		})
		.then(json => {
			setItems(json)
		})
	}, [])

	const onAddToFavorites = (i) => {
			setFavoritesItems( prev => [...prev, i])
	}

	const onAddToCart = (i) => {
		setCartItems(prev => [...prev, i] )
	}

	return (
		<div className="wrapper clear">
			{cartOpened ? <Drawer cartItems={cartItems} onClose={() => setCartOpend(false)}  /> : null}
			{favoritesOpened ? <Favorites favoritestItems={favoritestItems} onCloseFav={() => setFavoritesOpend(false)}  /> : null}
			<Header 
				onOpenCart={() => setCartOpend(true)}
				onOpenFav={() => setFavoritesOpend(true)}
			/>
			<div className="content p-40">
				<div className="d-flex align-center justify-between mb-40">
					<h1>Все кроссовки</h1>
					<div className="search-block d-flex">
						<img src="/img/search.svg" alt="search-btn" />
						<input placeholder="Поиск..." />
					</div>
				</div>
				<div className="d-flex flex-wrap">
					{
						items.map(i => (
							<Card 
								key={i.id} 
								title={i.title} 
								img={i.img} 
								price={i.price}
								onFavorites={() => {onAddToFavorites(i)}}
								onPlus={() => onAddToCart(i)}
							/>
						))
					}
					
				</div>
			</div>
		</div>
	);
}

export default App;
