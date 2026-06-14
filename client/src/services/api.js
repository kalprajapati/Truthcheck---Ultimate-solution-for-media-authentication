import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;;

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use((config) => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
        try {
            const user = JSON.parse(userStr);
            if (user && user.token) {
                config.headers.Authorization = `Bearer ${user.token}`;
            }
        } catch (e) {
            console.error("Error parsing user from localStorage", e);
        }
    }
    return config;
});

export const analyzeMedia = async (formData) => {
    try {
        const response = await api.post('/media', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const analyzeText = async (text) => {
    try {
        const response = await api.post('/text', { text });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const getReport = async (id) => {
    try {
        const response = await api.get(`/report/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const getHistory = async () => {
    try {
        const response = await api.get('/history');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};
