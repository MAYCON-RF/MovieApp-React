import React from "react";
import RateExamples from "../components/RateExamples";
import '../custom.css';
import { BookmarkCheck } from "lucide-react";

export default function FilmeCard({ filme, onClick, isFavorito }) {
  return (
    <div className="filme-card cursor-pointer relative" onClick={onClick}>
      {/* Brilho e efeitos */}
      <div className="filme-card__shine"></div>
      <div className="filme-card__glow"></div>

      {/* Ícone de Assistir mais tarde */}
      {isFavorito && (
        <div
          className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center
          bg-yellow-400 text-yellow-900 rounded-full shadow z-10"
        >
          <BookmarkCheck className="w-4 h-4" />
        </div>
      )}

      <div className="filme-card__content">
        <div className="filme-card__image">
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

        {/* Texto com detalhes */}
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
