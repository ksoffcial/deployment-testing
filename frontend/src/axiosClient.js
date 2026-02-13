import axios from "axios";

const axiosClient = axios.create({
    baseURL:'https://leetcode-clone-5z62.onrender.com/',
    withCredentials:true,
    headers:{
        'Content-Type' : 'application/json'
    }
});

export default axiosClient;