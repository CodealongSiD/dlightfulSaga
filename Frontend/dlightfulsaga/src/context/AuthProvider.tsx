import React, { useState, useEffect } from "react";
import type { AuthContextType, User } from "./AuthContext";
import { AuthContext } from "./AuthContext"; 
import axiosInstance from "@/context/axiosInstance";

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Restore session on app load
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const loginTimestamp = localStorage.getItem("loginTimestamp");

    if (storedToken && storedUser && loginTimestamp) {
      const loginTime = parseInt(loginTimestamp, 10);
      const now = Date.now();

      // If 24 hours have passed since login, logout immediately
      if (now - loginTime > ONE_DAY_MS) {
        logout();
        return;
      }

      // Otherwise, fetch user data to confirm token validity
      axiosInstance
        .get("/auth/me", {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((res) => {
          setUser(res.data);
          setToken(storedToken);
          localStorage.setItem("user", JSON.stringify(res.data));
        })
        .catch((err) => {
          if (err.response?.status === 401) {
            logout();
          }
        });
    }
  }, []);

  // Auto logout after 24 hours since login
  useEffect(() => {
    if (!token) return;

    const loginTimestamp = localStorage.getItem("loginTimestamp");
    if (!loginTimestamp) return;

    const loginTime = parseInt(loginTimestamp, 10);
    const now = Date.now();
    const timeElapsed = now - loginTime;
    const timeLeft = ONE_DAY_MS - timeElapsed;

    // Schedule logout after remaining time left
    const timeoutId = setTimeout(() => {
      logout();
      alert("Your session has expired after 24 hours. Please login again.");
    }, timeLeft);

    return () => clearTimeout(timeoutId);
  }, [token]);

  // Sync logout across tabs
  useEffect(() => {
    const handleStorageChange = () => {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
      if (!storedToken || !storedUser) {
        logout();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = (user: User, token: string) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("loginTimestamp", Date.now().toString());
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("loginTimestamp");
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
