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
        console.log(response)
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
        <div className="data-col">
          <div>
            <span className="stock-data-title">name: </span>
            {stockData.name}
          </div>
          <div>
            <span className="stock-data-title">country: </span>
            {stockData.country}
          </div>
          <div>
            <span className="stock-data-title">ticker: </span>
            {stockData.ticker}
          </div>
        </div>
        <div className="data-col">
          <div>
            <span className="stock-data-title">Exchange: </span>
            {stockData.exchange}
          </div>
          <div>
            <span className="stock-data-title">Industry: </span>
            {stockData.finnhubIndustry}
          </div>
          <div>
            <span className="stock-data-title">IPO: </span>
            {stockData.ipo}
          </div>
        </div>
        <div className="data-col">
          <div>
            <span className="stock-data-title">MarketCap: </span>
            {stockData.marketCapitalization}
          </div>
          <div>
            <span className="stock-data-title">Shares Outstanding: </span>
            {stockData.shareOutstanding}
          </div>
          <div>
            <span className="stock-data-title">url: </span>
            <a href={stockData.weburl} target="_blank" rel="noopener noreferrer">{stockData.weburl}</a>
          </div>
        </div>
      </div>

    )
    }
  </div>
}