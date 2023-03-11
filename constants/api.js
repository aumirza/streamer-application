// export const API_BASE_URL = "http://localhost:3000/api";
export const API_BASE_URL = "http://192.168.176.71:5000/api";
const API_TIMEOUT = 10000;

export const ENDPOINTS = {
  LOGIN: () => "/auth/login",
  REGISTER: () => "/auth/register",
  LOGOUT: () => "/auth/logout",
  REFRESH_TOKEN: () => "/auth/refresh-token",
  GET_LIVE_STREAMS: () => "/live-streams",
  GET_LIVE_STREAM: (id) => `/live-streams/${id}`,
  CREATE_LIVE_STREAM: () => "/live-streams",
};
