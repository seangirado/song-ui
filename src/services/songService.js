import axios from 'axios';

const API_BASE_URL = 'https://song-api-bq40.onrender.com';

export const getSongs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/girado/songs`);
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching songs:', error);
    throw error;
  }
};

export const searchSongs = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/girado/songs`, {
      params: { search: query },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching songs:', error);
    throw error;
  }
};

export const getSongById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/girado/songs/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching song:', error);
    throw error;
  }
};