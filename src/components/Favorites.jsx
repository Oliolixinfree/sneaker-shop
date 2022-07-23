import React from 'react'

const Favorites = ({onCloseFav, favoritestItems = []}) => {
    return (
        <div className="overlay">
        <div className="drawer">
            <h2 className="mb-30 d-flex justify-between">
                Избранное 
                <img onClick={onCloseFav} src="/img/btn-remove.svg" alt="btn-close" />
            </h2>
            <div className="items">
                {favoritestItems.map( i => (
                    <div key={i.id} className="cartItem d-flex align-center mb-20">
                        <div style={{backgroundImage: `url(${i.img})`}} className="cartItemImg"></div>
                        <div className="mr-20 flex">
                            <p className="mb-5">{i.title}</p>
                            <b>{i.price}$</b>
                        </div>
                        <img className="removeBtn" src="/img/btn-remove.svg" alt="btn-remove" />
                    </div>))
                }
            </div>
        </div>
    </div>
    )
}

export default Favorites