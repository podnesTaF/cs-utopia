import { createTheme } from "@mui/material/styles";

export const CustomTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      light: "#583C84",
      main: "#484153",
      dark: "#1E1E1E",
    },
    secondary: {
      light: "#F3FB8C",
      main: "#23B1D0",
      dark: "#810984",
      contrastText: "#FFFFFF",
    },
    warning: {
      light: "#ffe278",
      main: "#FFC700",
      dark: "#EDB932",
    },
    error: {
      main: "#f36f6f",
    },
    success: {
      main: "#99D98C",
      dark: "#76C893",
      light: "#76C893",
    },
  },
});

export const CustomThemeLight = createTheme({
  palette: {
    mode: "light",
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.6)",
      disabled: "rgba(0, 0, 0, 0.38)",
    },
    primary: {
      light: "#fdfdff",
      main: "#e5ddf6",
      dark: "#e9dbff",
      contrastText: "black",
    },
    secondary: {
      light: "#f2ffdb",
      main: "#89e6ff",
      dark: "#3790a6",
      contrastText: "black",
    },
    warning: {
      light: "#FFF6CC",
      main: "#FFC700",
      dark: "#E6AF00",
    },
    error: {
      main: "#F87171",
    },
    success: {
      main: "#A7F3D0",
      dark: "#6EE7B7",
      light: "#B4FEEA",
    },
  },
});
