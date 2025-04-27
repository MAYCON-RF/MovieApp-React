// Importa os hooks useEffect e useState do React
import { useEffect, useState } from "react";
import RateExamples from "./Componentes/RateExamples";
import FilmeCard from "./Componentes/FilmeCard";
import Paginacao from "./Componentes/Paginacao";

/*Aqui fica a chave, para ser facilmente alterada
substitua com a Chave da API cadastrada no site https://www.themoviedb.org/settings/api  */
const API_KEY = "cb8aa97aefa3540c0fa8f582cce31e14"; // <- Cole aqui sua chave da API

export default function Home() {
  /* Filmes é Estado que armazena a lista de filmes retornados da API, Inicialmente é um array vazio. 
 SetFilmes é usada para atualizar esse estado com novos dados retornados da API.*/
  const [filmes, setFilmes] = useState([]);

  /* Estado que guarda o texto digitado na barra de busca, sempre que o usuário digita uma dado, o setBusca é chamado para atualizar o valor */
  const [busca, setBusca] = useState("");

  /* Filtro é Estado que controla selecionada no dropdown, inicialmente ela foi definido como a categoria"popular".*/
  const [filtro, setFiltro] = useState("popularidade");

  /* filmeSelecionado é Estado que armazena o filme selecionado, útil para exibir detalhes. Inicialmente é null, ou seja, nenhum filme está selecionado".*/
  const [filmeSelecionado, setFilmeSelecionado] = useState(null);

  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  /* useEffect é um Hook que executa a busca por filmes da categoria assim que o componente é montado*/
  useEffect(() => {
    buscarFilmes();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pagina]);

  /*  buscarFilmes é a Função que busca filmes com base no texto digitado */
  async function buscarFilmes() {
    let url = "";

    if (busca.trim() === "") {
      // Busca filmes em cartaz
      url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=pt-BR&page=${pagina}`;
    } else {
      // Busca por nome do filme
      const buscaFormatada = encodeURIComponent(busca);
      url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pt-BR&query=${buscaFormatada}&page=${pagina}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    setFilmes(data.results);
    setTotalPaginas(data.total_pages);
    aplicarFiltro(data.results);
  }

  /* aplicarFiltro é a função que ordena a lista de filmes com base no filtro selecionado
     (popularidade, avaliação ou data de lançamento) e atualiza o estado filmes */
  function aplicarFiltro(lista) {
    let ordenado = [...(lista || filmes)];

    if (filtro === "popularidade") {
      ordenado.sort((a, b) => b.popularity - a.popularity);
    } else if (filtro === "avaliacao") {
      ordenado.sort((a, b) => b.vote_average - a.vote_average);
    } else if (filtro === "data") {
      ordenado.sort(
        (a, b) => new Date(b.release_date) - new Date(a.release_date)
      );
    }

    setFilmes(ordenado);
  }

  /* Função assíncrona que busca os detalhes completos de um filme selecionado a partir do ID do filme.
 Os dados são obtidos da API do TMDB e armazenados no estado filmeSelecionado.*/
  async function buscarDetalhesFilme(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=pt-BR&append_to_response=videos,credits,translations`;
    const response = await fetch(url);
    const data = await response.json();
    setFilmeSelecionado(data);
  }

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      {/*Titulo*/}
      <h1 style={{ color: "#e50914" }}>Movie App React</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "2rem",
          flexWrap: "wrap",
        }}
      >
        {/* Campo de busca para digitar o nome do filme */}

        <input
          type="text"
          placeholder="Digite o nome do filme..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="p-2 w-[500px] text-[23px] rounded-md border border-gray-300 text-black"
        />

        {/* Seletor de filtro para ordenar a lista de filmes */}
        <select
          value={filtro}
          onChange={(e) => {
            setFiltro(e.target.value);
            setPagina(1);
          }}
          className="p-2 w-[250px] text-[23px] rounded-md border border-gray-300 text-black bg-white focus:outline-none focus:ring-2 focus:ring-red-600"
        >
          <option value="popularidade">Popularidade</option>
          <option value="avaliacao">Avaliação</option>
          <option value="data">Data de Lançamento</option>
        </select>

        {/* Botão que executa a função de busca ao clica realizando busca de acordo com o nome digitado ou filtro escolhido */}
        <button
          onClick={() => buscarFilmes()}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Buscar
        </button>
      </div>

      {/* Exibição dos cards de filmes */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "2rem",
          justifyContent: "center",
          alignContent: "start",
        }}
      >
        {/* FilmeCard é componente que exibe informações básicas de cada filme e executa a função 'buscarDetalhesFilme' ao clicar nele */}
        {filmes.map((filme) => (
          <FilmeCard
            key={filme.id}
            filme={filme}
            onClick={() => buscarDetalhesFilme(filme.id)}
          />
        ))}
      </div>

      {/* Modal que exibe detalhes adicionais do filme selecionado. É exibido somente quando 'filmeSelecionado' não é nulo */}
      {filmeSelecionado && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          {/* Container principal com informações detalhadas do filme */}
          <div
            style={{
              backgroundColor: "#fff",
              color: "#000",
              borderRadius: "8px",
              padding: "2rem",
              maxWidth: "600px",
              width: "90%",
              maxHeight: "90vh",
              overflowY: "auto",
              position: "relative",
            }}
          >
            {/* Botão de fechar no canto superior esquerdo */}
            <div className="flex justify-end">
              <button
                onClick={() => setFilmeSelecionado(null)}
                aria-label="Fechar"
                className="bg-red-600 hover:bg-red-700 text-white text-lg font-bold rounded-md w-8 h-8 flex items-center justify-center cursor-pointer"
              >
                ×
              </button>
            </div>

            {/* Seção que exibe o título e a sinopse do filme */}
            <div
              style={{
                backgroundColor: "#f0f0f0",
                color: "#000",
                padding: "1rem",
                paddingTop: "2.5rem",
                borderRadius: "8px",
                boxShadow: "0 0 6px rgba(0,0,0,0.2)",
                marginBottom: "1.5rem",
                textAlign: "center",
              }}
            >
              <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
                {filmeSelecionado.title}
              </h2>

              <p
                style={{
                  marginBottom: "0",
                  textAlign: "justify",
                }}
              >
                {filmeSelecionado.overview?.trim()
                  ? filmeSelecionado.overview
                  : filmeSelecionado.translations?.translations.find(
                      (t) => t.iso_639_1 === "en"
                    )?.data?.overview || "Sinopse não disponível."}
              </p>
            </div>

            {/* Seção para exibir cards do elenco do filme selecionado */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "1rem",
                marginBottom: "1rem",
              }}
            >
              <h3>Elenco:</h3>
              {filmeSelecionado.credits?.cast?.slice(0, 5).map((ator) => (
                <div
                  key={ator.id}
                  style={{
                    backgroundColor: "#f0f0f0",
                    color: "#000",
                    padding: "0.5rem",
                    borderRadius: "8px",
                    width: "100px",
                    boxShadow: "0 0 6px rgba(0,0,0,0.2)",
                    textAlign: "center",
                  }}
                >
                  <img
                    src={
                      ator.profile_path
                        ? `https://image.tmdb.org/t/p/w185${ator.profile_path}`
                        : "/naoDisponivel.svg"
                    }
                    alt={ator.name}
                    style={{
                      width: "100%",
                      borderRadius: "4px",
                      marginBottom: "0.5rem",
                    }}
                  />
                  <p style={{ fontSize: "0.75rem", fontWeight: "bold" }}>
                    {ator.name}
                  </p>
                </div>
              ))}
            </div>

            {/* Exibição do trailer do filme, quando disponível, ou exibição alternativa se indisponível */}
            <div
              style={{
                backgroundColor: "#f0f0f0",
                padding: "1rem",
                borderRadius: "8px",
                boxShadow: "0 0 6px rgba(0,0,0,0.2)",
                marginBottom: "1rem",
                textAlign: "center",
              }}
            >
              <h3>Trailer:</h3>
              {filmeSelecionado.videos?.results?.length > 0 ? (
                <>
                  <iframe
                    width="100%"
                    height="315"
                    src={`https://www.youtube.com/embed/${filmeSelecionado.videos.results[0].key}`}
                    title="Trailer"
                    allowFullScreen
                    style={{
                      borderRadius: "4px",
                      border: "none",
                    }}
                    onLoad={() => console.log("iframe carregado")}
                  ></iframe>
                </>
              ) : (
                <>
                  <img
                    src="/videoNaoDisponivel.svg"
                    alt="Trailer não disponível"
                    style={{
                      width: "200px",
                      opacity: 0.5,
                      marginBottom: "0.5rem",
                    }}
                  />
                  <p style={{ fontSize: "0.9rem", color: "#444" }}>
                    Trailer não disponível
                  </p>
                </>
              )}
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

      {/* Seção que chama o arquivo com a função paginação */}
      <Paginacao
        pagina={pagina}
        setPagina={setPagina}
        totalPaginas={totalPaginas}
      />
    </div>
  );
}
