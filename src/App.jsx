import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" className="logo-wrapper">
          <img src={viteLogo} className="logo spin-3d" alt="Vite logo" />
        </a>
      </div>

      <h1>Bem Vindo ao Movie App React</h1>

      <div className="card">
  <button onClick={() => window.location.href = '/home'}>
    Entrar no app
  </button>
  <p>
    Bem-vindo! Clique para continuar para a próxima página.
  </p>
</div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
