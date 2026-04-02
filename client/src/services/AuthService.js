import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const registerUser = (data) => {
    return axios.post(`${BASE_URL}/register`, data);
};

export const loginUser = (data) => {
    return axios.post(`${BASE_URL}/login`, data);
};

export const getProfile = () => {

    const token = localStorage.getItem("token");

    return axios.get(`${BASE_URL}/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });


}