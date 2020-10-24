// localStorage是一个浏览器对象，能存储数据
export function getToken() {
  return localStorage.token
}

export function setToken(token) {
  return localStorage.token = token
}

export function removeToken() {
  return localStorage.removeItem('token')
}
