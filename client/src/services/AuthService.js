import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const registerUser = (data) => {
    return axios.post(`${BASE_URL}/api/auth/users/register`, data);
};

export const loginUser = (data) => {
    return axios.post(`${BASE_URL}/api/auth/users/login`, data);
};

export const googleLogin = (data) => {
    return axios.post(`${BASE_URL}/api/auth/users/google`, data);
};

export const getProfile = () => {
    const token = localStorage.getItem("token");

    return axios.get(`${BASE_URL}/api/auth/users/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};