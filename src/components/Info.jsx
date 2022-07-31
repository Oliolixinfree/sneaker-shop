import React, { useContext } from 'react'
import AppContext from '../context'

const Info = ({title, img, description}) => {

    const  {setCartOpend} = useContext(AppContext)

    return (
        <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img 
                className="mb-20" 
                width="120px"
                src={img} 
                alt="cart-empty" 
            />
            <h2>{title}</h2>
            <p>{description}</p>
            <button onClick={() => setCartOpend(false)} className="greenBtn">
                <img src="img/arrow-back.svg" alt="arrow-back" />
                Вернуться назад
            </button>
        </div>
    )
}

export default Info