import axios from 'axios';

/**
 * Command line arguments are used for defining base URL
 * VUE_APP_BASE_URL="https://..." npm start
 */
const baseURL = 'https://jsonplaceholder.typicode.com';

const api = axios.create({
  baseURL
});


export default api;
