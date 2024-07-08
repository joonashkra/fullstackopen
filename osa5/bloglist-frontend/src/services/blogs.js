import axios from 'axios'
const baseUrl = '/api/blogs'

let authToken

const setToken = newToken => {
  authToken = `Bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: authToken }
  }

  const request = await axios.post(baseUrl, newBlog, config)
  return request.data
}

const like = async blog => {
  const request = await axios.put(`${baseUrl}/${blog.id}`, blog)
  return request.data
}

const remove = async id => {
  const config = {
    headers: { Authorization: authToken }
  }

  const request = await axios.delete(`${baseUrl}/${id}`, config)
  return request.data
}

export default { getAll, create, setToken, like, remove }