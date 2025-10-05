import type { NewUser, User, UserDetails } from "../types.ts";
import apiClient from "../util/axios.ts";

const BASE_URL = "/api/users";

const create = async (user: NewUser): Promise<User> => {
  const request = await apiClient.post(BASE_URL, {
    ...user,
  });

  return request.data;
};

const getOne = async (id: string): Promise<UserDetails> => {
  const request = await apiClient.get(`${BASE_URL}/${id}`);

  return request.data;
};

export default {
  create,
  getOne,
};
