import axios from 'axios';

const API_ORIGIN = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/+$/, '');

const api = axios.create({
    baseURL: `${API_ORIGIN}/api`,
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
        const response = await api.post('/analyze/media', formData, {
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
        const response = await api.post('/analyze/text', { text });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const getReport = async (id) => {
    try {
        const response = await api.get(`/analyze/report/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const getHistory = async () => {
    try {
        const response = await api.get('/analyze/history');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export default api;
