import { useState, useEffect } from "react"
import finnHub from "../apis/finnHub";
export const StockData = ({ symbol }) => {

  const [stockData, setStockData] = useState()

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await finnHub.get("/stock/profile2", {
          params: {
            symbol
          }
        })
        // console.log(response)
        if (isMounted) {
          setStockData(response.data)
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
    return () => (isMounted = false);
  }, [symbol])
  
  return <div>
    {stockData && (

      <div className="stock-data">
        
          <div className="data-cube">
            <div className="stock-data-title">Name </div>
            {stockData.name}
          </div>
          <div className="data-cube">
            <div className="stock-data-title">Country </div>
            {stockData.country}
          </div>
          <div className="data-cube">
            <div className="stock-data-title">Ticker </div>
            {stockData.ticker}
          </div>
        
          <div className="data-cube">
            <div className="stock-data-title">Exchange </div>
            {stockData.exchange}
          </div>
          <div className="data-cube">
            <div className="stock-data-title">Industry </div>
            {stockData.finnhubIndustry}
          </div>
          <div className="data-cube">
            <div className="stock-data-title">IPO </div>
            {stockData.ipo}
          </div>
        
          <div className="data-cube">
            <div className="stock-data-title">Market Cap </div>
            {stockData.marketCapitalization}
          </div>
          <div className="data-cube">
            <div className="stock-data-title">Shares Outstanding </div>
            {stockData.shareOutstanding}
          </div>
          <div className="data-cube">
            <div className="stock-data-title">url </div>
            <a href={stockData.weburl} target="_blank" rel="noopener noreferrer">{stockData.weburl}</a>
          </div>
      </div>

    )
    }
  </div>
}