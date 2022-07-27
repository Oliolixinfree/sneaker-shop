import React from 'react'
import {Link} from 'react-router-dom'
import { useCart } from '../hooks/useCart'

const Header = (props) => {

	const {totalPrice} = useCart()

	return (
		<header className="d-flex justify-between align-center p-40">
			<Link to='/'>
				<div className="d-flex align-center">
					<img width={40} height={40} src="/img/logo.png" alt="logo" /> 
					<div>
						<h3 className="text-uppercase">React sneakers</h3>
						<p className="opacity-5">Магазин лучших кроссовок</p>
					</div>
				</div>
			</Link>
			<ul className="d-flex align-center">
				<li 
					onClick={props.onOpenCart}
					className="d-flex mr-30 cu-p"
				>
					<img width={18} height={18} src='/img/cart.svg' alt="cart" />
					<span>{totalPrice}$</span>
				</li>
				<Link to='/favorites'>
					<li 
						className='cu-p'
					>
						<img width={18} height={18} src='/img/favorites.svg' alt="favorites-icon" />
					</li>
				</Link>
				<li>
					<img width={18} height={18} src='/img/user.svg' alt="user-icon" />
				</li>
			</ul>
		</header>
	)
}

export default Header