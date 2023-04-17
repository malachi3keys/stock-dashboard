import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import finnHub from '../apis/finnHub'
import { BsFillCaretDownFill } from "react-icons/bs"
import { BsFillCaretUpFill } from "react-icons/bs"
import { WatchListContext } from '../context/watchListContext'


export const StockList = () => {
  const [stock, setStock] = useState([])
  const { watchList, deleteStock } = useContext(WatchListContext)
  const navigate = useNavigate()

  const changeColor = (change) => {
    return change > 0 ? 'success' : 'danger'
  }

  const renderIcon = (change) => {
    return change > 0 ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />
  }

  useEffect(() => {
    let isMounted = true
    const fetchData = async () => {
      try {
        const responses = await Promise.all(watchList.map((stock) => {
          return finnHub.get('/quote', {
            params: {
              symbol: stock
            }
          })
        }))

        // console.log(responses)
        const data = responses.map((response) => {
          return {
            data: response.data,
            symbol: response.config.params.symbol
          }
        })

        // console.log(data)
        if (isMounted) {
          setStock(data)
        }

      } catch (err) {

      }
    }
    fetchData()

    return () => (isMounted = false)
  }, [watchList])

  const handleStockSelect = (symbol) => {
    navigate(`detail/${symbol}`)
  }

  return <div className='list'>
    <table className=''>
      <thead>
        <tr>
          <th scope='table-col'>Name</th>
          <th scope='table-col'>Last</th>
          <th scope='table-col'>Chg</th>
          <th scope='table-col'>Chg%</th>
          <th scope='table-col'>High</th>
          <th scope='table-col'>Low</th>
          <th scope='table-col'>Open</th>
          <th scope='table-col'>PClose</th>
        </tr>
      </thead>
      <tbody>
        {stock.map((stockData) => {
          return (
            <tr onClick={() => handleStockSelect(stockData.symbol)} className='table-row stock-symbol' key={stockData.symbol}>
              <th scope=''>{stockData.symbol}</th>
              <td>{stockData.data.c}</td>
              <td className={`text-${changeColor(stockData.data.d)}`}>{stockData.data.d} {renderIcon(stockData.data.d)}</td>
              <td className={`text-${changeColor(stockData.data.dp)}`}>{stockData.data.dp} {renderIcon(stockData.data.dp)}</td>
              <td>{stockData.data.h}</td>
              <td>{stockData.data.l}</td>
              <td>{stockData.data.o}</td>
              <td>{stockData.data.pc} <button className='delete-button' onClick={(e) => {
                e.stopPropagation()
                deleteStock(stockData.symbol)
              }}>Delete</button></td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </div>
}