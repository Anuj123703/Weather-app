import axios from "axios";

const API = "http://localhost:5000/api/auth/users";

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