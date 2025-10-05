export type Token = string;

export interface AuthUser {
  username: string;
  name: string;
  token: Token;
  userId: string;
}

export interface Blog {
  id: string;
  author?: string;
  url: string;
  title: string;
  likes: number;
  year: number;
  createdAt: string;
  updatedAt: string;
}

export interface BlogWithUser extends Blog {
  user: { name: string; username: "string" };
}

export interface ReadingBlog extends Omit<Blog, "createdAt" | "updatedAt"> {
  readinglists: {
    read: boolean;
    id: string;
    blogId: string;
    userId: string;
  };
}

export type NewBlog = Pick<Blog, "author" | "url" | "title" | "year">;

export interface User {
  id: number;
  name: string;
  username: string;
}

export interface UserDetails extends User {
  readings: ReadingBlog[];
}

export type NewUser = Omit<User, "id"> & { password: string };

export interface Author {
  author: string;
  article: number;
  likes: number;
}
