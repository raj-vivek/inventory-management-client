import axios from "axios";

const newAxiosRequest = axios.create({
  baseURL: "http://localhost:8080" + "/api/v1",
  // timeout: 2000,
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
