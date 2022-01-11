export function setAccessToken(token) {
  localStorage.setItem("token", token);
}

export function getAccessToken() {
  return localStorage.getItem("token");
}

export function removeAccessToken() {
  localStorage.removeItem("token");
}
