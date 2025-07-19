
import React, { createContext, useState, useEffect } from "react";
import { loginApi } from "../utils/api";

type AuthContextType = {
  isAuthenticated: boolean;
  token: string | null;
  role: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  token: null,
  role: null,
  login: async () => false,
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem("token"));
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [role, setRole] = useState<string | null>(localStorage.getItem("role"));

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("token"));
    setToken(localStorage.getItem("token"));
    setRole(localStorage.getItem("role"));
  }, []);

  const login = async (email: string, password: string) => {
    const res = await loginApi(email, password);
    if (res.token) {
      setIsAuthenticated(true);
      setToken(res.token);
      setRole(res.role);
      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.role);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    setRole(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};