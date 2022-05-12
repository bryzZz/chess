import axios from "axios";
import { AuthResponse } from "../types";

export const API_BASE_URL = "http://localhost:5000/api";

export const $api = axios.create({
    withCredentials: true,
    baseURL: API_BASE_URL,
});

$api.interceptors.request.use((config) => {
    config.headers!.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
});

$api.interceptors.response.use(
    (config) => config,
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true;
            try {
                const res = await axios.get<AuthResponse>(
                    `${API_BASE_URL}/api/refresh`,
                    { withCredentials: true }
                );
                localStorage.setItem("token", res.data.accessToken);
                return $api.request(originalRequest);
            } catch (error) {
                console.log("Not authorized");
            }
        }
        throw error;
    }
);
