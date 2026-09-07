# Além da Rota — auditoria, fluxo e guia de estudo

## 1. Objetivo deste documento

Este material serve para:

- revisar o que existe no Front-end e no Back-end;
- entender o fluxo completo da aplicação;
- estudar a sintaxe JavaScript/React e Java/Spring utilizada;
- preparar uma apresentação do projeto;
- distinguir o núcleo pedido de recursos auxiliares ou adicionais.

Esta auditoria foi atualizada com o enunciado original fornecido após a primeira revisão.

## 2. Visão geral

O **Além da Rota** é um sistema de cadastro e consulta de destinos turísticos.

```text
Usuário
   ↓
Front-end React (porta 5173)
   ↓ requisições HTTP em JSON
API Spring Boot (porta 8080)
   ↓ JdbcTemplate e SQL
Banco H2 em arquivo
```

O sistema tem duas operações principais:

| Operação | Tela | HTTP | Endpoint | Banco |
|---|---|---|---|---|
| Consultar destinos | `/destinos` | GET | `/api/destinos` | `findAll()` |
| Cadastrar destino | `/cadastrar` | POST | `/api/destinos` | `save()` |

## 3. Resultado da auditoria

### 3.0 Comparação com o enunciado oficial

| Requisito | Situação | Evidência no projeto |
|---|---|---|
| Aplicação Front-end em React | Atendido | React, React DOM e componentes `.jsx`. |
| Integração com a API de Programação Web | Atendido no código | `destinoService.js` chama a API Spring Boot. Falta repetir o teste integrado por causa do Maven Wrapper local. |
| No mínimo 5 campos | Atendido | O cadastro possui 7 campos. |
| Tela/componente de cadastro | Atendido | Rota `/cadastrar`, `CadastroPage` e `DestinoForm`. |
| Tela/componente de exibição | Atendido | Rota `/destinos`, `DestinosPage` e `DestinoList`. |
| Métodos GET e POST | Atendido | `listarDestinos` usa GET e `cadastrarDestino` usa POST. |
| Componentização React | Atendido | Header, Layout, PageContainer, DestinoForm e DestinoList. |
| Uso de estado | Atendido | `useState` controla formulário, envio, lista, carregamento e erros. |
| Uso de JSX | Atendido | Páginas e componentes são construídos em JSX. |
| CSS Modules | Atendido | Arquivos `.module.css` importados pelos componentes e páginas. |
| Carregamento | Atendido | A consulta mostra “Buscando destinos...”. |
| Sucesso | Atendido | Após o POST, a página mostra mensagem de destino adicionado. |
| Erro | Atendido | Erros de conexão/HTTP/formulário são exibidos; a consulta permite tentar novamente. |
| Persistência no Back-end | Atendido | H2 em arquivo e Controller implementado com `JdbcTemplate`. |
| Consulta sem dados simulados | Atendido | A fonte principal é o GET; não há array estático de destinos. |
| Tema associado à primeira letra do nome | Não verificável pelo código | O tema é turismo/destinos. É preciso confirmar na tabela ou orientação do professor se esse é o tema atribuído à letra do aluno. |
| Repositório Git com Front-end, CSS e integração | Pendente no material local | Não foi encontrada uma pasta `.git` nas duas raízes examinadas. O código existe, mas ainda é preciso confirmar/publicar o repositório Git de entrega. |

**Resultado:** os requisitos de implementação estão atendidos no código, incluindo o uso obrigatório de `JdbcTemplate`. Ainda é necessário executar o teste integrado e confirmar o tema atribuído à letra do aluno.

### 3.1 O que está coerente

- Os sete campos do formulário correspondem aos sete campos de negócio da entidade Java.
- Os nomes enviados em JSON correspondem aos atributos do Back-end.
- O Front-end usa GET para consultar e POST para cadastrar.
- A URL padrão do Front-end aponta para o endpoint correto.
- O CORS permite as origens usadas pelo Vite em desenvolvimento.
- O POST devolve status HTTP `201 Created`.
- O Back-end valida campos obrigatórios, tamanhos e valor não negativo.
- O banco H2 está em modo arquivo, portanto os dados persistem após reiniciar.
- A listagem usa dados reais da API, não uma lista estática.
- Existem mensagens de carregamento, erro, lista vazia e sucesso.
- O Front-end está componentizado e usa CSS Modules.
- O lint do Front-end foi executado sem apontar erros.
- O build de produção do Front-end foi concluído com sucesso.

