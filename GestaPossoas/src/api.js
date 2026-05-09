import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response, 
  error => {
    if (error.response) {
      
      const status = error.response.status;

      switch(status) {

        case 401:
          alert("Sessão expirada!");
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          window.location.href = "/login";
          break;

        case 403:
          alert("Acesso negado");
          break;

        case 400:
          alert("Erro de requisição");
          break;

        case 404:
          alert("Recurso não encontrado");
          break;

        case 500:
          alert("Erro no servidor");
          break;

        case 422:
          alert("Erro nos dados enviados");
          break;

        default:
          alert("Erro inesperado");

      }

    }

    return Promise.reject(error);
  }
);

export default api;