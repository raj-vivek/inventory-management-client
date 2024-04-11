export default function getAuthTokenFromCookie() {
  const cookieString = document.cookie;
  const cookies = cookieString.split("; ");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === "accessToken") {
      return cookieValue;
    }
  }
  return null;
}

export function isLoggedIn() {
  if (getAuthTokenFromCookie() == null) return false;
  return true;
}
