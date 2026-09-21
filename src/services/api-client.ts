import axios from "axios";

export const httpClient = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use(
  (config) => {
    return config;
  },
  async (error) => {
    await Promise.reject(error);
  },
);

httpClient.interceptors.response.use(
  ({ data }) => {
    return data;
  },
  (error) => {
    if (error.code === "ERR_NETWORK") {
      console.error("NETWORK ERROR");
      return Promise.reject(error);
    }

    // forward the problem detail body to the callers
    const problemDetail = error.response?.data ?? error;
    return Promise.reject(problemDetail);
  },
);
