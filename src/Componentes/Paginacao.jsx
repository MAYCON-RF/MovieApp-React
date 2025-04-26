import React from "react";

export default function Paginacao({ pagina, setPagina, totalPaginas }) {
  const maxBotoesVisiveis = 5;

  const gerarBotoes = () => {
    const botoes = [];
    if (totalPaginas <= maxBotoesVisiveis + 2) {
      for (let i = 1; i <= totalPaginas; i++) {
        botoes.push(criarBotao(i));
      }
    } else {
      if (pagina <= 3) {
        for (let i = 1; i <= maxBotoesVisiveis; i++) {
          botoes.push(criarBotao(i));
        }
        botoes.push(<span key="ellipsis-end">...</span>);
        botoes.push(criarBotao(totalPaginas));
      } else if (pagina >= totalPaginas - 2) {
        botoes.push(criarBotao(1));
        botoes.push(<span key="ellipsis-start">...</span>);
        for (
          let i = totalPaginas - maxBotoesVisiveis + 1;
          i <= totalPaginas;
          i++
        ) {
          botoes.push(criarBotao(i));
        }
      } else {
        botoes.push(criarBotao(1));
        botoes.push(<span key="ellipsis-start">...</span>);
        for (let i = pagina - 1; i <= pagina + 1; i++) {
          botoes.push(criarBotao(i));
        }
        botoes.push(<span key="ellipsis-end">...</span>);
        botoes.push(criarBotao(totalPaginas));
      }
    }
    return botoes;
  };

  const criarBotao = (num) => (
    <label key={num} className="pagina-label">
      <input
        type="radio"
        name="pagina-radio"
        value={num}
        checked={pagina === num}
        onChange={() => setPagina(num)}
      />
      <span>{num}</span>
    </label>
  );

  const botoesSemElipses = gerarBotoes().filter(
    (btn) => btn.type !== "span"
  ).length;

  const calcularIndiceBotao = () => {
    const labels = document.querySelectorAll(".radio-input label");
    let indiceReal = 0;

    for (let i = 0; i < labels.length; i++) {
      const input = labels[i].querySelector("input");
      if (input && parseInt(input.value) === pagina) {
        indiceReal = i;
        break;
      }
    }

    return indiceReal;
  };

  return (
    <div className="paginacao-container">
      <div className="radio-input">
        {gerarBotoes()}
        <span
          className="selection"
          style={{
            width: `calc(100% / ${botoesSemElipses})`,
            transform: `translateX(${calcularIndiceBotao() * 100}%)`,
          }}
        ></span>
      </div>

      <div className="paginacao-botoes">
        <button
          onClick={() => setPagina(pagina > 1 ? pagina - 1 : 1)}
          disabled={pagina === 1}
          className={`botao-paginacao ${pagina === 1 ? "desativado" : ""}`}
        >
          Anterior
        </button>

        <button
          onClick={() =>
            setPagina(pagina < totalPaginas ? pagina + 1 : totalPaginas)
          }
          disabled={pagina === totalPaginas}
          className={`botao-paginacao ${
            pagina === totalPaginas ? "desativado" : ""
          }`}
        >
          Próxima
        </button>
      </div>
    </div>
  );
}
