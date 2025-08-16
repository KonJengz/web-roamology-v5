import axiosInstance from "../config/axios";
const authApi = {};

authApi.login = (input) => {
  return axiosInstance.post("/auth/login", input);
};

authApi.register = (input) => {
  return axiosInstance.post("/auth/register", input);
};

authApi.getMe = (input) => {
  return axiosInstance.get("/user/me", input);
};

authApi.logout = () => {
  return axiosInstance.post("/auth/logout");
};

export default authApi;
