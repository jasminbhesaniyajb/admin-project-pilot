import axiosClient from "./axios-client";

export const login = (data: any) => {
  return axiosClient.post("/login", data);
};

export const signup = (data: any) => {
  return axiosClient.post("/register", data);
};

export const forgotPassword = (data: { email: string; newPassword: string }) => {
  return axiosClient.post('/forgot-password', data);
};
