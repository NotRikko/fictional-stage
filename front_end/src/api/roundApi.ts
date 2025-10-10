import { fetchClient } from "./fetchClient";

export const roundApi = {
    getRoundById: async (id: number) => {
        return fetchClient(`/rounds/${id}`, { method: "GET" });
    },
};