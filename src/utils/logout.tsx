import newAxiosRequest from "./newAxiosRequest";

export default function logout() {
  document.cookie =
    "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  localStorage.removeItem("user");
  delete newAxiosRequest.defaults.headers.common["Authorization"];
}
