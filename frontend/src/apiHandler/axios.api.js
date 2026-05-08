import axios from "axios";

const url = "https://stroypulse.onrender.com/api"

const authApi = axios.create({
  baseURL: `${url}/auth`,
  withCredentials: true,
});

const storyApi = axios.create({
  baseURL: `${url}/stories`,
  withCredentials: true,
});

const scrapeApi = axios.create({
  baseURL: `${url}/scrape`,
  withCredentials: true,
});

export { authApi, storyApi, scrapeApi, url };
