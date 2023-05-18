import { createTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";

function useCustomTheme() {
  const [theme, setTheme] = useState<any>(null);

  useEffect(() => {
    fetch("/api/theme-colors")
      .then((response) => response.json())
      .then((colors) => {
        const customTheme = createTheme({
          palette: {
            primary: colors.primary,
            secondary: colors.secondary,
            warning: colors.warning,
            error: colors.error,
            success: colors.success,
          },
        });
        setTheme(customTheme);
      })
      .catch((error) => {
        console.error("Error fetching theme colors:", error);
      });
  }, []);

  return theme;
}

export default useCustomTheme;
