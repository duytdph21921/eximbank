import axios from 'axios';
import { store } from '@store';
import { handleErrors } from '@utils/helpers';

const client = axios.create({
  baseURL: store.getState().auth?.baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});
store.subscribe(() => {
  const baseURL = store.getState().auth?.baseURL;
  client.defaults.baseURL = baseURL;
});
// axiosRetry(client, {
//   retries: 3, // number of retries
//   retryDelay: retryCount => {
//     return retryCount * 2000; // time interval between retries
//   },
//   retryCondition: error => {
//     return error?.code === 'ERR_NETWORK' || error?.code === 'ECONNABORTED';
//   },
// });

client.interceptors.request.use((config) => {
  const accessToken = store.getState().auth?.accessToken;
  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

client.interceptors.response.use(
  (response) =>
    // handle response
    response?.data,
  (error) => {
    if (error.response) {
      return handleErrors(error?.response);
    }
    if (!error.response) {
      if (error.code === 'ERR_NETWORK') {
        // No Internet Connection!
        // console.log('No Internet Connection! Please check your network.');
      } else if (error.code === 'ECONNABORTED') {
        // Request Timeout!
        // console.log('Request Timeout! The server took too long to respond.');
      }
    }
    return error.code;
  },
);

export default client;
