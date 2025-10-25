"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    // Check localStorage and system preference
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    // Check if the user prefers dark mode
    // const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
     const prefersDark = false;
    // If storedTheme exists, use it; otherwise, use system preference
    const initialTheme = storedTheme || (prefersDark ? "dark" : "light");
    // Apply the initial theme
    setTheme(initialTheme);
    
    // Update the document class based on the initial theme
    if (initialTheme === "dark") {
    // Apply dark theme class
      document.documentElement.classList.add("dark");
    }
  }, []);

/**
 * Toggle between light and dark themes
 */
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // if (!mounted) {
  //   return <>{children}</>;
  // }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
/** 
 * Hook to use the ThemeContext
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
