import React from 'react'

const Card = () => {
	return (
		<div className="card">
			<div className="favorite">
				<img src="/img/heart-unliked.svg" alt="btn-unliked" />
			</div>
			<img height={112} width={133} src="/img/sneakers/1.jpg" alt="sneaker" />
			<h5>
				Мужские кроссовки Nike Blazer Mid Suede
			</h5>
			<div className="d-flex justify-between align-center">
				<div className="d-flex flex-column">
					<span>Цена: </span>
					<b>120$</b>
				</div>
				<button className="button">
					<img width={11} height={11} src="/img/plus.svg" alt="plus-btn" />
				</button>
			</div>
		</div>
	)
}

export default Card