import React from "react";

export default function RateExamples({ filme }) {
  return (
    <div className="flex items-center justify-between w-full mt-3 px-2 text-sm">
      {/* Estrela + nota */}
      <div className="flex items-center gap-2">
        <svg
          className="w-4 h-4 flex-shrink-0 text-yellow-400"
          style={{ color: "#facc15" }}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.959h4.162c.969 
              0 1.371 1.24.588 1.81l-3.367 2.448 1.287 3.959c.3.922-.755 
              1.688-1.538 1.118L10 13.347l-3.367 2.448c-.783.57-1.838-.196-1.538-1.118l1.287-3.959
              -3.367-2.448c-.783-.57-.38-1.81.588-1.81h4.162l1.286-3.959z"
          />
        </svg>
        <span className="font-semibold text-white tracking-wide">
          {filme.vote_average.toFixed(1)}
        </span>
      </div>

      {/* Quantidade de votos */}
      <div className="text-xs text-gray-400">{filme.vote_count} votos</div>
    </div>
  );
}
