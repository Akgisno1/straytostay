"use client";

import { createContext, useEffect, useState, useContext } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentNgo, setCurrentNgo] = useState(null);
  useEffect(() => {
    // Check if window is defined to ensure this runs only in the browser
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setCurrentUser(storedUser);
      }
    }
  }, []);

  const updateUser = (data) => {
    setCurrentUser(data);
  };
  useEffect(() => {
    // Check if window is defined to ensure this runs only in the browser
    if (typeof window !== "undefined") {
      const storedNgo = JSON.parse(localStorage.getItem("ngo"));
      if (storedNgo) {
        setCurrentNgo(storedNgo);
      }
    }
  }, []);

  const updateNgo = (data) => {
    setCurrentNgo(data);
  };

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    }
  }, [currentUser]);
  useEffect(() => {
    if (currentNgo) {
      localStorage.setItem("ngo", JSON.stringify(currentNgo));
    }
  }, [currentNgo]);

  return (
    <AuthContext.Provider
      value={{ currentUser, updateUser, currentNgo, updateNgo }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};
