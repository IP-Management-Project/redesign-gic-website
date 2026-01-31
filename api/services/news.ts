import { apiClient } from "../axiosClient";

export interface User {
  id: number;
  name: string;
  email: string;
}

export const userApi = {
  getUsers: () => apiClient.get<User[]>("/users"),

  getUserById: (id: number) =>
    apiClient.get<User>(`/users/${id}`),

  createUser: (data: Partial<User>) =>
    apiClient.post<User>("/users", data),

  updateUser: (id: number, data: Partial<User>) =>
    apiClient.put<User>(`/users/${id}`, data),

  deleteUser: (id: number) =>
    apiClient.delete<void>(`/users/${id}`),
};
