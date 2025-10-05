import { createContext, useContext, useEffect, useState } from "react";
import type { AuthUser } from "../types.ts";
import { getUserFromLocalStorage } from "../util/getUserFromLocalStorage.ts";
import { useNavigate } from "react-router";

interface AuthContext {
  user: AuthUser | null;
  loginUser: (user: AuthUser) => void;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContext | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const result = getUserFromLocalStorage();

    if (result) {
      setUser(result);
    }
  }, []);

  const loginUser = (user: AuthUser) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const logoutUser = () => {
    try {
      localStorage.removeItem("user");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("context not found");
  }

  return context;
};
