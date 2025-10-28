"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
} from "react";
import { login as loginAPI } from "@/lib";
import { usePathname, useRouter } from "next/navigation";
import { AuthLoginPayload, AuthLoginResponse, Nullable, VoidFn } from "@/types";
import { getCookie, removeCookie, setCookie } from "@/utils";
import { useUserStore, useGenerationStore } from "@/stores";

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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { user, setUser, clearUser } = useUserStore();
  const { clearGenerations } = useGenerationStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const login = async (payload: AuthLoginPayload): Promise<void> => {
    try {
      setIsLoading(true);
      const response: AuthLoginResponse = await loginAPI(payload);
      setUser(response.user);
      setCookie("token", response.token);
      setIsAuthenticated(true);
      router.push("/");
    } catch (_error) {
      throw _error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Clear all stores
    clearUser();
    clearGenerations();

    // Clear token
    removeCookie("token");

    // Clear all localStorage (if you want to clear everything)
    localStorage.clear();

    // Or clear specific items only:
    // localStorage.removeItem('user-storage');
    // localStorage.removeItem('generation-storage');

    // Redirect to login
    router.push("/login");
  };

  useEffect(() => {
    const token = getCookie("token");
    const isAuthPage = new Set(["/login", "/register"]).has(pathname);
    if (token) {
      setIsAuthenticated(true);
      if (isAuthPage) {
        router.push("/");
      }
    } else {
      setIsAuthenticated(false);
      if (!isAuthPage) {
        router.push("/login");
      }
    }
    setIsLoading(false);
  }, [pathname]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
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
