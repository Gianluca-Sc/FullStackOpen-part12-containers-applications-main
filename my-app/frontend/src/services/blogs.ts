import type { Blog, BlogWithUser, NewBlog } from "../types.ts";
import apiClient from "../util/axios.ts";

const BASE_URL = "/api/blogs";

const getAll = async (search: string | null): Promise<BlogWithUser[]> => {
  let params: Record<string, string> = {};

  if (search) {
    params.search = search;
  }
  const request = await apiClient.get(BASE_URL, {
    params,
  });
  console.log(request);

  return request.data;
};

const getOne = async (id: string | undefined): Promise<BlogWithUser> => {
  const request = await apiClient.get(`${BASE_URL}/${id}`);
  return request.data;
};

const updateLikes = async (
  id: string,
  likes: number
): Promise<BlogWithUser> => {
  const request = await apiClient.put(`${BASE_URL}/${id}`, {
    likes,
  });

  return request.data;
};

const create = async (blog: NewBlog): Promise<Blog> => {
  const request = await apiClient.post(BASE_URL, {
    ...blog,
  });

  return request.data;
};

const deleteBlog = async (id: string): Promise<void> => {
  await apiClient.delete(`${BASE_URL}/${id}`);
};

export default {
  getAll,
  updateLikes,
  getOne,
  create,
  deleteBlog,
};
