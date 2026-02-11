"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { medusaClientFetch } from "@/lib/medusa";

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

const TOKEN_KEY = "healthea-auth-token";

async function fetchCustomerProfile(token: string): Promise<Customer | null> {
  try {
    const data = await medusaClientFetch<{
      customer: {
        id: string;
        first_name: string;
        last_name: string;
        email: string;
        phone: string | null;
      };
    }>("/store/customers/me", { token });
    const c = data.customer;
    return {
      id: c.id,
      firstName: c.first_name || "",
      lastName: c.last_name || "",
      email: c.email,
      phone: c.phone || "",
    };
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Hydrate: check for existing token on mount
  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (storedToken) {
      setToken(storedToken);
      fetchCustomerProfile(storedToken).then((c) => {
        if (c) {
          setCustomer(c);
        } else {
          localStorage.removeItem(TOKEN_KEY);
          setToken(null);
        }
      });
    }
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      // Step 1: Authenticate with Medusa
      const authData = await medusaClientFetch<{ token: string }>(
        "/auth/customer/emailpass",
        { method: "POST", body: { email, password } }
      );

      const newToken = authData.token;
      setToken(newToken);
      localStorage.setItem(TOKEN_KEY, newToken);

      // Step 2: Fetch customer profile
      const c = await fetchCustomerProfile(newToken);
      if (c) {
        setCustomer(c);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }, []);

  const register = useCallback(async (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<boolean> => {
    try {
      // Step 1: Create auth identity
      const authData = await medusaClientFetch<{ token: string }>(
        "/auth/customer/emailpass/register",
        { method: "POST", body: { email: data.email, password: data.password } }
      );

      const newToken = authData.token;

      // Step 2: Create customer profile
      await medusaClientFetch("/store/customers", {
        method: "POST",
        token: newToken,
        body: {
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
        },
      });

      setToken(newToken);
      localStorage.setItem(TOKEN_KEY, newToken);

      // Step 3: Fetch the created customer
      const c = await fetchCustomerProfile(newToken);
      if (c) {
        setCustomer(c);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    setCustomer(null);
    setToken(null);
    localStorage.removeItem(TOKEN_KEY);
  }, []);

  const updateProfile = useCallback(
    async (data: Partial<Customer>) => {
      if (!token || !customer) return;

      // Optimistic update
      setCustomer((prev) => (prev ? { ...prev, ...data } : prev));

      try {
        await medusaClientFetch("/store/customers/me", {
          method: "POST",
          token,
          body: {
            first_name: data.firstName ?? customer.firstName,
            last_name: data.lastName ?? customer.lastName,
            phone: data.phone ?? customer.phone,
          },
        });
      } catch (e) {
        console.error("Failed to update profile:", e);
      }
    },
    [token, customer]
  );

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
