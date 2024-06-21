import axios from "axios";

const newAxiosRequest = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
  // crossDomain: true, // Allow cross-domain requests
});

newAxiosRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data === "Token is not valid!") {
      handleTokenValidityError();
    }
    return Promise.reject(error);
  }
);

function handleTokenValidityError() {
  //   logout();
  window.location.href = "/login";
  alert("Your session has expired. Please login again.");
}

export default newAxiosRequest;
