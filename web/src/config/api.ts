import Axios, { AxiosResponse } from "axios";
import { get } from "lodash";
import ShowNotification from "./notification";

export const BASE_URL = "http://localhost:5000";
export const ADMIN_URL = "http://54.152.93.24:8080";
export const USER_URL = "http://54.152.93.24:8081";
export const ISSUE_URL = "http://54.152.93.24:8082";

const axiosInstance = Axios.create({
  // baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// axiosInstance.interceptors.request.use(
//   async (config) => {
//     const token = await AsyncStorage.getItem('access_token');
//     if (token) {
//       config.headers.Authorization = token;
//     }
//     console.log('config', config);
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

const request = {
  get: (url: string, params: { [key: string]: string }, headers = {}) =>
    axiosInstance.get(url, { params, headers }),
  post: (url: string, data: any, headers = {}) => axiosInstance.post(url, data, { headers }),
  patch: (url: string, data: any, headers = {}) => axiosInstance.patch(url, data, { headers }),
  put: (url: string, data: any, headers = {}) => axiosInstance.put(url, data, { headers }),
  delete: (url: string, data: any, headers = {}) =>
    axiosInstance.delete(url, { data, headers }),
};

export const resolveRequest = async (requestPromise: Promise<any>) => {
  let data: any = {};

  try {
    const result = await requestPromise;
    data = result.data;
    data.statusCode = result.status
    return data
  } catch (e) {
    const errorData = get(e, "response.data");
    const status = get(e, "response.status");
    if (status === 500)
      ShowNotification("error", "Something went wrong. Please try again.");
    else if (status === 409 && typeof errorData === "object")
      ShowNotification("error", errorData.message);
    data = typeof errorData === "object" ? errorData : {};
    data.error = true;
    data.statusCode = status;
  }

  return data;
};

export default request;

// Axios.defaults.headers.post['Content-Type'] =
//   'application/x-www-form-urlencoded';

// Axios.defaults.headers.put['Content-Type'] = 'multipart/form-data';