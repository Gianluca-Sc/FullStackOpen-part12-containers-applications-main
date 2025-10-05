import { type AuthUser } from "./../types";

export const getUserFromLocalStorage = (): AuthUser | null => {
  const loggedInUserJSON = localStorage.getItem("user");
  if (!loggedInUserJSON) return null;

  const user = JSON.parse(loggedInUserJSON);

  if (typeof user.username === "string" && typeof user.token === "string") {
    return user as AuthUser;
  }
  return null;
};
