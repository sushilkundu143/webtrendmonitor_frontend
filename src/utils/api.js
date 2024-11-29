import axios from 'axios';

const API_BASE_URL = 'https://api.example.com'; // Replace with your actual API base URL

export const fetchLighthouseReport = async (pageUrl) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/lighthouse`, {
      params: { url: pageUrl },
    });
    return response.data; // Assuming the response contains the Lighthouse data
  } catch (error) {
    console.error('Error fetching Lighthouse report:', error);
    throw error;
  }
};
