import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

const API_URL = 'http://127.0.0.1:8000'
const storedToken = localStorage.getItem("userToken");


const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const token = localStorage.getItem("userToken");
  console.log(token)
  config.headers["Authorization"] = `Bearer ${token}`;

  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  if (error.response) {
    // Access Token was expired
    if (
      error.response.status === 401 &&
      error.response.data.detail === "Expired Access Token"
    ) {

      const refreshToken = localStorage.getItem("userRefreshToken");
      console.log(refreshToken)

      try {
        const rs = await axios.post(`${API_URL}/refresh`, {
          refresh_token:  refreshToken,
        });

        const { access_token } = rs.data;

        localStorage.setItem("userToken", access_token);

        return;
      } catch (_error) {
        return Promise.reject(_error);
      }
    }
  }
  return Promise.reject(error);
};

export const setupInterceptorsTo = (
  axiosInstance: AxiosInstance
): AxiosInstance => {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
};