### 3.2 Pontos que merecem atenção

1. **O teste automatizado do Back-end é apenas de carregamento de contexto.** GET, POST e validação também foram conferidos manualmente.
2. **Os testes existentes cobrem apenas o contexto.** A validação manual complementar confirmou GET 200, POST 201 e erro 400 usando um H2 temporário.
3. **A mensagem de sucesso do cadastro fica no histórico da rota.** Se o usuário atualizar `/destinos`, `location.state` pode continuar exibindo a mensagem anterior.
4. **O arquivo `globo-viagem.png` tem cerca de 956 KB.** O build funciona, mas a imagem pode ser otimizada.

### 3.3 Elementos possivelmente “a mais”

Estes itens não prejudicam o projeto, mas podem estar além de uma atividade mínima de GET, POST, estado, componentes e CSS Modules:

| Item | Situação | Recomendação |
|---|---|---|
| Página inicial `/` | Recurso visual adicional | Manter; melhora a apresentação. |
| Página 404 | Tratamento adicional | Manter; demonstra roteamento. |
| React Router | Necessário para separar as páginas atuais | Manter. |
| Botão “Tentar novamente” | Experiência de erro adicional | Manter. |
| Variável `VITE_API_URL` | Configuração adicional | Manter; evita URL fixa em produção. |
| `ApiExceptionHandler` | Padronização adicional de erros | Manter; integra bem com o Front-end. |
| Console H2 | Ferramenta auxiliar de desenvolvimento | Opcional; pode desativar se não for pedido. |
| `spring-boot-starter-jdbc` | Obrigatório para o `JdbcTemplate` | Manter. |
| `HELP.md` | Arquivo gerado pelo Spring Initializr | Opcional; não participa da aplicação. |
| `src/assets/hero.png` | Arquivo sem referência no código | Pode remover; parece não utilizado. |
| `public/icons.svg` | Arquivo sem referência localizada | Pode remover após conferência visual. |

Conclusão: não há funcionalidade de negócio desnecessária, como editar ou excluir. Os itens adicionais encontrados são principalmente de navegação, experiência do usuário, configuração e arquivos gerados/sem uso.

## 4. Estrutura do Front-end

```text
src/
├── assets/                 imagens
├── components/
│   ├── DestinoForm/        formulário controlado
│   ├── DestinoList/        estados e cards da consulta
│   ├── Header/             navegação
│   ├── Layout/             estrutura compartilhada
│   └── PageContainer/      título e conteúdo das páginas
├── constants/
│   └── destinoOptions.js   opções e estado inicial
├── pages/
│   ├── HomePage.jsx
│   ├── CadastroPage.jsx
│   ├── DestinosPage.jsx
│   └── ErrorPage.jsx
├── services/
│   └── destinoService.js   comunicação HTTP
├── App.jsx                 fornece o Router
├── routes.jsx              mapa de rotas
└── main.jsx                inicialização do React
```

### Responsabilidade de cada camada

- **pages:** coordenam a tela e os dados.
- **components:** renderizam partes reutilizáveis.
- **services:** conversam com a API.
- **constants:** guardam valores fixos compartilhados.
- **CSS Modules:** isolam os estilos de cada componente.

## 5. Estrutura do Back-end

```text
src/main/java/school/sptech/Alem_da_Rota/
├── AlemDaRotaApplication.java       inicializa o Spring
├── config/
│   └── ApiExceptionHandler.java     formata erros de validação
└── destino/
    ├── Destino.java                 entidade e validações
    └── DestinoController.java       endpoints REST e acesso ao banco
```

O fluxo interno segue:

```text
Controller → JdbcTemplate → SQL → H2
```

Não existe uma classe `Service` no Back-end. Para duas operações simples isso funciona, embora projetos maiores normalmente criem uma camada de serviço para regras de negócio.

## 6. Fluxo de inicialização

### Front-end

1. O navegador carrega `index.html`.
2. `main.jsx` procura o elemento HTML com id `root`.
3. `createRoot(...).render(...)` monta a aplicação React.
4. `App.jsx` renderiza `RouterProvider`.
5. `routes.jsx` escolhe a página conforme a URL.
6. `Layout` mantém Header, conteúdo (`Outlet`) e Footer.

### Back-end

