import jwtDecode from "jwt-decode";


export function setToken(token) {
  localStorage.setItem(process.env.TOKEN, token);
}

export function getToken() {
  return localStorage.getItem(process.env.TOKEN);
}

export function removeToken() {
  localStorage.removeItem(process.env.TOKEN);
}

export function hasExpiredToken(token) {
  const tokenDecode = jwtDecode(token);
  const expireDate = tokenDecode.exp * 1000;
  const currentDate = new Date().getTime();
  if (currentDate > expireDate) {
    return true;
  }
  return false;
}