import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (email, password) => api.post('/admin/login', { email, password }),
};

export const productosAPI = {
  obtenerTodos: () => api.get('/admin/productos'),
  obtenerPorId: (id) => api.get(`/admin/productos/${id}`),
  crear: (data) => api.post('/admin/productos', data),
  actualizar: (id, data) => api.put(`/admin/productos/${id}`, data),
  eliminar: (id) => api.delete(`/admin/productos/${id}`),
  obtenerPublicos: () => api.get('/productos'),
  obtenerPublicoPorId: (id) => api.get(`/productos/${id}`),
};

export const pedidosAPI = {
  obtenerTodos: () => api.get('/admin/pedidos'),
  obtenerPorId: (id) => api.get(`/admin/pedidos/${id}`),
  actualizarEstado: (id, estado) => api.put(`/admin/pedidos/${id}`, { estado }),
  crear: (data) => api.post('/pedidos', data),
};

export const configAPI = {
  obtenerCarousel: () => api.get('/config/carousel'),
  guardarCarousel: (imagenes) => api.post('/config/carousel', { imagenes }),
  obtenerColecciones: () => api.get('/config/colecciones'),
  guardarColecciones: (data) => api.post('/config/colecciones', data),
};

export const categoriasAPI = {
  obtenerTodas: () => api.get('/categorias'),
  crear: (data) => api.post('/admin/categorias', data),
  actualizar: (id, data) => api.put(`/admin/categorias/${id}`, data),
  eliminar: (id) => api.delete(`/admin/categorias/${id}`),
};

export default api;