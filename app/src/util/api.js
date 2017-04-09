import { create } from 'apisauce';

const api = create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const API_STATUS = {
  INIT: 'INIT',
  LOADING: 'LOADING',
  FETCHED: 'FETCHED',
  FAILED: 'FAILED',
};

export default api;
