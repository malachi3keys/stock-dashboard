import { useState } from 'react'
import Chart from 'react-apexcharts'

export const StockChart = ({ chartData, symbol }) => {
  const [dateFormat, setDateFormat] = useState('24h')
  const { day, week, year } = chartData
  
  const determineTimeFormat = () => {
    switch (dateFormat) {
      case '24h':
        return day
      case '7d':
        return week
      case '1y':
        return year
      default:
        return day
    }
  }
  
  const color = determineTimeFormat()[determineTimeFormat().length - 1].y - determineTimeFormat()[0].y > 0 ? '#26C281' : '#ed3419'
  
  const options = {
    colors: [color],
    title: {
      text: symbol,
      align: 'center',
      style: {
        fontSize: '24px'
      }
    },
    chart: {
      id: 'stock data',
      animations: {
        speed: 1300
      }, 
      width: '100%'
    },
    xaxis: {
      type: 'datetime',
      labels: {
        datetimeUTC: false
      }
    },
    tooltip: {
      x: {
        format: 'MMM dd HH:MM'
      }
    }
  }

  const series = [{
    name: symbol,
    data: determineTimeFormat()
  }]

  const renderButtonSelect = (button) => {
    const classes = 'time-btn'
    if (button === dateFormat) {
      return classes + 'time-btn-selected'
    } else {
      return classes + 'time-btn-plain'
    }
  }
  
  return <div className='stock-chart'>
    <Chart options={options} series={series} type='area' width='100%' />
    <div>
      <button onClick={() => setDateFormat('24h')} className={renderButtonSelect('24h')}>24h</button>
      <button onClick={() => setDateFormat('7d')} className={renderButtonSelect('7d')}>7d</button>
      <button onClick={() => setDateFormat('1y')} className={renderButtonSelect('1y')}>1y</button>
    </div>
  </div>
}