// Importa os hooks useEffect e useState do React
import { useEffect, useState } from "react";

// Componente principal do projeto
export default function Home() {
  /* Filmes é Estado que armazena a lista de filmes retornados da API, Inicialmente é um array vazio. 
 SetFilmes é usada para atualizar esse estado com novos dados retornados da API.*/
  const [filmes, setFilmes] = useState([]);

  /* Estado que guarda o texto digitado na barra de busca, sempre que o usuário digita uma dado, o setBusca é chamado para atualizar o valor */
  const [busca, setBusca] = useState("");

  /* Filtro é Estado que controla selecionada no dropdown, inicialmente ela foi definido como a categoria"popular".*/
  const [filtro, setFiltro] = useState("popularidade");

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

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      {/*Titulo*/}
      <h1 style={{ color: "#e50914" }}>Filmes</h1>

      {/* Campo de busca por nome de filme */}
      <div style={{ marginBottom: "2rem" }}>
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
            marginRight: "0.5rem",
          }}
        />
      </div>

      {/* Seletor de categorias */}
      <div style={{ marginBottom: "1rem" }}>
        <select
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          style={{
            padding: "0.5rem",
            fontSize: "1rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
            marginBottom: "1rem",
          }}
        >
          <option value="popularidade">Popularidade</option>
          <option value="avaliacao">Avaliação</option>
          <option value="data">Data de Lançamento</option>
        </select>
        {/* Botão que executa a função de busca */}
        <button onClick={buscarFilmes}>Buscar</button>
      </div>

      {/* Exibição dos filmes formatações e etc */}
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
            style={{
              width: "200px",
              backgroundColor: "#141414",
              padding: "1rem",
              borderRadius: "8px",
              color: "#fff",
              boxShadow: "0 0 8px rgba(0,0,0,0.4)",
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w200${filme.poster_path}`}
              alt={filme.title}
              style={{ width: "100%", borderRadius: "4px" }}
            />
            <h3 style={{ fontSize: "1rem", marginTop: "0.5rem" }}>
              {filme.title}
            </h3>
            <p style={{ fontSize: "0.875rem" }}>
              ⭐ {filme.vote_average} votos
            </p>
            <p style={{ fontSize: "0.875rem" }}>{filme.release_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
