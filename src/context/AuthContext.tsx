import React, { createContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { loginApi } from '../utils/api';

type AuthContextType = {
  isAuthenticated: boolean;
  user: any;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => false,
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token'));
  const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user') || 'null'));
  const history = useHistory();

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('token'));
    setUser(JSON.parse(localStorage.getItem('user') || 'null'));
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const res = await loginApi(username, password);
      if (res && res.token) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        setUser(res.user);
        setIsAuthenticated(true);
        history.replace('/dashboard');
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    history.replace('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};