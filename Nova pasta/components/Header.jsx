import React, { useState, useEffect } from 'react';
import { Button } from "../components/button";
import { Play, User, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const Header = ({ busca, setBusca, filtro, setFiltro, buscarFilmes, filmesFavoritos }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchUserProfile() {
      const { data, error } = await supabase
        .from('usuarios')
        .select('nome, avatar_url')
        .eq('id', user?.id)
        .single();

      if (data) setUserData(data);
    }

    if (user) fetchUserProfile();
  }, [user]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserCard, setShowUserCard] = useState(false);
  const handleLogout = async () => {
    await logout();
    console.log("Deslogado com sucesso");
    navigate('/', { state: { tab: "login" } });
  };

  const navigation = [
    { name: 'Início', href: '/' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-[#1a1a1a] md:bg-gradient-to-r md:from-[#1a1a1a] md:to-[#300818] shadow-md">
      <div className="px-4 md:px-8 pt-4 pb-4">
        {/* Topo */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="bg-red-gradient p-2 rounded-full">
                <Play className="w-6 h-6 text-white fill-white" />
              </div>
              <span className="text-base sm:text-xl md:text-2xl font-bold text-white whitespace-nowrap">
                MovieAppReact
              </span>
            </div>
          </div>

          {/* Usuário visível apenas no desktop */}
          <div className="hidden md:flex items-center space-x-4 relative">
            <button
              aria-label="Abrir menu do usuário"
              title="Perfil"
              onClick={() => setShowUserCard(!showUserCard)}
              className="relative flex items-center justify-center p-3 rounded-full border-2 border-transparent hover:border-red-400/50 text-white hover:text-red-400 hover:bg-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-red-400/20"
            >
              <div className="relative flex items-center justify-center w-8 h-8">
                <User className="w-6 h-6 z-10 relative" />

                {/* Efeito de brilho */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-900 via-gray-800/20 opacity-0 hover:opacity-100 transition-opacity duration-300 z-0" />
              </div>
            </button>

            {/* CARD DE PERFIL */}
            {showUserCard && (
              <>
                {/* Overlay transparente para fechar o card ao clicar fora */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowUserCard(false)}
                />

                <div className="absolute right-0 top-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white rounded-2xl shadow-2xl border border-gray-700/50 p-6 z-50 w-80 animate-fade-in">
                  {/* Header do card */}

                  <div className="text-center mb-6">
                    {/* Botão de Fechar */}
                    <button
                      onClick={() => setShowUserCard(false)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Fechar"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 8.586l4.95-4.95a1 1 0 111.414 1.414L11.414 10l4.95 4.95a1 1 0 01-1.414 1.414L10 11.414l-4.95 4.95a1 1 0 01-1.414-1.414l4.95-4.95-4.95-4.95A1 1 0 015.05 3.636L10 8.586z" clipRule="evenodd" />
                      </svg>
                    </button>

                    <div className="relative inline-block">

                      <img
                        className="w-20 h-20 rounded-full mx-auto border-4 border-gradient-to-r from-red-500 to-red-600 shadow-lg object-cover"
                        src={userData?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData?.nome || "User")}&background=ef4444&color=fff&size=80`}
                        alt="Avatar"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-900"></div>
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-white">{userData?.nome || "Usuário"}</h3>
                    <p className="text-gray-400 text-sm">{user?.email}</p>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-700/50 my-4"></div>

                  {/* Menu items */}
                  <div className="space-y-2">

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-300 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200 group"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400 group-hover:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7" /></svg>
                      <span>Sair</span>
                    </button>
                  </div>

                  {/* Footer */}
                  <div className="border-t border-gray-700/50 mt-4 pt-4 text-center">
                    <p className="text-xs text-gray-500">MovieAppReact v1.0</p>
                  </div>
                </div>

              </>
            )}

          </div>

          {/* Menu hambúrguer para mobile */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Menu mobile expandido com busca embutida */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4 text-white text-sm">
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Digite o nome do filme..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-[400px] text-base rounded-md border border-gray-300 text-black px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <select
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                className="w-[200px] text-base rounded-md border border-gray-300 text-black px-3 py-2 bg-white"
              >
                <option value="popularidade">Popularidade</option>
                <option value="avaliacao">Avaliação</option>
                <option value="data">Data de Lançamento</option>
                {filmesFavoritos.length > 0 && (
                  <option value="favoritos">Favoritos</option>
                )}
              </select>

              <Button
                onClick={buscarFilmes}
                className="rounded-r-lg bg-red-600 hover:bg-red-700 px-6 py-2 text-white font-semibold"
              >
                Buscar
              </Button>
            </div>

            <div className="border-t border-white/30 pt-2 space-y-2">

              {user && (
                <button onClick={handleLogout} className="block hover:text-red-400">Sair</button>
              )}
            </div>
          </div>
        )}

        {/* Barra de busca para desktop */}
        <div className="hidden md:flex items-center justify-center gap-4 mt-2 w-full max-w-5xl mx-auto">
          <input
            type="text"
            placeholder="Digite o nome do filme..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-[400px] text-base rounded-md border border-gray-300 text-black px-3 py-2"
          />

          <select
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="w-[200px] text-base rounded-md border border-gray-300 text-black px-3 py-2 bg-white"
          >
            <option value="popularidade">Popularidade</option>
            <option value="avaliacao">Avaliação</option>
            <option value="data">Data de Lançamento</option>
            <option value="favoritos">Favoritos</option>

          </select>


          <Button
            onClick={buscarFilmes}
            className="text-white font-bold bg-red-600 hover:bg-red-700" // FUNDO ADICIONADO
          >
            Buscar
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
