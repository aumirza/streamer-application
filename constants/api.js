const HOST = "192.168.1.244";

export const API_BASE_URL = `http://${HOST}:5000/api`;
const API_TIMEOUT = 10000;

export const SOCKET_SERVER_URL = `ws://${HOST}:5000`;

export const LIVE_SERVER_URL = `localhost:1935/live`;

export const ENDPOINTS = {
  LOGIN: () => "/auth/login",
  REGISTER: () => "/auth/register",
  LOGOUT: () => "/auth/logout",
  REFRESH_TOKEN: () => "/auth/refresh-token",
  GET_LIVE_STREAMS: () => "/streams",
  GET_LIVE_STREAM: (id) => `/streams/${id}`,
  CREATE_LIVE_STREAM: () => "/streams",
};