1. O método `main` chama `SpringApplication.run`.
2. O Spring encontra o Controller, o modelo e as configurações.
3. O Controller usa `JdbcTemplate` para criar a tabela caso ela ainda não exista.
4. A conexão abre o arquivo `data/alem-da-rota`.
5. A API começa a responder na porta 8080.

## 7. Fluxo completo do cadastro (POST)

1. O usuário entra em `/cadastrar`.
2. `CadastroPage` renderiza `DestinoForm`.
3. Cada campo mostra um valor vindo do estado `formulario`.
4. Ao digitar, `onChange` chama `alterarCampo`.
5. `setFormulario` cria um novo objeto, preserva os demais campos com `...` e altera a propriedade indicada por `name`.
6. Ao enviar, `onSubmit` chama `enviarFormulario`.
7. `event.preventDefault()` evita o recarregamento da página.
8. O Front-end verifica se há campo vazio.
9. `CadastroPage.salvarDestino` chama `cadastrarDestino`.
10. O service converte `valorMedio` para número e o objeto para JSON.
11. `fetch` envia `POST /api/destinos`.
12. O Spring converte o JSON em um objeto `Destino` por causa de `@RequestBody`.
13. `@Valid` executa as validações da entidade.
14. Se houver erro, `ApiExceptionHandler` devolve status 400 e mensagens em JSON.
15. Se estiver válido, o Controller zera o id e transforma a UF em maiúsculas.
16. `jdbcTemplate.update(...)` executa o `INSERT`.
17. O banco gera o id.
18. A API devolve o objeto salvo e status 201.
19. O Front-end navega para `/destinos` com uma mensagem temporária.
20. A tela de destinos faz um GET e mostra o novo card.

### Corpo enviado

```json
{
  "nome": "Chapada Diamantina",
  "cidade": "Lençóis",
  "estado": "BA",
  "categoria": "Natureza",
  "melhorEpoca": "Inverno",
  "valorMedio": 1800,
  "descricao": "Trilhas, cachoeiras e paisagens."
}
```

## 8. Fluxo completo da consulta (GET)

1. O usuário entra em `/destinos`.
2. O estado começa com lista vazia e `carregando = true`.
3. Depois da montagem da página, `useEffect` chama `carregarDestinos`.
4. O service executa `GET /api/destinos`.
5. O Controller chama `jdbcTemplate.query(...)`.
6. O `JdbcTemplate` executa o `SELECT` na tabela do H2.
7. A API serializa a lista como JSON.
8. `setDestinos` guarda a lista recebida.
9. `finally` define `carregando = false`.
10. `DestinoList` usa `map` para transformar cada objeto em um card.

Possíveis resultados visuais:

- carregando: “Buscando destinos...”;
- falha: mensagem e botão para tentar novamente;
- lista vazia: aviso de que não há destinos;
- sucesso: quantidade e cards dos destinos.

## 9. Sintaxe de JavaScript e React

### `const` e objetos

```jsx
const DESTINO_INICIAL = { nome: '', cidade: '' }
```

`const` impede trocar a referência da variável. Um objeto agrupa propriedades no formato `chave: valor`.

### Importação e exportação

```jsx
import { useState } from 'react'
export default function CadastroPage() { ... }
```

`import` traz recursos de outro módulo. Chaves indicam exportação nomeada. `export default` define a exportação principal do arquivo.

### Desestruturação

```jsx
const [erro, setErro] = useState('')
function DestinoForm({ onSubmit, erro }) { ... }
```

No primeiro caso, a desestruturação extrai posições de um array. No segundo, extrai propriedades de um objeto de props.

### Estado (`useState`)

```jsx
const [destinos, setDestinos] = useState([])
```

- `destinos`: valor atual;
- `setDestinos`: função que atualiza o valor;
- `[]`: valor inicial.

Atualizar estado solicita uma nova renderização do componente.

### Formulário controlado

```jsx
<input name="nome" value={formulario.nome} onChange={alterarCampo} />
```

O React controla o valor. O navegador emite o evento, a função atualiza o estado e o novo estado volta para o campo.

### Spread e propriedade calculada

```jsx
setFormulario((dadosAtuais) => ({
  ...dadosAtuais,
  [target.name]: target.value,
}))
```

`...dadosAtuais` copia as propriedades existentes. `[target.name]` calcula qual propriedade será modificada, como `nome` ou `cidade`.

### Arrow function e callback

```jsx
destinos.map((destino) => <article key={destino.id}>...</article>)
```

`(destino) => ...` é uma arrow function passada como callback. `map` chama essa função uma vez para cada item e devolve um novo array de JSX.

