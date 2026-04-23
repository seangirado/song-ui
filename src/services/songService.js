import axios from 'axios';

const API_BASE_URL = 'https://song-api-bq40.onrender.com';

export const getSongs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/girado/songs`);
    return response.data;
  } catch (error) {
    console.error('Error fetching songs:', error);
    return []; // Return empty array on failure
  }
};