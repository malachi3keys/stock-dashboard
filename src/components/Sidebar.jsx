import { WatchListContext } from "../context/watchListContext" 
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsFillHouseFill } from 'react-icons/bs'

export default function Sidebar(){
    const { watchList } = useContext(WatchListContext)
    const navigate = useNavigate()

    const stockmenu = watchList.map((symbol, index) => {
        return(
            <button className='sidebar-stock' key={index} onClick={() => handleStockSelect(symbol)}>
                {symbol}
            </button>
        )
    })

    const handleStockSelect = (symbol) => {
        navigate(`detail/${symbol}`)
      }

    return (
        <div className="sidebar">
            <div className="home-btn" onClick={() => navigate('/')}><BsFillHouseFill /></div>
            <div>{stockmenu}</div>
        </div>
    )
}