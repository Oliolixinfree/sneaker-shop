import React from 'react'
import Card from '../components/Card/Card'

const Home = ({
    items,
    searchValue,
    setSearchValue, 
    onChangeSearchValue, 
    onAddToCart, 
    onAddToFavorite,
    isLoading,
}) => {

    const renderItems = () =>  {

        const filtredItems = items.filter(i => i.title.toLowerCase().includes(searchValue.toLowerCase()))

        return(
            ( isLoading ? [...Array(8)] : filtredItems)
                .map((i, index) => (
                    <Card 
                        key={index} 
                        onFavorites={(i) => onAddToFavorite(i)}
                        onPlus={(i) => onAddToCart(i)}
                        loading={isLoading}
                        {...i}
                    />
                ))
        )
    }

    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>Все кроссовки</h1>
                <div className="search-block d-flex">
                    <img src="/img/search.svg" alt="search-btn" />
                    <input
                        value={searchValue}
                        onChange={onChangeSearchValue} 
                        placeholder="Поиск..." 
                        type='text'
                    />
                    {searchValue && <img 
                        onClick={() => setSearchValue('')} 
                        className="clear cu-p" 
                        src="/img/btn-remove.svg" 
                        alt="clear-btn" 
                    />}
                </div>
            </div>
            <div className="d-flex flex-wrap">
                {renderItems()}
            </div>
        </div>
    )
}

export default Home