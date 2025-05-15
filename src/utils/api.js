import React from 'react';
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API = axios.create({
  baseURL: `${BASE_URL}`,
});

export const signup = (data) => API.post("/auth/signup", data);
export const login = (data) => API.post("/auth/login", data);


const getToken = () => localStorage.getItem("token");

export const createProject = async (userId, projectData) =>
  axios.post(`${BASE_URL}/project/${userId}/createProject`, projectData, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

export const getUserProjects = async (userId) =>
  axios.get(`${BASE_URL}/project/${userId}/projects`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

export const deleteProject = async (userId, projectId) =>
  axios.delete(`${BASE_URL}/project/${userId}/${projectId}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });


export const createTask = (userId, projectId, taskData, token) => {
  return API.post(`/tasks/${userId}/${projectId}/createTask`, taskData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getTasks = (userId, projectId, token) => {
  return API.get(`/tasks/${userId}/${projectId}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateTask = (userId, projectId, taskId, updates, token) => {
  return API.put(`/tasks/${userId}/${projectId}/${taskId}`, updates, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteTask = (userId, projectId, taskId, token) => {
  return API.delete(`/tasks/${userId}/${projectId}/${taskId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
