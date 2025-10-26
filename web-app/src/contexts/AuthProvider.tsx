"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { login as loginAPI } from "@/lib";
import { useRouter } from "next/navigation";
import { AuthLoginPayload, AuthLoginResponse, VoidFn } from "@/types";
import { getCookie, removeCookie, setCookie } from "@/utils";
import { useUserStore } from "@/stores";

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (payload: AuthLoginPayload) => Promise<void>;
  logout: VoidFn;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user, setUser, clearUser } = useUserStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const login = async (payload: AuthLoginPayload): Promise<void> => {
    try {
      setIsLoading(true);
      const response: AuthLoginResponse = await loginAPI(payload);
      setUser(response.user);
      setCookie("token", response.token);
      router.push("/");
    } catch (_error) {
      //
    }
    setIsLoading(false);
  };

  const logout = () => {
    removeCookie("token");
    clearUser();
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
