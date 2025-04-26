import React from "react";
import RateExamples from "./RateExamples";

export default function FilmeCard({ filme, onClick }) {
  return (
    <div className="card cursor-pointer" onClick={onClick}>
      <div className="card__shine"></div>
      <div className="card__glow"></div>

      <div className="card__content">
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
              borderRadius: "12px", // Mantém o canto arredondado
            }}
          />
        </div>

        <div className="card__text">
          <h3 className="card__title">{filme.title}</h3>
          <RateExamples filme={filme} />
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
