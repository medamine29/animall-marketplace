import axios from 'axios'
import swal from 'sweetalert';

const api = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 60000
})


api.interceptors.request.use(
  async (request) => {
    const token = await localStorage.getItem('token')
    if (token) {
      request.headers.Authorization = `Bearer ${token}`
    }
    return request
  },
  (error) => {
    Promise.reject(error)
  }
)

export const loginAPI = async (email, password) => {
  try {
    const { data } = await api.post(`/users/login`, {
      email, password
    })

    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.role);
    localStorage.setItem('fidelityPoints', data.fidelityPoints);
    localStorage.setItem('userId', data._id);
    localStorage.setItem('address', data.address);
    return { status: true, data }
  } catch (err) {
    return { status: false, message: err.response.data.message || '' }
  }
}

export const signupAPI = async (newUser) => {
  try {
    const { data } = await api.post(`/users/signup`, {
      ...newUser
    })

    return { status: true, data }
  } catch (err) {
    return { status: false, message: err.response.data.message || '' }
  }
}

export const getProducts = async (category, subCategory, role = "user") => {
  try {
    const { data } = await api.get(`/products/all?category=${category}&subCategory=${subCategory}&role=${role}`)
    return { status: true, data }
  } catch (err) {
    return { status: false, message: err.response.data.message || "Une erreur s'est produite" }
  }
}

export const getOrders = async () => {
  try {
    const { data } = await api.get(`/orders/all`)
    return { status: true, data }
  } catch (err) {
    return { status: false, message: err.response.data.message || "Une erreur s'est produite" }
  }
}

export const getProductsByFilter = async (filter) => {
  try {
    const { data } = await api.get(`/products/${filter}`)
    return { status: true, data }
  } catch (err) {
    return { status: false, message: err.response.data.message || "Une erreur s'est produite" }
  }
}

export const getUser = async (userId) => {
  try {
    const { data } = await api.get(`/users/profile/${userId}`)
    return { status: true, data }
  } catch (err) {
    return { status: false, message: err.response.data.message || "Une erreur s'est produite" }
  }
}

export const updateUser = async (userId, user) => {
  try {
    const { data } = await api.put(`/users/profile/${userId}`, user)
    return { status: true, data }
  } catch (err) {
    return { status: false, message: err.response.data.message || "Une erreur s'est produite" }
  }
}

export const checkoutOrder = async (order) => {
  try {
    const { data } = await api.post(`/orders/add`, order)

    return { status: true, data }
  } catch (err) {
    return { status: false, message: err.response.data.message || '' }
  }
}

export const getTopics = async () => {
  try {
    const { data } = await api.get(`/topics/all`)
    return { status: true, data }
  } catch (err) {
    return { status: false, message: err.response.data.message || "Une erreur s'est produite" }
  }
}

export const createProduct = async (formDataArray) => {
  
  api
  .post("/products/add", formDataArray, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
  .then((response) => {
    swal("Succés", "Produit ajouté avec succés !", "success")
  })
  .catch((error) => {
    swal("Erreur", "une erreur s'est produite", "error")
  })

}

export const deleteTopic = async (topicId) => {
  try {
    const { data } = await api.delete(`/topics/${topicId}`)
    return { status: true, data }
  } catch (err) {
    return { status: false, message: err.response.data.message || "Une erreur s'est produite" }
  }
}

export const deleteComment = async (topicId, commentId) => {
  try {
    const { data } = await api.delete(`/topics/${topicId}/comment/${commentId}`)
    return { status: true, data }
  } catch (err) {
    return { status: false, message: err.response.data.message || "Une erreur s'est produite" }
  }
}

export const getTopicDetails = async (topicId) => {
  try {
    const { data } = await api.get(`/topics/details/${topicId}`)
    return { status: true, data }
  } catch (err) {
    return { status: false, message: err.response.data.message || "Une erreur s'est produite" }
  }
}

export const addComment = async (topicId, userId, message) => {
  try {
    const { data } = await api.put(`/topics/${topicId}`, { userId, message })
    return { status: true, data }
  } catch (err) {
    return { status: false, message: err.response.data.message || "Une erreur s'est produite" }
  }
}

export const addOffre = async (promotionText) => {
  try {
    const { data } = await api.post(`/users/promotions/add`, { promotionText })
    return { status: true, data }
  } catch (err) {
    return { status: false, message: err.response.data.message || "Une erreur s'est produite" }
  }
}

export const getOffre = async () => {
  try {
    const { data } = await api.get(`/users/promotions`)
    return { status: true, data }
  } catch (err) {
    return { status: false, message: err.response.data.message || "Une erreur s'est produite" }
  }
}

export const addTopic = async (title, description, userId) => {
  try {
    const { data } = await api.post(`/topics/add`, { title, description, userId })
    return { status: true, data }
  } catch (err) {
    return { status: false, message: err.response.data.message || "Une erreur s'est produite" }
  }
}

export const updateOrderStatus = async (orderId, status) => {
  try {
    const { data } = await api.put(`/orders/${orderId}/status`, { status })
    return { status: true, data }
  } catch (err) {
    return { status: false, message: err.response.data.message || "Une erreur s'est produite" }
  }
}


