import type { AuthUser } from "../types.ts";
import apiClient from "../util/axios.ts";

const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<AuthUser> => {
  const request = await apiClient.post<AuthUser>("api/login", {
    username,
    password,
  });

  return request.data;
};

const logout = async () => {
  const request = await apiClient.post("api/logout");

  return request.data;
};

export default {
  login,
  logout,
};
