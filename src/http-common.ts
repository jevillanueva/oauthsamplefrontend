import axios from "axios";

export default axios.create({
  baseURL: "/",
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*"
  },
  withCredentials: true
});

