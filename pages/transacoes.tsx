import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function Transacoes() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-6">
          <h1 className="text-2xl font-bold">Transações</h1>
          {/* Adicione conteúdo específico da página de transações aqui */}
        </div>
      </div>
    </div>
  );
}
