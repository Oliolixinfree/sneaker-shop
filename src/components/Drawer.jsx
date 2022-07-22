import React from 'react'

const Drawer = () => {
	return (
		<div style={{display: 'none'}} className="overlay">
			<div className="drawer">
				<h2 className="mb-30 d-flex justify-between">
					Корзина 
					<img src="/img/btn-remove.svg" alt="btn-remove" />
				</h2>
				<div className="items">
					<div className="cartItem d-flex align-center mb-20">
						<div style={{backgroundImage: 'url(/img/sneakers/1.jpg)'}} className="cartItemImg"></div>
						<div className="mr-20 flex">
							<p className="mb-5">Мужские кроссовки Nike Air Max 270</p>
							<b>120$</b>
						</div>
						<img className="removeBtn" src="/img/btn-remove.svg" alt="btn-remove" />
					</div>
					<div className="cartItem d-flex align-center mb-20">
						<div style={{backgroundImage: 'url(/img/sneakers/1.jpg)'}} className="cartItemImg"></div>
						<div className="mr-20 flex">
							<p className="mb-5">Мужские кроссовки Nike Air Max 270</p>
							<b>120$</b>
						</div>
						<img className="removeBtn" src="/img/btn-remove.svg" alt="btn-remove" />
					</div>
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
					<button className="greenBtn">Оформить заказ <img src="/img/arrow.svg" alt="arrow" /></button>
				</div>
			</div>
		</div>
	)
}

export default Drawer