### Renderização condicional

```jsx
{erro && <div>{erro}</div>}
{enviando ? 'Salvando...' : 'Adicionar ao guia'}
```

`&&` renderiza o lado direito se a condição for verdadeira. O ternário escolhe entre dois resultados.

### Template string

```jsx
`${novoDestino.nome} foi adicionado ao seu guia!`
```

Crases permitem inserir expressões com `${...}` dentro de uma string.

### Optional chaining

```jsx
location.state?.mensagem
```

`?.` acessa `mensagem` somente se `state` existir, evitando erro de acesso a `undefined`.

### Funções assíncronas

```jsx
async function listarDestinos() {
  const resposta = await fetch(API_URL)
  return resposta.json()
}
```

`async` faz a função devolver uma Promise. `await` pausa aquela função até a Promise terminar, sem bloquear toda a página.

### `try`, `catch` e `finally`

```jsx
try {
  const dados = await listarDestinos()
  setDestinos(dados)
} catch (error) {
  setErro(error.message)
} finally {
  setCarregando(false)
}
```

`try` tenta executar, `catch` trata falhas e `finally` sempre executa.

### JSX

JSX parece HTML, mas está dentro do JavaScript. Expressões JavaScript entram entre chaves:

```jsx
<h3>{destino.nome}</h3>
```

Em JSX usa-se `className`, não `class`, e componentes começam com letra maiúscula.

### Props e `children`

```jsx
<PageContainer titulo="Destinos salvos">
  <DestinoList />
</PageContainer>
```

`titulo` é uma prop nomeada. O conteúdo entre as tags chega ao componente na prop especial `children`.

### `useEffect`

```jsx
useEffect(() => {
  carregarDestinos()
}, [])
```

O efeito roda após a montagem. O array vazio indica que ele não depende de valores que mudam durante as renderizações.

## 10. Sintaxe de Java e Spring

### Pacote e importação

```java
package school.sptech.Alem_da_Rota.destino;
import org.springframework.web.bind.annotation.GetMapping;
```

`package` organiza a classe. `import` permite usar uma classe ou anotação de outro pacote pelo nome curto.

### Classe, atributo e tipo

```java
public class Destino {
    private Long id;
    private BigDecimal valorMedio;
}
```

Java possui tipagem estática. `Long` representa o identificador e `BigDecimal` é apropriado para valores monetários por evitar imprecisões comuns de `double`.

### Identificador gerado pelo banco

O modelo não usa anotações JPA. A tabela declara a coluna como identidade no SQL executado pelo Controller:

```sql
id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY
```

Assim, o H2 gera o id, e o `GeneratedKeyHolder` recupera esse valor para a resposta do POST.

### Anotações de validação

```java
@NotBlank(message = "O nome é obrigatório")
@Size(max = 100)
private String nome;
```

As anotações declaram regras. `@Valid` no Controller manda o Spring aplicá-las ao corpo recebido.

### Encapsulamento, getters e setters

Os atributos são `private`. Métodos `get...` leem e métodos `set...` alteram os valores. Isso preserva o encapsulamento da classe.

### Controller com `JdbcTemplate`

```java
@RestController
public class DestinoController {
    private final JdbcTemplate jdbcTemplate;
}
```

O Controller executa o `SELECT` com `jdbcTemplate.query`. No cadastro, usa `jdbcTemplate.update` para executar o `INSERT` e `GeneratedKeyHolder` para recuperar o id.

### Injeção de dependência pelo construtor

```java
public DestinoController(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
}
```

O Spring configura o `JdbcTemplate` e o entrega ao Controller pelo construtor.

### Anotações REST

```java
@RestController
@RequestMapping("/api/destinos")
@GetMapping
@PostMapping
```

- `@RestController`: métodos retornam dados para a resposta HTTP;
- `@RequestMapping`: prefixo comum da URL;
- `@GetMapping`: atende GET;
- `@PostMapping`: atende POST.

### Corpo, validação e status

```java
public Destino cadastrar(@Valid @RequestBody Destino destino)
```

`@RequestBody` converte JSON em Java. `@Valid` valida o objeto. `@ResponseStatus(HttpStatus.CREATED)` define status 201.

### Stream e referência de método

```java
exception.getBindingResult().getFieldErrors().stream()
    .map(DefaultMessageSourceResolvable::getDefaultMessage)
    .toList();
```

