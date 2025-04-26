/* Arquivo principal de configuração das rotas da aplicação */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "./Home.jsx";

/* Renderiza a aplicação React dentro do elemento com id 'root' usando StrictMode e BrowserRouter para roteamento */

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Rota principal que renderiza o componente App */}
        <Route path="/" element={<App />} />

        {/* Rota '/home' que renderiza o componente Home */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
