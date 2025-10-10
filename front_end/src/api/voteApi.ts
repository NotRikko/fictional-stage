import { fetchClient } from "./fetchClient";

export const voteApi = {
  createVote: async (data: { userId: number; characterVote: number }) => {
    return fetchClient("/votes", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};