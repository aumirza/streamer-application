import axios from "axios";
import { ENDPOINTS } from "../constants/api";

class ApiService {
  constructor() {}

  getLiveStreams = async () => {
    return new Promise((resolve, reject) => {
      axios
        .get(ENDPOINTS.GET_LIVE_STREAMS())
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data);
          }
          reject(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  login = async (email, password) => {
    return new Promise((resolve, reject) => {
      axios
        .post(ENDPOINTS.LOGIN(), {
          email,
          password,
        })
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data);
          }
          reject(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}

export default new ApiService();
