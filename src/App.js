import { useState } from "react";
import Card from "./components/Card/Card";
import Drawer from "./components/Drawer";
import Header from "./components/Header";

function App() {

	const [sneakers, setSneakers] = useState([
		{	
			id: 1,
			title: 'Мужские Кроссовки Nike Blazer Mid Suede',
			img: '/img/sneakers/1.jpg',
			price: 120,
		},
		{	
			id: 2,
			title: 'Мужские Кроссовки Nike Air Max 270',
			img: '/img/sneakers/2.jpg',
			price: 130,
		},
		{	
			id: 3,
			title: 'Мужские Кроссовки Nike Blazer Mid Suede',
			img: '/img/sneakers/3.jpg',
			price: 80,
		},
		{	
			id: 4,
			title: 'Кроссовки Puma X Aka Boku Future Rider',
			img: '/img/sneakers/4.jpg',
			price: 80,
		},
		{	
			id: 5,
			title: 'Мужские Кроссовки Under Armour Curry 8',
			img: '/img/sneakers/5.jpg',
			price: 150,
		},
		{	
			id: 6,
			title: 'Мужские Кроссовки Nike Kyrie 7',
			img: '/img/sneakers/6.jpg',
			price: 165,
		},
	])
	
	return (
		<div className="wrapper clear">
			{/* Корзина */}
			
			<Drawer />
			{/* header */}
			<Header />
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
						sneakers.map(i => (
							<Card key={i.id} title={i.title} img={i.img} price={i.price}  />
						))
					}
					
				</div>
			</div>
		</div>
	);
}

export default App;
