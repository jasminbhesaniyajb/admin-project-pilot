import axiosClient from "./axios-client";

export const login = (data: any) => {
  return axiosClient.post("/login", data);
};

export const signup = (data: any) => {
  return axiosClient.post("/register", data);
};
