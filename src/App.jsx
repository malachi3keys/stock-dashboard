import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import { StockOverviewPage } from './pages/StockOverviewPage'
import { StockDetailPage } from './pages/StockDetailPage'
import './App.css'
import { WatchListContextProvider } from './context/watchListContext'

export default function App() {

  return (
    <main className="App">
      <WatchListContextProvider>
        <Router basename='/stock-dashboard'>
          <Sidebar />
          <Routes>
            <Route path='/' element={<StockOverviewPage />} />
            <Route path='/detail/:symbol' element={<StockDetailPage />} />
          </Routes>
        </Router>
      </WatchListContextProvider>
    </main>
  )
}
