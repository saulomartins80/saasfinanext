import { User, ChevronDown, LogOut, Settings } from "lucide-react";
import { useState } from "react";

export default function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <User size={24} className="text-gray-900 dark:text-white" />
        <ChevronDown size={16} className="text-gray-900 dark:text-white" />
      </button>

      {/* Dropdown do Perfil */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50">
          <ul className="p-2">
            <li className="flex items-center space-x-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <Settings size={16} className="text-gray-900 dark:text-white" />
              <span className="text-sm text-gray-900 dark:text-white">Configurações</span>
            </li>
            <li className="flex items-center space-x-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <LogOut size={16} className="text-gray-900 dark:text-white" />
              <span className="text-sm text-gray-900 dark:text-white">Sair</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}