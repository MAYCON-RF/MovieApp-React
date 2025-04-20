import { useEffect, useState } from 'react'

export default function Home() {
  const [filmes, setFilmes] = useState([])
  const [busca, setBusca] = useState('')

  useEffect(() => {
    buscarPopulares()
  }, [])

  async function buscarPopulares() {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=cb8aa97aefa3540c0fa8f582cce31e14&language=pt-BR&page=1`
    )
    const data = await response.json()
    setFilmes(data.results)
  }

  async function buscarFilmes() {
    if (busca.trim() === '') {
      buscarPopulares()
      return
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=cb8aa97aefa3540c0fa8f582cce31e14&language=pt-BR&query=${encodeURIComponent(busca)}`
    )
    const data = await response.json()
    setFilmes(data.results)
  }

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ color: '#e50914' }}>Filmes</h1>

      {/* Barra de busca */}
      <div style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Digite o nome do filme..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          style={{
            padding: '0.5rem',
            width: '250px',
            fontSize: '1rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
            marginRight: '0.5rem'
          }}
        />
        <button onClick={buscarFilmes}>Buscar</button>
      </div>

   
      {filmes.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1rem'
          }}
        >
          {filmes.map((filme) => (
            <div
              key={filme.id}
              style={{
                width: '200px',
                backgroundColor: '#141414',
                padding: '1rem',
                borderRadius: '8px',
                color: '#fff',
                boxShadow: '0 0 8px rgba(0,0,0,0.4)'
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w200${filme.poster_path}`}
                alt={filme.title}
                style={{
                  width: '100%',
                  borderRadius: '4px'
                }}
              />
              <h3 style={{ fontSize: '1rem', marginTop: '0.5rem' }}>
                {filme.title}
              </h3>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
