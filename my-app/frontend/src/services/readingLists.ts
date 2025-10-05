import type { NewUser, User, UserDetails } from "../types.ts";
import apiClient from "../util/axios.ts";

const BASE_URL = "/api/readinglists";

const create = async (blogId: string): Promise<void> => {
  await apiClient.post(BASE_URL, {
    blogId,
  });
};

const remove = async (readingId: string) => {
  console.log("remove service", readingId);

  await apiClient.delete(`${BASE_URL}/${readingId}`);
};

export default {
  create,
  remove,
};
