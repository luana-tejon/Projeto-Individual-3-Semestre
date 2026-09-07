# Relatório do Projeto — Além da Rota

## 1. Resumo do projeto

O **Além da Rota** é uma aplicação sobre turismo. Ela permite cadastrar destinos turísticos e consultar os destinos já armazenados.

O sistema foi dividido em duas partes:

- **Front-end:** desenvolvido em React e responsável pelas telas e pela interação com o usuário;
- **Back-end:** desenvolvido em Spring Boot e responsável pela API REST e pelo acesso ao banco H2.

O Front-end não utiliza uma lista estática como fonte principal. Os destinos exibidos são obtidos por uma requisição GET à API. Quando o usuário cadastra um destino, os dados são enviados por uma requisição POST e armazenados no banco H2.

## 2. Requisitos atendidos

| Requisito | Como foi atendido |
|---|---|
| Tema | A aplicação trabalha com destinos turísticos. |
| Mínimo de 5 campos | O formulário possui 7 campos. |
| Tela de cadastro | Rota `/cadastrar`. |
| Tela de consulta | Rota `/destinos`. |
| Método GET | Busca todos os destinos cadastrados. |
| Método POST | Envia um novo destino para a API. |
| Componentização | Header, Layout, formulário, lista e contêiner de página são componentes. |
| Estado | `useState` controla formulário, destinos, carregamento e erros. |
| JSX | Todas as interfaces são construídas com JSX. |
| CSS Modules | Cada componente possui seu arquivo `.module.css`. |
| Loading, sucesso e erro | Existem mensagens específicas para cada situação. |
| Persistência | Os registros são armazenados em um banco H2 em arquivo. |

## 3. Campos cadastrados

Cada destino possui:

1. Nome do destino;
2. Cidade;
3. Estado (UF);
4. Categoria;
5. Melhor época para visitar;
6. Custo médio por pessoa;
7. Descrição.

O back-end também gera automaticamente um `id` para identificar cada registro.

## 4. Organização do Front-end

```text
src/
├── components/
│   ├── DestinoForm/       formulário de cadastro
│   ├── DestinoList/       listagem e estados da consulta
│   ├── Header/            menu de navegação
│   ├── Layout/            estrutura comum das páginas
│   └── PageContainer/     composição usando children
├── constants/
│   └── destinoOptions.js  opções e valor inicial do formulário
├── pages/
│   ├── HomePage.jsx       página inicial
│   ├── CadastroPage.jsx   tela de cadastro
│   ├── DestinosPage.jsx   tela de consulta
│   └── ErrorPage.jsx      página para endereço inválido
├── services/
│   └── destinoService.js  funções que se comunicam com a API
├── App.jsx                fornece o Router para a aplicação
├── routes.jsx             configura os caminhos das páginas
└── index.css              estilos globais básicos
```

Essa separação evita colocar toda a aplicação em um único arquivo. Cada componente possui uma responsabilidade específica.

## 5. Componentes, props e children

Um componente React é uma função que retorna JSX. O projeto possui componentes reutilizáveis, como `Header`, `DestinoForm`, `DestinoList` e `PageContainer`.

As **props** são dados recebidos pelo componente. Por exemplo, `DestinoList` recebe:

```jsx
<DestinoList
  destinos={destinos}
  carregando={carregando}
  erro={erro}
  onTentarNovamente={carregarDestinos}
/>
```

Dentro do componente, essas props são desestruturadas nos parâmetros da função.

O `PageContainer` utiliza a prop especial **children**. Ela representa o conteúdo colocado entre a abertura e o fechamento do componente:

```jsx
<PageContainer titulo="Destinos salvos" subtitulo="Consulta dos destinos">
  <DestinoList />
</PageContainer>
```

O título e o subtítulo são props nomeadas. A lista colocada dentro da tag é recebida como `children`.

## 6. Estado com useState

O estado é utilizado para guardar valores que podem alterar a interface. A sintaxe usada é:

```jsx
const [destinos, setDestinos] = useState([])
```

- `destinos` contém o valor atual;
- `setDestinos` atualiza o valor;
- `[]` é o valor inicial.

Na página de consulta existem estados para:

- lista de destinos;
- carregamento da requisição;
- mensagem de erro.

No formulário existem estados para:

- valores digitados;
- envio em andamento;
- erro de cadastro.

Quando uma função `set` altera o estado, o React renderiza novamente a parte necessária da interface.

## 7. Formulário controlado

O formulário é chamado de **controlado** porque o valor de cada campo vem do estado:

```jsx
<input
  name="nome"
  value={formulario.nome}
  onChange={alterarCampo}
/>
```

