# Além da Rota — Front-end

Aplicação React para cadastrar e consultar destinos turísticos consumindo uma API REST.

## Como executar

1. Inicie o back-end Spring Boot na porta `8080`.
2. Neste diretório, execute `npm install` e `npm run dev`.
3. Abra `http://localhost:5173`.

A URL da API pode ser alterada criando um arquivo `.env` com base no `.env.example`.

## Integração

- `GET /api/destinos`: lista os destinos persistidos.
- `POST /api/destinos`: cadastra um destino.

O formulário usa sete campos: nome, cidade, estado, categoria, melhor época, custo médio e descrição.

## Conceitos de JavaScript e React utilizados

- Funções tradicionais e arrow functions;
- Callbacks nos eventos e nas atualizações de estado;
- `map` com `key` para renderizar a lista de destinos;
- Desestruturação de props e do retorno do `useState`;
- Operador ternário e operador lógico `&&` no JSX;
- Requisições com `fetch`, `async/await` e `try/catch/finally`;
- Estados para dados, carregamento, sucesso e erro.
- Composição com `children` no componente `PageContainer`;
- React Router com `createBrowserRouter`, `RouterProvider`, `Link`, `useNavigate` e `useLocation`.

## Páginas

- `/` — apresentação do projeto;
- `/cadastrar` — formulário que envia o destino com POST;
- `/destinos` — consulta os destinos com GET;
- endereços inválidos exibem uma página de erro.
