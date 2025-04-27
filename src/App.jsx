/* Componente principal do aplicativo que exibe a tela inicial */

import { Link } from "react-router-dom";

import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" className="logo-wrapper">
          <img src={viteLogo} className="logo spin-3d" alt="Vite logo" />
        </a>
      </div>

      {/* Título principal da tela inicial do Movie App */}
      <h1>Bem Vindo ao Movie App React!</h1>

      <div className="home-card">
        {/* Link que direciona o usuário para a página Home */}

        <p>
          Se você é um amante de cinema, crítico ou simplesmente alguém que
          adora acompanhar os lançamentos, seja muito bem-vindo!
        </p>

        <Link to="/home">
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded transition-colors duration-300">
            Entrar no app
          </button>
        </Link>

        <p>
          Clique no botão acima para acessar a próxima página e descubra os
          filmes em cartaz.
        </p>
      </div>
    </>
  );
}

export default App;
