import axios from "axios";

const api = axios.create({
  baseURL:
    "https://cors-anywhere.herokuapp.com/http://elearning0706.cybersoft.edu.vn/api/"
});

export default api;
