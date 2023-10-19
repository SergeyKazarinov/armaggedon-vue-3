import axios from 'axios';

import { config } from '../config/config';

export const apiNeowsInstance = axios.create({
  baseURL: config.NEOWS_URL,
  params: {
    api_key: config.API_KEY
  }
});

export const apiApodInstance = axios.create({
  baseURL: config.APOD_URL,
  params: {
    api_key: config.API_KEY
  }
});

export const apiNeoInstance = axios.create({
  baseURL: config.NEO_URL,
  params: {
    api_key: config.API_KEY
  }
});
