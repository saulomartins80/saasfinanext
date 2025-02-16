import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) return null;

  return (
    <button
      onClick={themeContext.toggleTheme}
      className="p-2 rounded bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
      aria-label="Alternar Tema"
    >
      {themeContext.theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}

