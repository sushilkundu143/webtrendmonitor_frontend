import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchLighthouseReport = async (buildId, pageName) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/lighthouse/run-viewDetails`, {
      params: { buildId, pageName },
    });
    return response.data; // Assuming the response contains the Lighthouse data
  } catch (error) {
    console.error('Error fetching Lighthouse report:', error);
    throw error;
  }
};
