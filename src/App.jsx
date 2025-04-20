import { Link } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {


  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" className="logo-wrapper">
          <img src={viteLogo} className="logo spin-3d" alt="Vite logo" />
        </a>
      </div>

      <h1>Bem Vindo ao Movie App React!</h1>

      <div className="card">
        <Link to="/home">
          <button>Entrar no app</button>
        </Link>
        <p>
          Clique no botão acima para acessar a próxima página.
        </p>
      </div>

    </>
  )
}

export default App
