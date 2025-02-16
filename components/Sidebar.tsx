import Link from "next/link";
import { Home, TrendingUp, Target, Settings, Menu, FilePlus } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Sidebar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const isActive = (path: string) => router.pathname === path;

  return (
    <div className={`w-64 bg-gray-900 text-white h-full flex flex-col p-5 ${isOpen ? "block" : "hidden"} md:block`}>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-6">Finanext</h2>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <Menu size={24} />
        </button>
      </div>
      <ul className="space-y-4">
        <li className={`flex items-center space-x-3 cursor-pointer hover:bg-gray-800 p-2 rounded ${isActive('/') ? 'bg-gray-700' : ''}`}>
          <Link href="/" className="flex items-center space-x-3 w-full">
            <Home size={20} />
            <span className="hover:underline">Dashboard</span>
          </Link>
        </li>
        <li className={`flex items-center space-x-3 cursor-pointer hover:bg-gray-800 p-2 rounded ${isActive('/transacoes') ? 'bg-gray-700' : ''}`}>
          <Link href="/transacoes" className="flex items-center space-x-3 w-full">
            <TrendingUp size={20} />
            <span className="hover:underline">Transações</span>
          </Link>
        </li>
        <li className={`flex items-center space-x-3 cursor-pointer hover:bg-gray-800 p-2 rounded ${isActive('/metas') ? 'bg-gray-700' : ''}`}>
          <Link href="/metas" className="flex items-center space-x-3 w-full">
            <Target size={20} />
            <span className="hover:underline">Metas</span>
          </Link>
        </li>
        <li className={`flex items-center space-x-3 cursor-pointer hover:bg-gray-800 p-2 rounded ${isActive('/lancamento') ? 'bg-gray-700' : ''}`}>
          <Link href="/lancamento" className="flex items-center space-x-3 w-full">
            <FilePlus size={20} />
            <span className="hover:underline">Lançamentos</span>
          </Link>
        </li>
        <li className={`flex items-center space-x-3 cursor-pointer hover:bg-gray-800 p-2 rounded ${isActive('/configuracoes') ? 'bg-gray-700' : ''}`}>
          <Link href="/configuracoes" className="flex items-center space-x-3 w-full">
            <Settings size={20} />
            <span className="hover:underline">Configurações</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
