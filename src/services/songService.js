import axios from 'axios';

/** * Since you added a Rewrite rule in Render:
 * Source: /api/* -> Destination: https://song-api-bq40.onrender.com/*
 * We now use '/api' as the base.
 */
const API_BASE_URL = '/api';

export const getSongs = async () => {
  try {
    // This will now request: https://your-ui-url.onrender.com/api/girado/songs
    // Render will then "proxy" it to: https://song-api-bq40.onrender.com/girado/songs
    const response = await axios.get(`${API_BASE_URL}/girado/songs`);
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