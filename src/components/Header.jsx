import React from 'react'

const Header = (props) => {
	return (
		<header className="d-flex justify-between align-center p-40">
			<div className="d-flex align-center">
				<img width={40} height={40} src="/img/logo.png" alt="logo" /> 
				<div>
					<h3 className="text-uppercase">React sneakers</h3>
					<p className="opacity-5">Магазин лучших кроссовок</p>
				</div>
			</div>
			<ul className="d-flex align-center">
				<li 
					onClick={props.onOpenCart}
					className="d-flex mr-30 cu-p"
				>
					<img width={18} height={18} src='/img/cart.svg' alt="cart" />
					<span>150$</span>
				</li>
				<li 
					className='cu-p'
					onClick={props.onOpenFav}
				>
					<img width={18} height={18} src='/img/favorites.svg' alt="favorites-icon" />
				</li>
				<li>
					<img width={18} height={18} src='/img/user.svg' alt="user-icon" />
				</li>
			</ul>
		</header>
	)
}

export default Header