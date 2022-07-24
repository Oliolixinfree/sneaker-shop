import React, { useState } from 'react'
import styles from '../Card/Card.module.scss'

const Card = ({id, title, img, price, onFavorites, onPlus, favorited = false }) => {

	const [isAdded, setIsAdded] = useState(false) 
	const [isFavorite, setIsFavorite] = useState(favorited) 

	const onClickPlus = () => {
		onPlus({id, title, img, price})
		setIsAdded(!isAdded)
	}

	const onClickFavorites = () => {
		onFavorites({id, title, img, price,})
		setIsFavorite(!isFavorite)
	}

	return (
		<div className={styles.card}>
			<div className={styles.favorite}>
				<img onClick={onClickFavorites} 
					src={isFavorite 
					? "/img/liked.svg" 
					: "/img/unliked.svg"} alt="btn-unliked" 
				/>
			</div>
			<img height={112} width={133} src={img} alt="sneaker" />
			<h5>{title}</h5>
			<div className="d-flex justify-between align-center">
				<div className="d-flex flex-column">
					<span>Цена: </span>
					<b>{price}$</b>
				</div>
				<img 
					className={styles.btnPlus}
					onClick={onClickPlus} 
					src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} 
					alt="plus-btn" 
				/>
			</div>
		</div>
	)
}

export default Card