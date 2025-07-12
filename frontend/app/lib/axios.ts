import axios from 'axios';
// This file is used to create an axios instance with a base URL
// and default headers. It can be used throughout the application to make API requests.
// It is a good practice to keep the base URL in an environment variable
// so that it can be easily changed for different environments (development, production, etc.).

console.log("Axios instance created with base URL:", import.meta.env.API_URL);
const BASE_URL = import.meta.env.API_URL || 'http://localhost:5001/api';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token ?? ""}`;
    }
    return config;
  });
  
  // Add a global handler for 401 errors
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        // Dispatch a custom event to trigger logout in AuthProvider
        window.dispatchEvent(new Event("force-logout"));
      }
      return Promise.reject(error);
    }
  );
  
  const postData = async <T>(path: string, data: unknown): Promise<T> => {
    const response = await api.post(path, data);
    return response.data;
  };
  
  const getData = async <T>(path: string): Promise<T> => {
    const response = await api.get(path);
    return response.data;
  };

  const updateData = async <T>(path: string, data: unknown): Promise<T> => {
    const response = await api.put(path, data);
    return response.data;
  };
  
  
  const deleteData = async <T>(path: string): Promise<T> => {
    const response = await api.delete(path);
    return response.data;
  };
  
  export { postData, getData, updateData, deleteData };