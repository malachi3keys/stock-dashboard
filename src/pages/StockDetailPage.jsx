import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import finnHub from '../apis/finnHub'
import { StockChart } from '../components/StockChart'
import { StockData } from '../components/StockData'

//Formatting data from finnHub to Chart
const formatData = (data) => {
  return data.t.map((el, index) => {
    return {
      x: el * 1000, /*Milliseconds*/
      y: Math.round(data.c[index] * 100) / 100
    }
  })
}

export const StockDetailPage = () => {
  const [chartData, setChartData] = useState()
  const { symbol } = useParams()
  useEffect(() => {
    const fetchData = async () => {
      const date = new Date()
      // console.log(date)
      const currentTime = Math.floor(date.getTime() / 1000)

      // stock market closed on the weekend, need to grab data for last days it was open
      let oneDay;
      if (date.getDay() === 6) { /*Saturday*/
        oneDay = currentTime - 2 * 24 * 60 * 60;
      } else if (date.getDay() === 0) { /*Sunday*/
        oneDay = currentTime - 3 * 24 * 60 * 60;
      } else {
        oneDay = currentTime - 24 * 60 * 60;
      }
      const oneWeek = currentTime - 7 * 24 * 60 * 60
      const oneYear = currentTime - 365 * 24 * 60 * 60

      try {
        const responses = await Promise.all([
          //Day
          finnHub.get('/stock/candle', {
            params: {
              symbol,
              from: oneDay,
              to: currentTime,
              resolution: 30
            }
          }),

          //Week
          finnHub.get('/stock/candle', {
            params: {
              symbol,
              from: oneWeek,
              to: currentTime,
              resolution: 60
            }
          }),

          //Year
          finnHub.get('/stock/candle', {
            params: {
              symbol,
              from: oneYear,
              to: currentTime,
              resolution: 'W'
            }
          })
        ])
        // console.log(responses)

        setChartData({
          day: formatData(responses[0].data),
          week: formatData(responses[1].data),
          year: formatData(responses[2].data)
        })
      } catch (err) {
        console.log(err)
      }
    } 
    fetchData()
  }, [symbol])

  return <div className='detail'>
    {chartData && (
      <div className='dashboard'>
        <StockChart chartData={chartData} symbol={symbol} />
        <StockData symbol={symbol} />
      </div>
    )}
  </div>
}