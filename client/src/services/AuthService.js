import axios from "axios";

const API = "https://weather-app-icbr.onrender.com";

export const registerUser = (data) => {
    return axios.post(`${API}/register`, data);
};

export const loginUser = (data) => {
    return axios.post(`${API}/login`, data);
};

export const getProfile = () => {

    const token = localStorage.getItem("token");

    return axios.get(`${API}/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });


}