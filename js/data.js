const ENDPOINT = "https://64e7a9d7b0fd9648b7903bcd.mockapi.io/";
const LIMIT = 10;

const request = axios.create({
  baseURL: ENDPOINT,
  timeout: 10000,
});
