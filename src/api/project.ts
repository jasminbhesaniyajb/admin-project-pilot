import type { ProjectData } from "../types";
import axiosClient from "./axios-client";

export const getProjectList = () => {
  return axiosClient.get("/projects");
};

export const getProjectDetailsById = (id: string) => {
  return axiosClient.get(`/projects/${id}`);
};

export const createProject = (data: any) => {
  return axiosClient.post("/projects", data);
};

export const updateProject = (id: string, data: ProjectData) => {
  return axiosClient.put(`/projects/${id}`, data);
};
export const deleteProject = (id: string) => {
  return axiosClient.delete(`/projects/${id}`);
};
