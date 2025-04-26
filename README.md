MovieApp – Visualizador de Filmes em Cartaz

Descrição
O MovieApp é uma aplicação web desenvolvida em React que permite aos usuários explorar os filmes atualmente em cartaz no cinema. Integrando-se à API do TMDb (The Movie Database), o sistema apresenta uma interface moderna, responsiva e fácil de usar, onde é possível visualizar detalhes de filmes, buscar por títulos e aplicar filtros.

Funcionalidades

1. Listagem de Filmes em Cartaz:

   - Exibição dos filmes com pôster, título e classificação.
   - Atualização automática dos dados através da API TMDb.

2. Detalhes do Filme:

   - Sinopse
   - Data de lançamento
   - Avaliação
   - Informações do elenco e trailers (quando disponíveis).

3. Busca Personalizada:

   - Barra de pesquisa para localizar filmes por nome.

4. Filtros de Exibição:

   - Ordenação por: Popularidade, Avaliação, Data de lançamento

5. Interface Responsiva:
   - Adaptável para dispositivos móveis, tablets e desktop.

Tecnologias Utilizadas

- Frontend: React.js
- Linguagem: JavaScript
- APIs: The Movie Database (TMDb)
- Gerenciamento de Estado: Context API
- Estilização: Tailwind CSS
- Consumo de API: Axios
- Ferramentas de Desenvolvimento: VS Code, Git, GitHub

Requisitos de Execução

1. Pré-requisitos:

   - Node.js instalado (versão 18 ou superior).
   - Navegador atualizado (Google Chrome, Firefox, etc.).

2. Instalação de Dependências:
   npm install

Como Executar o Projeto
Passo 1: Clone o Repositório
git clone https://github.com/MAYCON-RF/MovieApp-React.git
cd MovieApp-React

Passo 3: Rodar o Projeto
npm run dev

Passo 4: Acessar o Sistema
http://localhost:5173

Estrutura do Projeto
src/
├── components/
│ ├── FilmeCard.jsx
│ ├── Paginacao.jsx
│ └── RateExamples.jsx
├── pages/
│ ├── Home.jsx
│ ├── DetalhesFilme.jsx
├── services/
│ └── tmdbApi.js
├── contexts/
│ └── FilmeContext.jsx
├── assets/
│ └── imagens/
├── App.jsx
├── main.jsx
└── styles/
└── index.css

Postagem e Histórico de Commits

- Repositório GitHub: https://github.com/MAYCON-RF/MovieApp-React.git
- Commits realizados conforme o desenvolvimento das funcionalidades exigidas.

Exemplo de Uso

- Acesso à página inicial (/home) para visualizar filmes.
- Detalhamento de informações ao clicar em um filme.
- Pesquisa personalizada por nome.
- Filtros por popularidade, avaliação e data de lançamento.

Público-Alvo
Amantes de cinema, críticos de filmes e interessados nos lançamentos do cinema.

Autor
Desenvolvido por Maycon Rodrigues.

Licença
Projeto licenciado sob a MIT License.
