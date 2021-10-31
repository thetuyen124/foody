import axios from "axios";

const rootAPI = "http://localhost:8080/";
const getHeader = () => {
  const accessToken = localStorage.getItem("token");
  const authHeader = accessToken
    ? { Authorization: `Bearer ${accessToken}` }
    : {};
  return authHeader;
};

const get = (endPoint) => {
  return axios.get(rootAPI + endPoint, { headers: getHeader() });
};
const post = (endPoint, data = {}) => {
  return axios.post(rootAPI + endPoint, data, { headers: getHeader() });
};
const put = (endPoint, data = {}) => {
  return axios.put(rootAPI + endPoint, data, { headers: getHeader() });
};
const apiDelete = (endPoint) => {
  return axios.delete(rootAPI + endPoint, { headers: getHeader() });
};

export const httpClient = {
  get,
  post,
  delete: apiDelete,
  put,
};