Quando o usuário digita, `onChange` executa a função `alterarCampo`. Essa função utiliza o `name` do campo para atualizar a propriedade correta:

```jsx
setFormulario((dadosAtuais) => ({
  ...dadosAtuais,
  [target.name]: target.value,
}))
```

O operador `...` mantém os outros campos e altera somente o campo utilizado.

## 8. Funções e callbacks

O projeto utiliza funções tradicionais e arrow functions.

Um callback é uma função passada para ser executada depois. Exemplos:

- `onSubmit={enviarFormulario}` passa a função para o evento do formulário;
- `onChange={alterarCampo}` passa a função para o evento do input;
- `destinos.map((destino) => ...)` passa uma arrow function para o `map`;
- `setDestinos((destinosAtuais) => ...)` passa uma função para atualizar o estado com segurança.

As funções não são executadas imediatamente nesses casos. O React ou o método de vetor decide quando chamar o callback.

## 9. map e key

O método `map` transforma cada objeto de destino em um card JSX:

```jsx
destinos.map((destino) => (
  <article key={destino.id}>
    {destino.nome}
  </article>
))
```

A propriedade `key` recebe o `id` gerado pelo banco. Ela ajuda o React a identificar cada item da lista. Foi utilizado o `id`, e não o índice, porque ele é único e estável.

## 10. Renderização condicional

O operador lógico `&&` mostra um elemento somente quando a condição for verdadeira:

```jsx
{erro && <div>{erro}</div>}
```

O operador ternário escolhe entre duas opções:

```jsx
{enviando ? 'Salvando...' : 'Adicionar ao guia'}
```

Se `enviando` for verdadeiro, aparece “Salvando...”. Caso contrário, aparece o texto normal do botão.

## 11. fetch e async/await

O arquivo `destinoService.js` concentra a comunicação com a API.

O `fetch` realiza a comunicação com a API. Como a resposta não chega imediatamente, as funções usam `async` e `await`:

```jsx
const resposta = await fetch(API_URL)
const dados = await resposta.json()
```

O fluxo é tratado com:

- `try`: tenta executar a requisição;
- `catch`: captura falhas;
- `finally`: encerra o carregamento tanto no sucesso quanto no erro.

### GET

O GET é executado em `listarDestinos`. Ele consulta:

```text
GET http://localhost:8080/api/destinos
```

O resultado JSON é colocado no estado `destinos` e renderizado com `map`.

### POST

O POST é executado em `cadastrarDestino`. Os dados são convertidos para JSON e enviados no corpo da requisição:

```text
POST http://localhost:8080/api/destinos
Content-Type: application/json
```

O valor médio é convertido de texto para número antes do envio.

## 12. Estados das requisições

A tela trata quatro situações:

1. **Carregamento:** mostra “Buscando destinos...” enquanto aguarda o GET;
2. **Sucesso:** mostra uma confirmação após o POST;
3. **Erro:** mostra a mensagem devolvida pela API ou um aviso de conexão;
4. **Lista vazia:** informa que ainda não existem destinos cadastrados.

Isso impede que a tela fique sem resposta visual enquanto a API trabalha.

## 13. React Router

O projeto utiliza `createBrowserRouter` para associar URLs aos componentes:

```text
/             → HomePage
/cadastrar    → CadastroPage
/destinos     → DestinosPage
```

O `RouterProvider`, utilizado no `App.jsx`, disponibiliza o roteamento para a aplicação.

O `Link` é usado quando a navegação acontece por um elemento visível, como o menu.

O `useNavigate` é utilizado após um cadastro bem-sucedido, porque a navegação depende do resultado do POST.

O `useLocation` recupera a mensagem temporária enviada para a página de destinos. Essa mensagem não é usada como persistência. Os destinos continuam vindo da API.

## 14. CSS Modules

Cada componente possui um arquivo CSS Module, por exemplo:

```text
DestinoForm.jsx
DestinoForm.module.css
```

O arquivo é importado como um objeto:

```jsx
import styles from './DestinoForm.module.css'
```

E utilizado desta maneira:

```jsx
<div className={styles.panel}>
```

Isso evita conflitos entre classes que possuam o mesmo nome em componentes diferentes. O `index.css` ficou responsável apenas por regras globais.

## 15. Organização do back-end

```text
src/main/java/school/sptech/Alem_da_Rota/
├── config/
│   └── ApiExceptionHandler.java
├── destino/
│   ├── Destino.java
│   └── DestinoController.java
└── AlemDaRotaApplication.java
```

### Destino.java

