import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
});
const RequestHandler = (request) => {
  // Token will be dynamic so we can use any app-specific way to always
  // fetch the new token before making the call
    return request;
};

const ResponseHandler = (response) => {
  if (response.status === 401) {
    window.location = "/";
    return response;
  }
    return response;
};

const errorHandler = (error) => {
  return Promise.reject(
    (error.response && error.response.data) || "Something went wrong"
  );
};

axiosInstance.interceptors.request.use(
  (request) => RequestHandler(request),
  (error) => errorHandler(error)
);

axiosInstance.interceptors.response.use(
  (response) => ResponseHandler(response),
  (error) => errorHandler(error)
);

export default axiosInstance;
