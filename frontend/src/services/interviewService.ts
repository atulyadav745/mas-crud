import axios from 'axios';

const API_URL = 'http://localhost:5000/api/interviews';

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export const interviewService = {
  async create(interviewData: any) {
    const response = await axios.post(API_URL, interviewData, getAuthHeader());
    return response.data;
  },

  async getAll() {
    const response = await axios.get(API_URL, getAuthHeader());
    return response.data;
  },

  async update(id: string, interviewData: any) {
    const response = await axios.put(`${API_URL}/${id}`, interviewData, getAuthHeader());
    return response.data;
  },

  async delete(id: string) {
    const response = await axios.delete(`${API_URL}/${id}`, getAuthHeader());
    return response.data;
  },
}; 