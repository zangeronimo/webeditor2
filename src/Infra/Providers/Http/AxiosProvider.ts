import axios from 'axios'

const api = axios.create({
  baseURL: `${process.env.API_URL}/api/v1`,
})

export default api
