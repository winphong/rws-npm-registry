import axios, { AxiosInstance } from "axios";
import config from "src/env";

let instance: AxiosInstance | null = null;

const createAxiosInstance = () => {
  return axios.create({ baseURL: config.baseUrl });
};

const getAxiosInstance = async () => {
  if (!instance) {
    return createAxiosInstance();
  }
  return instance;
};

export default getAxiosInstance;
