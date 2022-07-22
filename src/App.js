import Card from "./components/Card";
import Drawer from "./components/Drawer";
import Header from "./components/Header";

function App() {
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
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
				</div>
			</div>
		</div>
	);
}

export default App;
