import React from "react";
import RateExamples from "./RateExamples";

export default function FilmeCard({ filme, onClick }) {
  return (
    <div className="card cursor-pointer" onClick={onClick}>
      {/* Elemento visual para efeito de brilho sobre o card */}
      <div className="card__shine"></div>
      <div className="card__glow"></div>

      {/* Conteúdo principal do card (imagem e informações do filme) */}
      <div className="card__content">
        {/* Seção que exibe a imagem (poster) do filme */}
        <div className="card__image">
          <img
            src={
              filme.poster_path
                ? `https://image.tmdb.org/t/p/w200${filme.poster_path}`
                : "/naoDisponivel.png"
            }
            alt={filme.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "12px",
            }}
          />
        </div>

        {/* Seção que exibe informações de texto sobre o filme */}
        <div className="card__text">
          {/* Exibição do título do filme */}
          <h3 className="card__title">{filme.title}</h3>

          {/* Componente que chama o arquivo RateExamples e exibe a avaliação do filme */}
          <RateExamples filme={filme} />

          {/* Data de lançamento do filme formatada em português */}
          <p className="card__description">
            Lançamento:{" "}
            {new Date(filme.release_date).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
