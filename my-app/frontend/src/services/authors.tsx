import type { Author } from "../types.ts";
import apiClient from "../util/axios.ts";

const BASE_URL = "/api/authors";

const getAll = async (): Promise<Author[]> => {
  const request = await apiClient.get(BASE_URL);

  return request.data;
};

export default {
  getAll,
};
