import axios from 'axios';

// DIRECT URL to your Render Backend
const ACTUAL_BACKEND_URL = 'https://song-api-bq40.onrender.com/girado/songs';

// This is a proxy that adds the headers the browser is complaining about
const CORS_PROXY = 'https://api.allorigins.win/get?url=';

export const getSongs = async () => {
  try {
    // We combine them to bypass the 404 and the CORS error
    const response = await axios.get(`${CORS_PROXY}${encodeURIComponent(ACTUAL_BACKEND_URL)}`);
    
    // AllOrigins returns data as a string in 'contents'
    const data = JSON.parse(response.data.contents);
    
    // Return the array of songs (handling different data structures)
    return Array.isArray(data) ? data : (data.songs || []);
  } catch (error) {
    console.error('Final attempt failed:', error);
    throw error;
  }
};