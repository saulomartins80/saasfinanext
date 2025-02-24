import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function Configuracoes() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} />

        {/* Conteúdo da página */}
        <div className="p-6">
          <h1 className="text-2xl font-bold">Configurações</h1>
          {/* Adicione conteúdo específico da página de configurações aqui */}
        </div>
      </div>
    </div>
  );
}