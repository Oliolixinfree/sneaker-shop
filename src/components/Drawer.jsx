import React from 'react'

const Drawer = ({onClose, onRemoveCartItem, cartItems = []}) => {
	return (
		<div className="overlay">
			<div className="drawer">
				<h2 className="mb-30 d-flex justify-between">
					Корзина 
					<img onClick={onClose} src="/img/btn-remove.svg" alt="btn-close" />
				</h2>
				{cartItems.length > 0 
					?
					<>
						<div className="items">
							{cartItems.map(i => (
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
									<b>21 498$</b>
								</li>
								<li>
									<span>Налог 5%:</span>
									<div></div>
									<b>1074$</b>
								</li>
							</ul>
							<button className="greenBtn">
								Оформить заказ 
								<img src="/img/arrow.svg" alt="arrow" />
							</button>
						</div>
					</>
					:
					<div className="cartEmpty d-flex align-center justify-center flex-column flex">
						<img 
							className="mb-20" 
							width="120px" 
							height="120px" 
							src="/img/cart-empty.jpg" 
							alt="cart-empty" 
						/>
						<h2>Корзина пуста</h2>
						<p>Добавте хотя бы одну пару кроссовок, что бы сделать заказ.</p>
						<button onClick={onClose} className="greenBtn">
							<img src="/img/arrow-back.svg" alt="arrow-back" />
							Вернуться назад
						</button>
					</div>
				}
			</div>
		</div>
	)
}

export default Drawer