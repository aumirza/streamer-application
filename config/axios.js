import axios from "axios";
import { API_BASE_URL } from "../constants/api";

axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";

export default axios;
