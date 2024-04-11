import getAuthTokenFromCookie from "./getAuthTokenFromCookie";
import getCurrentUserDetails from "./getCurrentUserDetails";
import logout from "./logout";
import newAxiosRequest from "./newAxiosRequest";

export default function initialAuthChecks() {
  const authToken = getAuthTokenFromCookie();
  if (authToken == null) {
    console.log("No Auth token");
    logout();
  } else if (getCurrentUserDetails() == null) {
    console.log("No user details");
    logout();
  } else {
    newAxiosRequest.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${authToken}`;
  }
}
