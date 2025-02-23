import "../styles/globals.css";
import { ThemeProvider } from "../context/ThemeContext";

export default function MyApp({ Component, pageProps }: any) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}