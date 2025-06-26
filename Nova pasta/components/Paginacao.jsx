import React from "react";
import { Button } from "./button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Paginacao({ pagina, setPagina, totalPaginas }) {
  if (totalPaginas <= 1) return null;
  const maxBotoesVisiveis = 5;

  const criarBotao = (num) => (
    <button
      key={num}
      onClick={() => setPagina(num)}
      className={`relative px-3 py-1 text-sm font-medium rounded-md transition-all 
        ${pagina === num
          ? "text-white"
          : "text-gray-300 hover:text-white"}
      `}
    >
      {pagina === num && (
        <motion.span
          layoutId="highlight"
          className="absolute inset-0 rounded-md z-[-1]"
          style={{
            background: 'radial-gradient(circle at 100%, rgba(214, 46, 82, 0.8) 100%, rgba(124, 58, 237, 0) 70%)',
            opacity: 1,
            transition: 'opacity 0.5s ease',
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />

      )}
      {num}
    </button>
  );

  const gerarBotoes = () => {
    const botoes = [];

    if (totalPaginas <= maxBotoesVisiveis + 2) {
      for (let i = 1; i <= totalPaginas; i++) {
        botoes.push(criarBotao(i));
      }
    } else {
      if (pagina <= 3) {
        for (let i = 1; i <= maxBotoesVisiveis; i++) {
          botoes.push(criarBotao(i));
        }
        botoes.push(<span key="ellipsis-end" className="text-gray-400 px-2">...</span>);
        botoes.push(criarBotao(totalPaginas));
      } else if (pagina >= totalPaginas - 2) {
        botoes.push(criarBotao(1));
        botoes.push(<span key="ellipsis-start" className="text-gray-400 px-2">...</span>);
        for (let i = totalPaginas - maxBotoesVisiveis + 1; i <= totalPaginas; i++) {
          botoes.push(criarBotao(i));
        }
      } else {
        botoes.push(criarBotao(1));
        botoes.push(<span key="ellipsis-start" className="text-gray-400 px-2">...</span>);
        for (let i = pagina - 1; i <= pagina + 1; i++) {
          botoes.push(criarBotao(i));
        }
        botoes.push(<span key="ellipsis-end" className="text-gray-400 px-2">...</span>);
        botoes.push(criarBotao(totalPaginas));
      }
    }

    return botoes;
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      <div className="flex gap-2 relative z-0 bg-gray-800 p-2 rounded-lg">
        {gerarBotoes()}
      </div>

      <div className="flex gap-4">
        <Button
          onClick={() => setPagina(Math.max(1, pagina - 1))}
          disabled={pagina === 1}
          variant="outline"
          className="flex items-center gap-2 bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
        >
          <ChevronLeft className="w-4 h-4" />
          Anterior
        </Button>

        <Button
          onClick={() => setPagina(Math.min(totalPaginas, pagina + 1))}
          disabled={pagina === totalPaginas}
          variant="outline"
          className="flex items-center gap-2 bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
        >
          Próxima
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
