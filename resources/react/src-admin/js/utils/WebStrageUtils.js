export function setSession(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

export function getSession(key) {
  return JSON.parse(sessionStorage.getItem(key));
}

export function setLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getLocal(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function delLocal(key) {
  return localStorage.removeItem(key);
}
