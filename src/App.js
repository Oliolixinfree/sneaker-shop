import axios from "axios";
import { useEffect, useState } from "react";
import Drawer from "./components/Drawer/Drawer";
import Header from "./components/Header";
import {Routes, Route} from 'react-router-dom'
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";
import Orders from "./pages/Orders";


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
		async function fetchData() {
			try {
				setIsLoading(true)
				const [cartResponce, favoritesResponce, itemsResponce] = await Promise.all([
					axios.get('https://62dbd59bd1d97b9e0c54ca6b.mockapi.io/cart'),
					axios.get('https://62dbd59bd1d97b9e0c54ca6b.mockapi.io/favorites'),
					axios.get('https://62dbd59bd1d97b9e0c54ca6b.mockapi.io/items')
				])
				// const cartResponce = await axios.get('https://62dbd59bd1d97b9e0c54ca6b.mockapi.io/cart')
				// const favoritesResponce = await axios.get('https://62dbd59bd1d97b9e0c54ca6b.mockapi.io/favorites')
				// const itemsResponce = await axios.get('https://62dbd59bd1d97b9e0c54ca6b.mockapi.io/items')

				setIsLoading(false)
				setCartItems(cartResponce.data)
				setFavorites(favoritesResponce.data)
				setItems(itemsResponce.data)
			} catch (error) {
				alert('Ошибка при загрузке данных')
				console.log(error)
			}
		}

		fetchData()
	}, [])

	const onAddToCart = async (obj) => {
		try {
			const findItems = cartItems.find(item => Number(item.parentId) === Number(obj.id))
			if(findItems) {
				setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)))
				await axios.delete(`https://62dbd59bd1d97b9e0c54ca6b.mockapi.io/cart/${findItems.id}`)
			} else {
				setCartItems(prev => [...prev, obj] )
				const  {data} = await axios.post('https://62dbd59bd1d97b9e0c54ca6b.mockapi.io/cart', obj)
				setCartItems(prev => prev.map(item => {
					if(item.parentId === data.parentId) {
						return {
							...item,
							id: data.id,
						}
					}
					return item
				}))
			}
		} catch (error) {
			alert('Ошибка при добавлении в корзину')
			console.log(error)
		}
	}

	const onRemoveCartItem = (id) => {
		try {
			axios.delete(`https://62dbd59bd1d97b9e0c54ca6b.mockapi.io/cart/${id}`)
			setCartItems(prev => prev.filter(item => Number(item.id) !== Number(id)) )
		} catch (error) {
			alert('Ошибка при удалении из корзины')
			console.log(error)
		}
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
			alert('Не удалось добавить в фавориты')
			console.log(error)
		}
	};

	const isItemAdded = (id) => {
		return cartItems.some(obj => Number(obj.parentId) === Number(id))
	}

	return (
		<AppContext.Provider value={{ 
			items,
			cartItems, 
			favorites, 
			isItemAdded, 
			onAddToFavorite,
			onAddToCart,
			setCartOpend,
			setCartItems,
		}}>
			<div className="wrapper clear">
				
					<Drawer 
						items={cartItems} 
						onRemoveCartItem={onRemoveCartItem} 
						onClose={() => setCartOpend(false)}
						opened={cartOpened}
					/> 
				
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
					<Route path="/orders" element={<Orders />} />
				</Routes>
			</div>
		</AppContext.Provider>
	);
}

export default App;
