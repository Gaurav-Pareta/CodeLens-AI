import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const reviewApi = {
  async getReview(code, language) {
    try {
      const response = await axios.post(`${API_BASE_URL}/ai/get-review`, {
        code,
        language
      });
      return response.data.review;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get review');
    }
  }
};