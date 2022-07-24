import axios from "axios";
import { useEffect, useState } from "react";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import {Routes, Route} from 'react-router-dom'
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

function App() {

	const [items, setItems] = useState([])

	const [searchValue, setSearchValue] = useState('')

	const [cartOpened, setCartOpend] = useState(false)
	const [cartItems, setCartItems] = useState([])

	const [favorites, setFavorites] = useState([])

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
		axios.get('https://62dbd59bd1d97b9e0c54ca6b.mockapi.io/favorites').then(resp => {
			setFavorites(resp.data)
		})
	}, [])

	const onAddToCart = (obj) => {
		axios.post('https://62dbd59bd1d97b9e0c54ca6b.mockapi.io/cart', obj)
		setCartItems(prev => [...prev, obj] )
	}

	const onRemoveCartItem = (id) => {
		axios.delete(`https://62dbd59bd1d97b9e0c54ca6b.mockapi.io/cart/${id}`)
		setCartItems(prev => prev.filter(item => item.id !==id) )
	}

	const onAddToFavorite = async (obj) => {
		try {
			if (favorites.find((favObj) => favObj.id === obj.id)) {
				axios.delete(`https://62dbd59bd1d97b9e0c54ca6b.mockapi.io/favorites/${obj.id}`);
			} else {
				const { data } = await axios.post('https://62dbd59bd1d97b9e0c54ca6b.mockapi.io/favorites', obj);
				setFavorites((prev) => [...prev, data]);
			}
		} catch (error) {
			alert('Не удалось добавить в фавориты');
		}
	};


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
			<Header onOpenCart={() => setCartOpend(true)} />
			<Routes>
				<Route path="/" element={<Home 
					items={items} 
					searchValue={searchValue} 
					setSearchValue={searchValue}
					onChangeSearchValue={onChangeSearchValue}
					onAddToFavorite={onAddToFavorite}
					onAddToCart={onAddToCart}
				/>} />
				<Route path="/favorites" element={<Favorites
					items={favorites}
					onAddToFavorite={onAddToFavorite}
				/>} />
			</Routes>
		</div>
	);
}

export default App;
