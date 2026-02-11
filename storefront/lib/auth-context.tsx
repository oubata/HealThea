"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

interface AuthContextType {
  customer: Customer | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: { firstName: string; lastName: string; email: string; password: string }) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<Customer>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AUTH_STORAGE_KEY = "healthea-auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) setCustomer(JSON.parse(stored));
    } catch { /* empty */ }
  }, []);

  const persist = useCallback((c: Customer | null) => {
    setCustomer(c);
    if (c) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(c));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, []);

  const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
    // In production, call Medusa auth endpoint
    persist({
      id: "cus_demo",
      firstName: "Tea",
      lastName: "Lover",
      email,
      phone: "",
    });
    return true;
  }, [persist]);

  const register = useCallback(async (data: { firstName: string; lastName: string; email: string; password: string }): Promise<boolean> => {
    // In production, call Medusa customer registration
    persist({
      id: "cus_" + Math.random().toString(36).substring(2, 8),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    });
    return true;
  }, [persist]);

  const logout = useCallback(() => {
    persist(null);
  }, [persist]);

  const updateProfile = useCallback((data: Partial<Customer>) => {
    setCustomer((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...data };
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        customer,
        isAuthenticated: !!customer,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
