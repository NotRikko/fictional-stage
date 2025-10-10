import { fetchClient } from "./fetchClient";

export const userApi = {
  getCurrentUser: async () =>
    fetchClient("/users/me", { method: "GET", auth: true }),

  updateProfile: async (data: unknown) =>
    fetchClient("/users/me", {
      method: "PUT",
      auth: true,
      body: JSON.stringify(data),
    }),
};