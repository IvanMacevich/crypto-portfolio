import axios, { AxiosInstance } from "axios";

const baseURL = process.env.REACT_APP_UNISAT_API_BASE_URL;
const apiKey = process.env.REACT_APP_API_KEY;

export const instance: AxiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
      'Authorization': `Bearer ${apiKey}`,
    },
  });

