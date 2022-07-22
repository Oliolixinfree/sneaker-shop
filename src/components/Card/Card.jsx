import React from 'react'
import styles from '../Card/Card.module.scss'

const Card = (props) => {

	const handleAlert = () => {
		alert(`Кроссовки ${props.title} добавлены в корзину`)
	}

	return (
		<div className={styles.card}>
			<div className={styles.favorite}>
				<img src="/img/heart-unliked.svg" alt="btn-unliked" />
			</div>
			<img height={112} width={133} src={props.img} alt="sneaker" />
			<h5>
				{props.title}
			</h5>
			<div className="d-flex justify-between align-center">
				<div className="d-flex flex-column">
					<span>Цена: </span>
					<b>{props.price}$</b>
				</div>
				<button className="button" onClick={handleAlert}>
					<img width={11} height={11} src="/img/plus.svg" alt="plus-btn" />
				</button>
			</div>
		</div>
	)
}

export default Card