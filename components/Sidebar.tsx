import Link from "next/link";
import { Home, TrendingUp, Target, Book, PlusSquare, X } from "lucide-react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const router = useRouter();

  const isActive = (path: string) => router.pathname === path;

  return (
    <>
      {/* Sidebar para desktop (sempre visível, mas controlável) */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="fixed md:relative w-64 bg-white dark:bg-gray-800 text-gray-900 dark:text-white h-full flex-col p-5 shadow-lg z-40"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold mb-6">Finanext</h2>
          {/* Botão para fechar o sidebar (apenas no mobile) */}
          <button
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition md:hidden"
            onClick={onClose}
          >
            <X size={24} className="text-gray-900 dark:text-white" />
          </button>
        </div>
        <ul className="space-y-4">
          {/* Link: Visão Geral */}
          <li className={`flex items-center space-x-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded ${isActive('/') ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100' : ''}`}>
            <Link href="/" className="flex items-center space-x-3 w-full" onClick={onClose}>
              <Home size={20} className={isActive('/') ? 'text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-white'} />
              <span>Visão geral</span>
            </Link>
          </li>

          {/* Link: Transações */}
          <li className={`flex items-center space-x-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded ${isActive('/transacoes') ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100' : ''}`}>
            <Link href="/transacoes" className="flex items-center space-x-3 w-full" onClick={onClose}>
              <TrendingUp size={20} className={isActive('/transacoes') ? 'text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-white'} />
              <span>Transações</span>
            </Link>
          </li>

          {/* Link: Metas */}
          <li className={`flex items-center space-x-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded ${isActive('/metas') ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100' : ''}`}>
            <Link href="/metas" className="flex items-center space-x-3 w-full" onClick={onClose}>
              <Target size={20} className={isActive('/metas') ? 'text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-white'} />
              <span>Metas</span>
            </Link>
          </li>

          {/* Link: Lançamentos */}
          <li className={`flex items-center space-x-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded ${isActive('/lancamento') ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100' : ''}`}>
            <Link href="/lancamento" className="flex items-center space-x-3 w-full" onClick={onClose}>
              <PlusSquare size={20} className={isActive('/lancamento') ? 'text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-white'} />
              <span>Lançamentos</span>
            </Link>
          </li>

          {/* Link: E-book */}
          <li className={`flex items-center space-x-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded ${isActive('/ebook') ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100' : ''}`}>
            <Link href="/ebook" className="flex items-center space-x-3 w-full" onClick={onClose}>
              <Book size={20} className={isActive('/ebook') ? 'text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-white'} />
              <span>E-book</span>
            </Link>
          </li>
        </ul>
      </motion.div>

      {/* Overlay para fechar o sidebar no mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
            onClick={onClose}
          ></motion.div>
        )}
      </AnimatePresence>
    </>
  );
}