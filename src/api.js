import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Set up Axios instance with base URL and interceptors
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Interceptor to add token to headers
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('mdtoken');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Task-related API calls
export const getTasks = async () => {
  const response = await axiosInstance.get('/tasks');
  return response.data;
};

export const createTask = async (task) => {
  const response = await axiosInstance.post('/tasks', task);
  return response.data;
};

export const updateTask = async (id, task) => {
  const response = await axiosInstance.put(`/tasks/${id}`, task);
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await axiosInstance.delete(`/tasks/${id}`);
  return response.data;
};

// User-related API calls
export const registerUser = async (user) => {
  const response = await axiosInstance.post('/auth/register', user);
  return response.data;
};

export const loginUser = async (user) => {
  const response = await axiosInstance.post('/auth/login', user);
  return response.data;
};

export const getUser = async () => {
  const response = await axiosInstance.get('/auth/me');
  return response.data;
};
