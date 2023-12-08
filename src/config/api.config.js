import axios from "axios";
import AuthController from "../controllers/authController";

export const apiClient = axios.create({
  baseURL: `http://localhost:9012/`,
});

apiClient.interceptors.request.use(
  (config) => {
    const persistData = AuthController.getPersistedCredentials();

    if (persistData?.token) {
      config.headers[`Authorization`] = `Bearer ${persistData.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
