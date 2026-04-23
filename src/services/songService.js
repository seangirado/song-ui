import axios from 'axios';

// We use the 'allorigins' hexpression to wrap the URL
const API_BASE_URL = 'https://api.allorigins.win/get?url=' + encodeURIComponent('https://song-api-bq40.onrender.com/girado/songs');

export const getSongs = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    // AllOrigins wraps the data in a 'contents' field, so we parse it
    const data = JSON.parse(response.data.contents);
    return data;
  } catch (error) {
    console.error('Error fetching songs:', error);
    throw error;
  }
};