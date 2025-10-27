"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  use,
  useRef,
} from "react";
import { login as loginAPI } from "@/lib";
import { usePathname, useRouter } from "next/navigation";
import { AuthLoginPayload, AuthLoginResponse, Nullable, VoidFn } from "@/types";
import { getCookie, removeCookie, setCookie } from "@/utils";
import { useUserStore } from "@/stores";

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: Nullable<User>;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (payload: AuthLoginPayload) => Promise<void>;
  logout: VoidFn;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const isAuthenticated = useRef<boolean>(false);
  const { user, setUser, clearUser } = useUserStore();
  const router = useRouter();
  const pathname = usePathname(); // Get current path
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const login = async (payload: AuthLoginPayload): Promise<void> => {
    try {
      setIsLoading(true);
      const response: AuthLoginResponse = await loginAPI(payload);
      setUser(response.user);
      setCookie("token", response.token);
      isAuthenticated.current = true;
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

  useEffect(() => {
    const token = getCookie("token");
    const isAuthPage = new Set(["/login", "/register"]).has(pathname);
    if (token) {
      isAuthenticated.current = true;
      if (isAuthPage) {
        router.push("/");
      }
    } else {
      isAuthenticated.current = false;
      if (!isAuthPage) {
        router.push("/login");
      }
    }
  }, [pathname]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: isAuthenticated.current,
        isLoading,
        login,
        logout,
      }}
    >
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
