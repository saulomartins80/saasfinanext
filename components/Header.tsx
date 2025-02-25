import { Menu } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import Notifications from "./Notifications";
import ProfileMenu from "./ProfileMenu";

export default function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md z-20">
      {/* Botão para abrir/fechar o sidebar (mobile e desktop) */}
      <button
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        onClick={toggleSidebar}
      >
        <Menu size={24} className="text-gray-900 dark:text-white" />
      </button>

      {/* Título do Header */}
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">Finanext</h1>

      {/* Ícones de Ação */}
      <div className="flex items-center space-x-4">
        <Notifications />
        <ProfileMenu />
        <ThemeToggle />
      </div>
    </header>
  );
}