`stream()` inicia um processamento da coleção. `map` transforma cada erro em sua mensagem. `Classe::metodo` é uma referência de método. `toList()` reúne o resultado.

### `var` e `Map.of`

```java
var mensagens = ...;
return Map.of("mensagem", "Verifique os dados", "erros", mensagens);
```

`var` pede ao compilador para inferir o tipo local. `Map.of` cria um mapa imutável que o Spring converte em objeto JSON.

## 11. Contrato entre Front-end e Back-end

| Campo JSON | Java | React | Regra principal |
|---|---|---|---|
| `id` | `Long` | usado como `key` | gerado pelo banco |
| `nome` | `String` | input texto | obrigatório, até 100 |
| `cidade` | `String` | input texto | obrigatório, até 80 |
| `estado` | `String` | input texto | obrigatório, até 2 |
| `categoria` | `String` | select | obrigatório |
| `melhorEpoca` | `String` | select | obrigatório |
| `valorMedio` | `BigDecimal` | input number | obrigatório, mínimo zero |
| `descricao` | `String` | textarea | obrigatório, até 500 |

O Front-end melhora a experiência com validações de campos, mas o Back-end é a proteção definitiva porque uma requisição pode ser enviada sem usar a interface.

## 12. Banco H2

Configuração principal:

```properties
spring.datasource.url=jdbc:h2:file:./data/alem-da-rota
```

`file` grava em disco. Na inicialização, o Controller executa `CREATE TABLE IF NOT EXISTS` por meio do `JdbcTemplate`, sem precisar de `schema.sql`. O console fica disponível em `/h2-console`.

## 13. Como executar

### Back-end

Requisito: Java 21.

```powershell
cd C:\Users\luana\Downloads\Alem_da_Rota_back\Alem_da_Rota
.\mvnw.cmd spring-boot:run
```

API: `http://localhost:8080/api/destinos`

### Front-end

```powershell
cd D:\front-end\vite.front\Alem_da_Rota_front
npm install
npm run dev
```

Site: `http://localhost:5173`

Inicie o Back-end antes de testar cadastro e consulta.

## 14. Roteiro de demonstração

1. Abra a página inicial e explique o tema.
2. Mostre que Header e Layout são compartilhados.
3. Entre em “Cadastrar” e explique o formulário controlado.
4. Preencha os sete campos.
5. Envie e destaque o POST, a validação e a persistência.
6. Mostre a navegação automática para a consulta.
7. O que o GET trouxe novamente os dados do banco.
8. O `map`, que transforma cada destino em card.
9. Encerre a divisão Front-end, API e H2.

## 15. Perguntas prováveis da apresentação

### Por que usar estado e não uma variável comum?

Porque a atualização do estado avisa ao React que a interface deve ser renderizada novamente.

### Qual a diferença entre props e estado?

Props são dados recebidos pelo componente. Estado é a memória interna atualizável do componente.

### Por que usar `map`?

Porque ele transforma o array de dados em um novo array de elementos JSX. Cada item recebe uma `key` estável.

### Por que a `key` usa o id?

Porque o id é único e estável. Isso ajuda o React a identificar corretamente cada card entre renderizações.

### Para que serve `useEffect`?

Para sincronizar o componente com algo externo. Neste caso, ele dispara a consulta à API depois que a página é montada.

### Por que existe um arquivo de service?

Para separar comunicação HTTP da renderização das telas, facilitando leitura, manutenção e reutilização.

### Por que validar também no Back-end?

Porque o Front-end pode ser contornado. A API deve proteger os dados independentemente de quem envia a requisição.

### O que é CORS?

É a política que controla requisições entre origens diferentes. Em desenvolvimento, Front-end e Back-end usam portas diferentes.

### Por que `BigDecimal` para dinheiro?

Porque ele representa valores decimais com precisão adequada, evitando erros binários típicos de `float` e `double`.

### Para que serve o `JdbcTemplate`?

Ele simplifica a execução de SQL no Java, administra a conexão com o banco e transforma as linhas do resultado em objetos `Destino`.

### Os destinos são estáticos?

Não. Eles vêm do GET e são persistidos no H2 pelo POST.

## 16. Conclusão

O núcleo da aplicação está bem separado e usa React, Spring Boot, `JdbcTemplate` e H2 conforme os enunciados. O Front-end passou no lint e no build. O Back-end compilou, carregou o contexto e teve GET, POST e validação confirmados em execução com um H2 temporário.
