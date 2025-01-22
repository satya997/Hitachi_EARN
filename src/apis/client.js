import axios from "axios";
export const URL = "http://103.204.95.218:4000/users";

const baseURL = "http://103.204.95.212:4000";

export const apiURL = "http://103.204.95.212:4000/api";

const client = axios.create({
  baseURL,
});

client.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token"); // Fetch the token from localStorage

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`; // Add token to Authorization header
  }

  return config;
});

export default client;