É o modelo que representa um destino no contrato da API. Seus atributos correspondem aos campos enviados pelo Front-end. As anotações verificam valores obrigatórios, tamanhos e valor não negativo.

### DestinoController.java

Define o endereço `/api/destinos` e os endpoints GET e POST. Recebe o `JdbcTemplate` pelo construtor, executa o SELECT com `query` e o INSERT com `update`. O `@CrossOrigin` permite que o Front-end executado na porta 5173 acesse a API da porta 8080.

### ApiExceptionHandler.java

Transforma erros de validação em uma resposta JSON simples, que pode ser exibida pelo Front-end.

## 16. Banco H2

O H2 é um banco de dados relacional leve. Foi configurado em `application.properties`:

```properties
spring.datasource.url=jdbc:h2:file:./data/alem-da-rota
```

Foi escolhida a modalidade `file`, e não apenas memória. Dessa maneira, os dados ficam armazenados na pasta `data` e continuam disponíveis após reiniciar o back-end.

O Controller cria a tabela, quando necessário, executando SQL com `JdbcTemplate`. Não é necessário um arquivo `schema.sql` separado.

## 17. Fluxo completo do cadastro

1. O usuário abre `/cadastrar`;
2. Digita os sete campos;
3. O estado do formulário é atualizado a cada alteração;
4. Ao enviar, o callback `enviarFormulario` é executado;
5. A página chama `cadastrarDestino`;
6. O serviço realiza um POST;
7. O Controller valida os dados;
8. O `JdbcTemplate` executa o INSERT no H2;
9. A API devolve o destino com seu `id`;
10. O Front-end navega para `/destinos`;
11. A página realiza um GET;
12. O destino salvo aparece na lista.

## 18. Como executar

### Back-end

É necessário ter o Java 21 instalado. Na pasta do back-end:

```powershell
mvnw.cmd spring-boot:run
```

O back-end será iniciado em `http://localhost:8080`.

### Front-end

Na pasta do Front-end:

```powershell
npm install
npm run dev
```

Depois, acessar `http://localhost:5173`.

## 19. Roteiro curto para apresentação

Uma possível explicação é:

> Meu projeto se chama Além da Rota e possui o tema turismo. O Front-end foi desenvolvido em React e o back-end em Spring Boot com banco H2. Eu separei a aplicação em componentes e páginas. Na tela de cadastro, o formulário possui sete campos e utiliza estado para controlar os valores. Quando o usuário envia o formulário, o Front-end realiza um POST para a API. O back-end valida e salva o destino no H2. Na tela de consulta, um GET busca os dados reais da API e o método map transforma cada destino em um card. Também tratei carregamento, erro, sucesso e lista vazia. Para os estilos, utilizei CSS Modules, evitando conflitos entre componentes. A navegação entre as páginas foi feita com React Router.

## 20. Perguntas que podem ser feitas

### Por que usar estado em vez de uma variável comum?

Porque a função de atualização do estado avisa o React que a interface precisa ser renderizada novamente.

### Por que usar map?

Porque `map` transforma o vetor de destinos em um vetor de elementos JSX. O `forEach` não serviria para renderização porque não devolve um novo vetor.

### Para que serve a key?

Ela permite que o React identifique cada item da lista. Foi utilizado o `id` gerado pelo banco.

### Qual a diferença entre props e estado?

Props são dados recebidos pelo componente e são somente leitura. Estado é uma memória interna que pode ser atualizada e altera a interface.

### Para que serve children?

Permite colocar um conteúdo variável dentro de uma estrutura reutilizável. No projeto, o `PageContainer` recebe o conteúdo de cada página como `children`.

### Por que usar async/await?

Porque o `fetch` e `response.json()` devolvem Promises. O `await` espera o resultado antes de continuar o processamento.

### Os dados exibidos são estáticos?

Não. A fonte principal é a API. A página de destinos executa GET e recebe os registros armazenados no H2.

### Por que existe CORS?

Porque o Front-end e o back-end rodam em origens diferentes: portas 5173 e 8080. O CORS autoriza essa comunicação durante o desenvolvimento.

### Por que o banco não perde os dados?

Porque o H2 foi configurado no modo arquivo, utilizando `jdbc:h2:file`, e não somente em memória.

### Por que separar o serviço da API?

Para não misturar o código de comunicação HTTP com o código das telas. Isso melhora a organização e facilita manutenção.

## 21. Conclusão

O projeto atende aos requisitos de cadastro, consulta, integração com API, componentização, estado, JSX e CSS Modules. Os conceitos utilizados seguem os materiais de aula e foram organizados de forma que cada arquivo tenha uma responsabilidade clara.
