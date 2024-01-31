import { TooltipProvider } from "@/components/ui/tooltip";
import "@/styles/globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GoogleAnalytics gaId="G-4JL0CD3631" />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider>
          <Component {...pageProps} />
        </TooltipProvider>
      </ThemeProvider>
    </>
  );
}
