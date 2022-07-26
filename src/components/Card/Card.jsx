import React, { useContext, useState } from 'react'
import styles from '../Card/Card.module.scss'
import ContentLoader from "react-content-loader"
import AppContext from '../../context'

const Card = ({
	id, 
	title, 
	img, 
	price, 
	onFavorites, 
	onPlus, 
	favorited = false, 
	loading
}) => {
	const {isItemAdded} = useContext(AppContext)
	const [isFavorite, setIsFavorite] = useState(favorited) 

	const onClickPlus = () => {
		onPlus({id, title, img, price})
	}

	const onClickFavorites = () => {
		onFavorites({id, title, img, price,})
		setIsFavorite(!isFavorite)
	}

	return (
		<div className={styles.card}>
			{loading ? <ContentLoader 
				speed={2}
				width={155}
				height={200}
				viewBox="0 0 155 200"
				backgroundColor="#f3f3f3"
				foregroundColor="#ecebeb"
			>
				<rect x="0" y="0" rx="10" ry="10" width="155" height="90" /> 
				<rect x="0" y="100" rx="5" ry="5" width="155" height="15" /> 
				<rect x="0" y="123" rx="5" ry="5" width="100" height="15" /> 
				<rect x="0" y="171" rx="5" ry="5" width="80" height="25" /> 
				<rect x="123" y="164" rx="10" ry="10" width="32" height="32" />
			</ContentLoader> :
			<>
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
					src={isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} 
					alt="plus-btn" 
				/>
			</div>
			</>
		}
		</div>
	)
}

export default Card