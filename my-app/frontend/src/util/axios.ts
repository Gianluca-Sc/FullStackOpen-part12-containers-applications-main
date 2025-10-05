import axios from "axios";
import { getUserFromLocalStorage } from "./getUserFromLocalStorage.ts";

const apiClient = axios.create();

apiClient.interceptors.request.use((config) => {
  const user = getUserFromLocalStorage();

  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default apiClient;
