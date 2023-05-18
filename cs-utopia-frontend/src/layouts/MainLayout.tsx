import Header from "@/components/shared/Header";
import {CustomTheme, CustomThemeLight} from "@/styles/theme";
import { ThemeProvider } from "@emotion/react";
import { Box } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import React, {ReactNode, useContext, useEffect, useLayoutEffect} from "react";
import {CustomThemeContext} from "@/context/theme-context";
import LoadingOverlay from "@/components/shared/LoadingOverlay";

interface MainLayoutProps {
  children: ReactNode;
  routes: { name: string; path: string; icon?: any }[];
  theme?: any;
  isLoading?: boolean;
  loadingText?: string;
    bgColor?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, routes, theme , isLoading, loadingText, bgColor}) => {
  const themeCtx = useContext(CustomThemeContext);

  useEffect(() => {
      const ModuleTheme = theme
          ? createTheme({
              palette: {
                  mode: 'dark',
                  primary: theme.primary,
                  secondary: theme.secondary,
                  text: {
                      primary: '#fff',
                      secondary: '#fff'
                  },
              },
          })
          : CustomTheme;
      themeCtx.addTheme(ModuleTheme);
  }, [theme])

    useEffect(() => {
        if(themeCtx.mode === 'dark') {
            const ModuleTheme = theme
                ? createTheme({
                    palette: {
                        mode: 'dark',
                        primary: theme.primary,
                        secondary: theme.secondary,
                    },
                })
                : CustomTheme;
            themeCtx.addTheme(ModuleTheme);
        } else {
            themeCtx.addTheme(CustomThemeLight);
        }
    }, [themeCtx.mode])

  return (
      <Box
        sx={{ bgcolor: bgColor ? themeCtx?.theme?.palette?.primary?.main : themeCtx?.theme?.palette?.primary?.dark, minHeight: "100vh", height: '100%' }}
      >
          {isLoading ?
              <LoadingOverlay loadingMessage={loadingText} /> :
              <>
                  <Header routes={routes} />
                  {children}
              </>
          }
      </Box>
  );
};

export default MainLayout;
