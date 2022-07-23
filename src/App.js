import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./components/Card/Card";
import Drawer from "./components/Drawer";
import Favorites from "./components/Favorites";
import Header from "./components/Header";

function App() {

	const [items, setItems] = useState([])

	const [cartOpened, setCartOpend] = useState(false)
	const [cartItems, setCartItems] = useState([])
	const [favorites, setFavorites] = useState([])

	const [searchValue, setSearchValue] = useState('')

	const [favoritesOpened, setFavoritesOpend] = useState(false)
	const [favoritestItems, setFavoritesItems] = useState([])

	const onChangeSearchValue = (e) => {
		setSearchValue(e.target.value)
	}

	useEffect(() => {
		// async await/try catch?????
		axios.get('https://62dbd59bd1d97b9e0c54ca6b.mockapi.io/items').then(resp => {
			setItems(resp.data)
		})
		axios.get('https://62dbd59bd1d97b9e0c54ca6b.mockapi.io/cart').then(resp => {
			setCartItems(resp.data)
		})
	}, [])

	const onAddToFavorites = (i) => {
		setFavoritesItems( prev => [...prev, i])
	}

	const onAddToCart = (i) => {
		axios.post('https://62dbd59bd1d97b9e0c54ca6b.mockapi.io/cart', i)
		setCartItems(prev => [...prev, i] )
	}

	const onRemoveCartItem = (id) => {
		axios.delete(`https://62dbd59bd1d97b9e0c54ca6b.mockapi.io/cart/${id}`)
		setCartItems(prev => prev.filter(item => item.id !==id) )
	}

	const onAddToFavorite = (i) => {
		axios.post('https://62dbd59bd1d97b9e0c54ca6b.mockapi.io/favorites', i)
		setFavorites(prev => [...prev, i] )
	}


	return (
		<div className="wrapper clear">
			{cartOpened 
				? 
				<Drawer 
					cartItems={cartItems} 
					onRemoveCartItem={onRemoveCartItem} 
					onClose={() => setCartOpend(false)}  
				/> 
				: 
				null
			}
			{favoritesOpened 
				? 
				<Favorites 
					favoritestItems={favoritestItems} 
					onCloseFav={() => setFavoritesOpend(false)}  
				/> 
				: 
				null
			}
			<Header 
				onOpenCart={() => setCartOpend(true)}
				onOpenFav={() => setFavoritesOpend(true)}
			/>
			<div className="content p-40">
				<div className="d-flex align-center justify-between mb-40">
					<h1>Все кроссовки</h1>
					<div className="search-block d-flex">
						<img src="/img/search.svg" alt="search-btn" />
						<input
							value={searchValue}
							onChange={onChangeSearchValue} 
							placeholder="Поиск..." 
							type='text'
						/>
						{searchValue && <img 
							onClick={() => setSearchValue('')} 
							className="clear cu-p" 
							src="/img/btn-remove.svg" 
							alt="clear-btn" 
						/>}
					</div>
				</div>
				<div className="d-flex flex-wrap">
					{items
						.filter(i => i.title.toLowerCase().includes(searchValue.toLowerCase()))
						.map(i => (
							<Card 
								key={i.id} 
								title={i.title} 
								img={i.img} 
								price={i.price}
								onFavorites={() => onAddToFavorite(i)}
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
