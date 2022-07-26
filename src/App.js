import axios from "axios";
import { useEffect, useState } from "react";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import {Routes, Route} from 'react-router-dom'
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";


function App() {
	const [items, setItems] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [searchValue, setSearchValue] = useState('')

	const [cartOpened, setCartOpend] = useState(false)
	const [cartItems, setCartItems] = useState([])

	const [favorites, setFavorites] = useState([])

	const onChangeSearchValue = (e) => {
		setSearchValue(e.target.value)
	}

	useEffect(() => {
		// async await/try catch?????
		async function fetchData() {
			setIsLoading(true)

			const cartResponce = await axios.get('https://62dbd59bd1d97b9e0c54ca6b.mockapi.io/cart')
			const favoritesResponce = await axios.get('https://62dbd59bd1d97b9e0c54ca6b.mockapi.io/favorites')
			const itemsResponce = await axios.get('https://62dbd59bd1d97b9e0c54ca6b.mockapi.io/items')

			setIsLoading(false)
			setCartItems(cartResponce.data)
			setFavorites(favoritesResponce.data)
			setItems(itemsResponce.data)
		}

		fetchData()
	}, [])

	const onAddToCart = (obj) => {
		if(cartItems.find(item => Number(item.id) === Number(obj.id))) {
			axios.delete(`https://62dbd59bd1d97b9e0c54ca6b.mockapi.io/cart/${obj.id}`)
			setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))
		} else {
			axios.post('https://62dbd59bd1d97b9e0c54ca6b.mockapi.io/cart', obj)
			setCartItems(prev => [...prev, obj] )
		}
		
	}

	const onRemoveCartItem = (id) => {
		axios.delete(`https://62dbd59bd1d97b9e0c54ca6b.mockapi.io/cart/${id}`)
		setCartItems(prev => prev.filter(item => item.id !==id) )
	}

	const onAddToFavorite = async (obj) => {
		try {
			if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
				axios.delete(`https://62dbd59bd1d97b9e0c54ca6b.mockapi.io/favorites/${obj.id}`)
				setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))
			} else {
				const { data } = await axios.post('https://62dbd59bd1d97b9e0c54ca6b.mockapi.io/favorites', obj)
				setFavorites((prev) => [...prev, data]);
			}
		} catch (error) {
			alert('Не удалось добавить в фавориты');
		}
	};

	const isItemAdded = (id) => {
		return cartItems.some(obj => Number(obj.id) === Number(id))
	}

	return (
		<AppContext.Provider value={ {items,cartItems, favorites, isItemAdded, onAddToFavorite} }>
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
						cartItems={cartItems}
						searchValue={searchValue} 
						setSearchValue={searchValue}
						onChangeSearchValue={onChangeSearchValue}
						onAddToFavorite={onAddToFavorite}
						onAddToCart={onAddToCart}
						isLoading={isLoading}
					/>} />
					<Route path="/favorites" element={<Favorites />} />
				</Routes>
			</div>
		</AppContext.Provider>
	);
}

export default App;
