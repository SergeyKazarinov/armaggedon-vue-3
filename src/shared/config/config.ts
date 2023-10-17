const {
  VITE_API_NASA_KEY,
  VITE_APOD_URL = 'https://api.nasa.gov/planetary/apod',
  VITE_NEOWS_URL = 'http://www.neowsapp.com/rest/v1/feed'
} = import.meta.env;

export const config = {
  API_KEY: VITE_API_NASA_KEY,
  APOD_URL: VITE_APOD_URL,
  NEOWS_URL: VITE_NEOWS_URL
};
