import axios from 'axios';

// export const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000"
export const BASE_URL = "http://51.21.162.16:5000"
const API_URL = `${BASE_URL}/api`;

export const submitJob = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return await axios.post(`${API_URL}/jobs`, formData);
};

export const getJobs = async () => {
    return await axios.get(`${API_URL}/jobs`);
};

export const deleteJob = async (id) => {
    return await axios.delete(`${API_URL}/jobs/${id}`);
};

export const retryJob = async (id) => {
    return await axios.post(`${API_URL}/jobs/${id}/retry`);
};
