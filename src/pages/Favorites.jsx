import React from 'react'
import Card from '../components/Card/Card'

const Favorites = ({ items, onAddToFavorite }) => {
    return (
        
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>Мои закладки</h1>
            </div>
            <div className="d-flex flex-wrap">
                {items.map((i, index) => (
                    <Card 
                        key={index} 
                        favorited={true}
                        onFavorites={onAddToFavorite}
                        {...i}
                    />))
                }
            </div>
        </div>
    )
}

export default Favorites