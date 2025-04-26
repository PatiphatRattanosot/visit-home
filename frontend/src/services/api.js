import axios from "axios";
const baseUrl = import.meta.env.VITE_BASEURL;
// log for checking api url
console.log("Base url: ", baseUrl);

// create an instance of axios
const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default instance;
