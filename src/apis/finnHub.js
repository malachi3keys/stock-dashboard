import axios from 'axios'
// const token = import.meta.env.FINNHUB_KEY
const token = "cgu5fgpr01qu2uq5qpq0cgu5fgpr01qu2uq5qpqg"

export default axios.create({
  baseURL: 'https://finnhub.io/api/v1',
  params: {
    token: token
  }
})