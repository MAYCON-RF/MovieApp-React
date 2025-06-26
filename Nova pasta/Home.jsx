import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import { useAuth } from './contexts/AuthContext';
import FilmeCard from "./components/FilmeCard";
import Paginacao from "./components/Paginacao";
import LoadingSpinner from "./components/LoadingSpinner";
import { supabase } from './supabaseClient';
import BotaoFavorito from './components/favorites';

const API_KEY = "cb8aa97aefa3540c0fa8f582cce31e14";

export default function Home() {
  const { user } = useAuth();
  const [filmes, setFilmes] = useState([]);
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("popularidade");
  const [filmeSelecionado, setFilmeSelecionado] = useState(null);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [carregando, setCarregando] = useState(false);
  const [filmesFavoritos, setFilmesFavoritos] = useState([]);
  const [lendo, setLendo] = useState(false);
  const [favoritosCarregados, setFavoritosCarregados] = useState(false);

  useEffect(() => {
    async function carregarFavoritos() {
      if (user) {
        const { data } = await supabase
          .from("favoritos")
          .select("filme_id")
          .eq("user_id", user.id);

        const idsFavoritos = data?.map((f) => f.filme_id) || [];
        setFilmesFavoritos(idsFavoritos);
      }
      setFavoritosCarregados(true);
    }

    carregarFavoritos();
  }, [user]);

  useEffect(() => {
    if (favoritosCarregados) {
      buscarFilmes(); // buscar só depois dos favoritos estarem carregados
    }
  }, [favoritosCarregados, pagina, busca, filtro]);

  function atualizarFavoritos(id, status) {
    setFilmesFavoritos((prev) =>
      status ? [...prev, id] : prev.filter((fid) => fid !== id)
    );
  }

  async function buscarFilmes() {
    setCarregando(true);
    let url = "";

    if (busca.trim() === "") {
      url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=pt-BR&page=${pagina}`;
    } else {
      const buscaFormatada = encodeURIComponent(busca);
      url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pt-BR&query=${buscaFormatada}&page=${pagina}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();

      const filmesComFavoritos = (data.results || []).map((filme) => ({
        ...filme,
        isFavorito: filmesFavoritos.includes(filme.id),
      }));

      aplicarFiltro(filmesComFavoritos);
      setTotalPaginas(data.total_pages || 1);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    } finally {
      setCarregando(false);
    }
  }

  function aplicarFiltro(lista) {
    let ordenado = [...lista];

    if (filtro === "popularidade") {
      ordenado.sort((a, b) => b.popularity - a.popularity);
    } else if (filtro === "avaliacao") {
      ordenado.sort((a, b) => b.vote_average - a.vote_average);
    } else if (filtro === "data") {
      ordenado.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    } else if (filtro === "favoritos") {
      ordenado = ordenado.filter((filme) => filme.isFavorito);

    }

    setFilmes(ordenado);
  }

  async function buscarDetalhesFilme(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=pt-BR&append_to_response=videos,credits,translations`;
    const response = await fetch(url);
    const data = await response.json();
    setFilmeSelecionado(data);
  }

  const handleFecharCard = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    setFilmeSelecionado(null);
  };

  return (
    <>
      <Header
        busca={busca}
        setBusca={setBusca}
        filtro={filtro}
        setFiltro={setFiltro}
        buscarFilmes={buscarFilmes}
        filmesFavoritos={filmesFavoritos}
      />
      <div className="min-h-screen bg-black text-white px-8 pt-[180px] text-center">
        {!favoritosCarregados || carregando ? (
          <LoadingSpinner />
        ) : filmes.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20">
            <p
              className="text-rose-400 font-bold mb-6"
              style={{ fontSize: "28px" }}
            >
              Nenhum filme encontrado.
            </p>
            <button
              onClick={() => {
                setBusca("");
                setFiltro("popularidade");
                setPagina(1);
              }}
              className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white rounded-md shadow transition"
            >
              Voltar à tela principal
            </button>
          </div>
        ) : (
          <div
            className="grid gap-8 justify-center items-start
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              xl:grid-cols-5"
          >
            {filmes.map((filme) => (
              <FilmeCard
                key={filme.id}
                filme={filme}
                onClick={() => buscarDetalhesFilme(filme.id)}
                isFavorito={filmesFavoritos.includes(filme.id)}
              />
            ))}
          </div>
        )}
        {filmeSelecionado && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative">

              {/* Cabeçalho com título centralizado, favorito e fechar */}
              <div className="flex items-center justify-between px-6 pt-6 bg-gradient-to-r from-red-600/20 to-transparent relative">

                {/* Esquerda: avaliação e ano */}
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-yellow-400 font-semibold bg-yellow-500/10 px-3 py-1 rounded-full text-sm">
                    ⭐ {filmeSelecionado.vote_average?.toFixed(1)}
                  </span>
                  <span className="text-white/70 text-sm">
                    {new Date(filmeSelecionado.release_date).getFullYear()}
                  </span>
                </div>

                {/* Centro: título */}
                <h2 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold text-white text-center">
                  {filmeSelecionado.title}
                </h2>

                {/* Direita: favorito e fechar */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-yellow-500/20 px-3 py-1 rounded-full text-sm text-white font-semibold shadow">
                    <BotaoFavorito
                      filme={filmeSelecionado}
                      onChange={atualizarFavoritos}
                    />
                    Assistir mais tarde
                  </div>
                  <button
                    onClick={handleFecharCard}
                    className="bg-red-600 hover:bg-red-700 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-200 shadow-lg"
                  >
                    ×
                  </button>
                </div>
              </div>


              {/* Conteúdo principal scrollável */}
              <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6 space-y-6">

                {/* Sinopse */}
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 relative">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xl font-semibold text-white">Sinopse</h3>
                    <button
                      onClick={() =>
                        falarTexto(
                          filmeSelecionado.overview?.trim() ||
                          filmeSelecionado.translations?.translations.find(
                            (t) => t.iso_639_1 === "en"
                          )?.data?.overview || "Sinopse não disponível."
                        )
                      }
                      className="text-white text-sm bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md shadow transition"
                    >
                      {lendo ? "Parar Leitura" : "Ouvir Sinopse"}
                    </button>
                  </div>

                  <p className="text-gray-300 leading-relaxed text-justify">
                    {filmeSelecionado.overview?.trim()
                      ? filmeSelecionado.overview
                      : filmeSelecionado.translations?.translations.find(
                        (t) => t.iso_639_1 === "en"
                      )?.data?.overview || "Sinopse não disponível."}
                  </p>
                </div>

                {/* Elenco */}
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                  <h3 className="text-xl font-semibold text-white mb-4">Elenco Principal</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {filmeSelecionado.credits?.cast?.slice(0, 5).map((ator) => (
                      <div
                        key={ator.id}
                        className="bg-gray-700/40 rounded-xl p-4 flex flex-col items-center justify-start text-center hover:shadow-lg hover:scale-105 transition-all duration-300"
                      >
                        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden mb-3 border-2 border-red-500/30 shadow-md">
                          <img
                            src={
                              ator.profile_path
                                ? `https://image.tmdb.org/t/p/w185${ator.profile_path}`
                                : "/placeholder.svg"
                            }
                            alt={ator.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-sm font-semibold text-white">{ator.name}</p>
                        {ator.character && (
                          <p className="text-xs italic text-gray-300">como {ator.character}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trailer */}
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                  <h3 className="text-xl font-semibold text-white mb-4">Trailer</h3>
                  {filmeSelecionado.videos?.results?.length ? (
                    <div className="aspect-video rounded-lg overflow-hidden bg-black">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${filmeSelecionado.videos.results[0].key}`}
                        title="Trailer"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video rounded-lg bg-gray-700/50 flex flex-col items-center justify-center text-gray-400">
                      <div className="text-6xl mb-4">🎬</div>
                      <p className="text-lg">Trailer não disponível</p>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => setFilmeSelecionado(null)}
                style={{
                  marginTop: "1rem",
                  backgroundColor: "#e50914",
                  color: "#fff",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                }}
              >
                Fechar
              </button>
            </div>
          </div>
        )}

        {filmes.length > 0 && totalPaginas > 1 && (
          <Paginacao
            pagina={pagina}
            setPagina={setPagina}
            totalPaginas={totalPaginas}
          />
        )}
      </div >
    </>
  );
}