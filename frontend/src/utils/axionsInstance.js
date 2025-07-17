import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://assignment-backend-bgnl.onrender.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});


export default axiosInstance