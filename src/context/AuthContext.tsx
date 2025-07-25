// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

export interface UserType {
  id: number;
  email: string;
  role: string;
}

interface AuthContextType {
  user: UserType | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: async () => false,
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  // Decodifica el token cada vez que cambie
  useEffect(() => {
    if (token) {
      try {
        const decoded: any = jwt_decode(token);
        // Solo actualiza si el user no coincide (previene loops)
        if (!user || user.id !== decoded.userId) {
          setUser({
            id: decoded.userId,
            email: decoded.sub,
            role: decoded.role,
          });
        }
      } catch {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
      }
    } else {
      setUser(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // Método login para usar en Login.tsx
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      //const res = await fetch("http://localhost:8080/auth/login", {
        const res = await fetch("https://servidorbanquigt.site:8081/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) return false;

      const data = await res.json();
      if (data && data.token) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        // Decodifica y guarda user
        const decoded: any = jwt_decode(data.token);
        setUser({
          id: decoded.userId,
          email: decoded.sub,
          role: decoded.role,
        });
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};