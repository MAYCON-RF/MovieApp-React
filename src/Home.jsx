// Importa os hooks useEffect e useState do React
import { useEffect, useState } from "react";

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

  /* useEffect é um Hook que executa a busca por filmes da categoria assim que o componente é montado*/
  useEffect(() => {
    buscarFilmes();
  }, []);

  /*  buscarFilmes é a Função que busca filmes com base no texto digitado */
  async function buscarFilmes() {
    let url = "";

    if (busca.trim() === "") {
      // Busca filmes em cartaz
      url = `https://api.themoviedb.org/3/movie/now_playing?api_key=cb8aa97aefa3540c0fa8f582cce31e14&language=pt-BR&page=1`;
    } else {
      // Busca por nome do filme
      const buscaFormatada = encodeURIComponent(busca);
      url = `https://api.themoviedb.org/3/search/movie?api_key=cb8aa97aefa3540c0fa8f582cce31e14&language=pt-BR&query=${buscaFormatada}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    setFilmes(data.results);
    aplicarFiltro(data.results);
  }

  function aplicarFiltro(lista) {
    let ordenado = [...(lista || filmes)]; // usa lista se foi passada, senão usa o estado atual

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
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=cb8aa97aefa3540c0fa8f582cce31e14&language=pt-BR&append_to_response=videos,credits,translations`;
    const response = await fetch(url);
    const data = await response.json();
    setFilmeSelecionado(data);
  }

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      {/*Titulo*/}
      <h1 style={{ color: "#e50914" }}>Filmes</h1>

      {/* Campo de busca por nome de filme */}
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
        <input
          type="text"
          placeholder="Digite o nome do filme..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          style={{
            padding: "0.5rem",
            width: "250px",
            fontSize: "1rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        {/* Seletor de filtros */}
        <select
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          style={{
            padding: "0.5rem",
            fontSize: "1rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        >
          <option value="popularidade">Popularidade</option>
          <option value="avaliacao">Avaliação</option>
          <option value="data">Data de Lançamento</option>
        </select>
        {/* Botão que executa a função de busca */}

        <button
          onClick={buscarFilmes}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#e50914",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Buscar
        </button>
      </div>

      {/* Exibição dos cards de filmes */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        {filmes.map((filme) => (
          <div
            key={filme.id}
            onClick={() => buscarDetalhesFilme(filme.id)}
            style={{
              width: "200px",
              backgroundColor: "#141414",
              padding: "1rem",
              borderRadius: "8px",
              color: "#fff",
              boxShadow: "0 0 8px rgba(0,0,0,0.4)",
              cursor: "pointer",
            }}
          >
            <img
              src={
                filme.poster_path
                  ? `https://image.tmdb.org/t/p/w200${filme.poster_path}`
                  : "/naoDisponivel.svg"
              }
              alt={filme.title}
              style={{ width: "100%", borderRadius: "4px" }}
            />
            <h3 style={{ fontSize: "1rem", marginTop: "0.5rem" }}>
              {filme.title}
            </h3>

            {/* Exibição dos rate point */}
            <p style={{ fontSize: "0.875rem" }}>
              ⭐ {filme.vote_average} votos
            </p>

            {/* Exibição da data de lançamento */}
            <p style={{ fontSize: "1rem" }}>
              Lançamento:{" "}
              {new Date(filme.release_date).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        ))}
      </div>
      {/* Modal com detalhes do filme */}
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
            <button
              onClick={() => setFilmeSelecionado(null)}
              style={{
                position: "absolute",
                top: "3px",
                left: "3px",
                backgroundColor: "#e50914",
                border: "none",
                fontSize: "1rem",
                fontWeight: "bold",
                color: "#fff",
                cursor: "pointer",
              }}
              aria-label="Fechar"
            >
              ×
            </button>

            <div>
              <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
                {filmeSelecionado.title}
              </h2>

              <p style={{ marginBottom: "1rem" }}>
                {filmeSelecionado.overview?.trim()
                  ? filmeSelecionado.overview
                  : filmeSelecionado.translations?.translations.find(
                      (t) => t.iso_639_1 === "en"
                    )?.data?.overview || "Sinopse não disponível."}
              </p>
            </div>

            {/* Exibição em cards do elenco */}
            <h3>Elenco:</h3>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "1rem",
                marginBottom: "1rem",
              }}
            >
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
                        : "/naoDisponivel.svg" // mesma imagem usada nos filmes
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

            <h3>Trailer:</h3>
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
    </div>
  );
}
