const HOST = "192.168.1.4";
// const HOST = "localhost";

// export const API_BASE_URL = `http://${HOST}:5000/api`;
const API_TIMEOUT = 10000;

export const API_BASE_URL = `http://backend.streamer.ahmadullah.in`;

// export const LIVE_SERVER_URL = `rtmp://${HOST}:1935/live/stream`;
// export const SOCKET_SERVER_URL = `ws://${HOST}:5000`;

export const LIVE_SERVER_URL = `rtmp://live.streamer.ahmadullah.in/live/stream`;
export const SOCKET_SERVER_URL = `ws://ws.streamer.ahmadullah.in`;

export const ENDPOINTS = {
  LOGIN: () => "/auth/login",
  REGISTER: () => "/auth/register",
  LOGOUT: () => "/auth/logout",
  REFRESH_TOKEN: () => "/auth/refresh-token",
  GET_LIVE_STREAMS: () => "/streams",
  GET_LIVE_STREAM: (id) => `/streams/${id}`,
  CREATE_LIVE_STREAM: () => "/streams",
};
