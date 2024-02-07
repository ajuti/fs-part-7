import axios from "axios"
const baseUrl = "/api/blogs"

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  console.log(response)
  return response.data
}

const likeBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const comment = async (comment, blog) => {
  const res = await axios.post(`${baseUrl}/${blog.id}/comments`, { comment })
  return res.data
}

export default { getAll, setToken, create, likeBlog, remove, comment }
