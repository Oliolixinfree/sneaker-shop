import React, { useEffect, useState } from 'react'
import Card from '../components/Card/Card'
import axios from 'axios'

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [isLoadingOrders, setIsLoadingOrders] = useState(true)

    useEffect(() => {
        async function fetchOrders() {
            try {
                const {data} = await axios.get('https://62dbd59bd1d97b9e0c54ca6b.mockapi.io/orders')
                // 2 варианта
                // console.log(data.reduce((prev, obj) => [...prev, ...obj.items], [])) data.map(obj => obj.items.flat())
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
                setIsLoadingOrders(false)
            } catch(error) {
                alert('Ошибка загрузки покупок')
                console.error(error)
            }
            
        }
        
        fetchOrders()
    }, [])

    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>Мои Заказы</h1>
            </div>
            <div className="d-flex flex-wrap">
                {(isLoadingOrders ? [...Array(8)] : orders).map((i, index) => (
                    <Card
                        key={index}
                        loading={isLoadingOrders}
                        {...i}
                    />
                    ))
                }
            </div>
        </div>
    )
}

export default Orders