import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

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
