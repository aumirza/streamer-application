// const HOST = "192.168.1.17";
const HOST = "localhost";

export const API_BASE_URL = `http://${HOST}:3000/api`;
// export const API_BASE_URL = "https://1ba6-146-196-37-45.in.ngrok.io/api";
const API_TIMEOUT = 10000;

export const LIVE_SERVER_URL = `rtmp://${HOST}:1935/live`;

export const ENDPOINTS = {
  LOGIN: () => "/auth/login",
  REGISTER: () => "/auth/register",
  LOGOUT: () => "/auth/logout",
  REFRESH_TOKEN: () => "/auth/refresh-token",
  GET_LIVE_STREAMS: () => "/streams",
  GET_LIVE_STREAM: (id) => `/streams/${id}`,
  CREATE_LIVE_STREAM: () => "/streams",
};
