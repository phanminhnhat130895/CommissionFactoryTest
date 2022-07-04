import axios, { AxiosRequestConfig } from "axios";
import { ACCESS_TOKEN_KEY } from "../common/constants";

const defaultHeader = {
    'Content-Type': 'application/json'
}

const api = axios.create({
    baseURL: `${process.env.REACT_APP_API_BASE_URL}`,
    headers: defaultHeader
})

const requestInterceptor = (config: AxiosRequestConfig) => {
    const token = sessionStorage.getItem(ACCESS_TOKEN_KEY);
    if(token) {
        config.headers!.Authorization = `Bearer ${token}`;
    }
    return config;
}

api.interceptors.request.use(
    requestInterceptor,
    error => error
)

export default api;
