import type { AppProps } from "next/app";
import { ThemeProvider } from "../context/ThemeContext"; // Ajuste o caminho conforme necessário
import "../styles/globals.css"; // Ajuste o caminho do arquivo de estilos globais

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;