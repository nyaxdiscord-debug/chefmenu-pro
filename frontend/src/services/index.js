import api from './api'

export const authApi = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (data) => api.post('/auth/register', data),
}

export const ingredientesApi = {
  getAll: () => api.get('/ingredientes'),
  getById: (id) => api.get(`/ingredientes/${id}`),
  create: (data) => api.post('/ingredientes', data),
  update: (id, data) => api.put(`/ingredientes/${id}`, data),
  delete: (id) => api.delete(`/ingredientes/${id}`),
  getStockBajo: () => api.get('/ingredientes/stock-bajo'),
}

export const recetasApi = {
  getAll: () => api.get('/recetas'),
  getById: (id) => api.get(`/recetas/${id}`),
  create: (data) => api.post('/recetas', data),
  update: (id, data) => api.put(`/recetas/${id}`, data),
  delete: (id) => api.delete(`/recetas/${id}`),
  escalar: (id, porciones) => api.get(`/recetas/${id}/escalar?porciones=${porciones}`),
}