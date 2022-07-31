import React, { useState } from 'react'
import axios from 'axios'
import Info from '../Info'
import styles from '../Drawer/Drawer.module.scss'
import { useCart } from '../../hooks/useCart';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Drawer = ({onClose, onRemoveCartItem, items = [], opened}) => {

	const {cartItems, setCartItems, totalPrice} = useCart()
	const [isOrderComplete, setOrderIsComplete] = useState(false)
	const [orderId, setOrderId] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	console.log(cartItems)

	const onClickOrder = async () => {
		try {
			setIsLoading(true)
			const {data} = await axios.post('https://62dbd59bd1d97b9e0c54ca6b.mockapi.io/orders', {
				items: cartItems,
			})
			
			setOrderId(data.id)
			setOrderIsComplete(true)
			setCartItems([])

			// костыль
			for (let i = 0; i < cartItems.length; i++) {
				const item = cartItems[i];
				await axios.delete(`https://62dbd59bd1d97b9e0c54ca6b.mockapi.io/cart/${item.id}`)
				await delay(1000);
			}
		} catch (error) {
			alert('Ошибка при создании заказа: ')
		}
		setCartItems([])
		setIsLoading(false)
	}

	return (
		<div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
			<div className={styles.drawer}>
				<h2 className="mb-30 d-flex justify-between">
					Корзина 
					<img onClick={onClose} src="/img/btn-remove.svg" alt="btn-close" />
				</h2>
				{items.length > 0 
					?
					<>
						<div className="items">
							{items.map(i => (
								<div key={i.id} className="cartItem d-flex align-center mb-20">
									<div style={{ backgroundImage: `url(${i.img})` }} className="cartItemImg"></div>
									<div className="mr-20 flex">
										<p className="mb-5">{i.title}</p>
										<b>{i.price}$</b>
									</div>
									<img 
										onClick={() => onRemoveCartItem(i.id)} 
										className="removeBtn" 
										src="/img/btn-remove.svg" 
										alt="btn-remove" 
									/>
								</div>
							))}
						</div>
						<div className="cartTotlaBlock">
							<ul>
								<li>
									<span>Итого:</span>
									<div></div>
									<b>{totalPrice}$</b>
								</li>
								<li>
									<span>Налог 5%:</span>
									<div></div>
									<b>{totalPrice * 0.05}$</b>
								</li>
							</ul>
							<button disabled={isLoading} onClick={onClickOrder} className="greenBtn">
								Оформить заказ 
								<img src="/img/arrow.svg" alt="arrow" />
							</button>
						</div>
					</>
					:
					<Info 
						title={isOrderComplete ? "Заказ оформлен!" : "Корзина пуста"} 
						description={isOrderComplete ? 
							`Ваш заказ #${orderId} скоро будет передан курьерской доставке` :
							"Добавте хотя бы одну пару кроссовок, что бы сделать заказ."
						} 
						img={isOrderComplete ? "/img/complete-order.jpg" : "/img/cart-empty.jpg"} 
					/>
				}
			</div>
		</div>
	)
}

export default Drawer