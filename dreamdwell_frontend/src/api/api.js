import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL ||
    "localhost:3001/api" // fallback
const instance = axios.create(
    {
        baseURL: "http://localhost:3001/api/",
        headers: {
            'Content-Type': 'application/json'
        }
    }
)
export default instance;