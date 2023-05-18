import "@/styles/globals.scss";
import { CustomTheme } from "@/styles/theme";
import { ThemeProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import {CustomThemeConsumer, CustomThemeProvider} from "@/context/theme-context";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <CustomThemeProvider>
            <CustomThemeConsumer>
                {({ theme }) => (
                    <ThemeProvider theme={theme || CustomTheme}>
                        <Component {...pageProps} />
                    </ThemeProvider>
                )}
            </CustomThemeConsumer>
        </CustomThemeProvider>
    );
}