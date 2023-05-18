import React, { createContext, useState } from "react";
import {CustomTheme} from "@/styles/theme";

export type CustomThemeContextProps = {
  theme: any;
  addTheme: (theme: any) => void;
  toggleTheme: () => void;
  mode: 'light' | 'dark';
};

export const CustomThemeContext = createContext<CustomThemeContextProps>({
  theme: CustomTheme,
  addTheme: () => {},
  toggleTheme: () => {},
  mode: 'dark'
});

export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<any>(CustomTheme);
  const [mode, setMode] = useState<"light" | "dark">("dark");

  const addTheme = (theme: any) => {
    setTheme(theme);
  };

    const toggleTheme = () => {
      const updatedMode = mode === "light" ? "dark" : "light";
      setMode(updatedMode);
    }

  const contextValue = {
    theme,
    addTheme,
    toggleTheme,
    mode
  };

  return <CustomThemeContext.Provider value={contextValue}>{children}</CustomThemeContext.Provider>;
};

export const CustomThemeConsumer = CustomThemeContext.Consumer;
