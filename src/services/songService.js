import axios from 'axios';

// Your actual backend
const ACTUAL_BACKEND_URL = 'https://song-api-bq40.onrender.com/girado/songs';

// List of public CORS proxies (fallback system)
const PROXIES = [
  'https://api.allorigins.win/raw?url=',
  'https://corsproxy.io/?',
  'https://cors-anywhere.herokuapp.com/'
];

export const getSongs = async () => {
  for (let proxy of PROXIES) {
    try {
      const url = `${proxy}${encodeURIComponent(ACTUAL_BACKEND_URL)}`;
      
      const response = await axios.get(url);

      // Some proxies return JSON directly, others wrap it
      let data = response.data;

      if (typeof data === 'string') {
        data = JSON.parse(data);
      }

      return Array.isArray(data) ? data : (data.songs || []);
      
    } catch (error) {
      console.warn(`Proxy failed: ${proxy}`, error.message);
      continue; // try next proxy
    }
  }

  throw new Error('All proxies failed. Cannot fetch songs.');
};