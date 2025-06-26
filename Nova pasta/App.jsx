import React, { useState } from "react";
import { Eye, EyeOff, Play } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import './index.css';
import { supabase } from "./supabaseClient";

export default function App() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [erro, setErro] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const [tab, setTab] = useState(location.state?.tab || "register");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        setErro("E-mail ou senha inválidos.");
      } else {
        setErro("Erro ao realizar login. Tente novamente.");
      }
    } else {
      setErro("Login realizado com sucesso!");
      navigate("/home");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErro("");

    if (!nome || !email || !senha) {
      setErro("Preencha todos os campos.");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password: senha,
    });

    if (error) {
      if (error.message.includes("User already registered")) {
        setErro("E-mail já cadastrado.");
      } else {
        setErro("Erro ao criar conta: " + error.message);
      }
    } else {
      const user = data?.user;

      if (user) {
        await supabase.from("usuarios").insert([
          {
            id: user.id,
            nome: nome,
            email: email,
            avatar_url: `https://i.pravatar.cc/150?u=${user.id}`,
          },
        ]);
      }

      setErro("Conta criada com sucesso!");
      setTab("login");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tab === "login") {
      handleLogin(e);
    } else {
      handleRegister(e);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-red-900/20 to-black relative px-4 sm:px-6 lg:px-8 animate-fade-in-up">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(229,9,20,0.1)_0%,transparent_70%)] pointer-events-none" />

      <section className="w-full max-w-xs sm:max-w-sm bg-[rgba(20,20,20,0.95)] border border-[rgba(255,255,255,0.1)] backdrop-blur-sm rounded-xl shadow-2xl relative z-10 overflow-hidden">
        <header className="text-center space-y-2 pt-6 pb-4 px-4 sm:px-6">
          <div className="flex justify-center mb-2">
            <div className="w-10 h-10 bg-[#E50914] rounded-full flex items-center justify-center">
              <Play className="w-5 h-5 text-white fill-white ml-0.5" />
            </div>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">MovieAppReact</h1>
          <p className="text-xs text-neutral-400">Sua plataforma de filmes favorita</p>
        </header>

        <div className="px-4 sm:px-6 pb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === "register" && (
              <section>
                <label htmlFor="nome" className="block text-white text-sm font-medium mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 bg-neutral-800 border border-neutral-700 text-white placeholder:text-neutral-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E50914] text-sm" placeholder="Digite seu nome..."
                />
              </section>
            )}

            <section>
              <label htmlFor="email" className="block text-white text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2.5 bg-neutral-800 border border-neutral-700 text-white placeholder:text-neutral-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E50914] text-sm"
                placeholder="Digite seu email..."
              />
            </section>

            <section>
              <label htmlFor="senha" className="block text-white text-sm font-medium mb-1">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 pr-10 bg-neutral-800 border border-neutral-700 text-white placeholder:text-neutral-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E50914] text-sm"
                  placeholder="Digite sua senha..."
                />
                <button
                  type="button"
                  title="Mostrar/ocultar senha"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </section>

            {erro && (
              <p className={`text-sm text-center ${erro.includes("sucesso") ? "text-green-500" : "text-red-500"}`}>
                {erro}
              </p>
            )}

            <button
              type="submit"
              className={`w-full mt-4 py-2.5 rounded-md text-white font-semibold transition-all duration-200 text-lg outline-none focus:ring-2 focus:ring-red-500 active:scale-95 ${tab === "login" ? "bg-[#E50914] hover:bg-red-700" : "bg-[#B20710] hover:bg-red-800"}`}
            >
              {tab === "login" ? "Entrar" : "Registrar"}
            </button>
          </form>

          {tab === "login" ? (
            <div className="mt-4 space-y-3">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-xs">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-sm text-white">Lembrar de mim</span>
                </label>
                <a href="#" className="text-[#E50914] hover:underline text-center sm:text-right">
                  Esqueceu a senha?
                </a>
              </div>
              <div className="text-center text-xs text-neutral-300">
                Novo por aqui?{" "}
                <button type="button" onClick={() => setTab("register")} className="text-[#E50914] hover:underline font-medium">
                  Registre-se agora
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-4 text-center text-xs text-neutral-300">
              Já tem uma conta?{" "}
              <button type="button" onClick={() => setTab("login")} className="text-[#E50914] hover:underline font-medium">
                Faça login
              </button>
            </div>
          )}

          <footer className="mt-4 text-xs text-center text-neutral-500">
            Ao continuar, você concorda com nossos{" "}
            <a href="#" className="text-[#E50914] hover:underline">Termos de Uso</a>
          </footer>
        </div>
      </section>
    </div>
  );
}
