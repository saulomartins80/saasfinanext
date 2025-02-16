import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function Configuracoes() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-6">
          <h1 className="text-2xl font-bold">Configurações</h1>
          {/* Adicione conteúdo específico da página de configurações aqui */}
        </div>
      </div>
    </div>
  );
}
