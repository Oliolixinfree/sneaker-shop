import React, { useState } from 'react'
import styles from '../Card/Card.module.scss'

const Card = ({title, img, price, onFavorites, onPlus }) => {

	const [isAdded, setIsAdded] = useState(false) 
	const [isFavorite, setIsFavorite] = useState(false) 

	const onClickPlus = () => {
		onPlus()
		setIsAdded(!isAdded)
	}

	const onClickFavorites = () => {
		onFavorites()
		setIsFavorite(!isFavorite)
	}

	return (
		<div className={styles.card}>
			<div className={styles.favorite}>
				<img onClick={onClickFavorites} src={isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"} alt="btn-unliked" />
			</div>
			<img height={112} width={133} src={img} alt="sneaker" />
			<h5>{title}</h5>
			<div className="d-flex justify-between align-center">
				<div className="d-flex flex-column">
					<span>Цена: </span>
					<b>{price}$</b>
				</div>
				{/* <button className="button" onClick={props.onClickPlus}> */}
					<img 
						className={styles.btnPlus}
						onClick={onClickPlus} 
						src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} 
						alt="plus-btn" 
					/>
				{/* </button> */}
			</div>
		</div>
	)
}

export default Card