import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  timeout: 120000,
})

instance.interceptors.request.use(request, error)
instance.interceptors.response.use(response, error)

function request (req) {
  return req
}

function response ({ data }) {
  return data
}

function error (err) {
  console.log(err)
}

export default instance