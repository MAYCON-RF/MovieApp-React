// BotaoFavorito.jsx
import { useState, useEffect } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../contexts/AuthContext";

export default function BotaoFavorito({ filme, onChange, mostrarLegenda = false }) {
    const { user } = useAuth();
    const [salvo, setSalvo] = useState(false);

    useEffect(() => {
        if (user && filme) verificarAssistirMaisTarde();
    }, [user, filme]);

    async function verificarAssistirMaisTarde() {
        const { data } = await supabase
            .from("favoritos")
            .select("id")
            .eq("user_id", user.id)
            .eq("movie_id", filme.id)
            .maybeSingle();

        const marcado = !!data;
        setSalvo(marcado);
        if (onChange) onChange(filme.id, marcado);
    }

    async function alternarAssistirMaisTarde() {
        if (!user || !filme) return;

        if (salvo) {
            await supabase
                .from("favoritos")
                .delete()
                .eq("user_id", user.id)
                .eq("movie_id", filme.id);
            setSalvo(false);
            if (onChange) onChange(filme.id, false);
        } else {
            await supabase.from("favoritos").insert({
                user_id: user.id,
                movie_id: filme.id,
            });
            setSalvo(true);
            if (onChange) onChange(filme.id, true);
        }
    }

    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                alternarAssistirMaisTarde();
            }}
            title={salvo ? "Remover de Assistir mais tarde" : "Marcar para assistir mais tarde"}
            className={`rounded-full border-2 transition duration-300
    backdrop-blur-md shadow-xl flex items-center justify-center
    ${salvo
                    ? "bg-yellow-400/90 hover:bg-yellow-300 border-yellow-500 text-yellow-900"
                    : "bg-gradient-to-br from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 border-white/30 text-white"}
  `}
        >
            {salvo ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
        </button>
    );
}
