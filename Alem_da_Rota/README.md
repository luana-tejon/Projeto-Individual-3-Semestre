# Além da Rota — API REST

API REST desenvolvida em Java e Spring Boot para cadastrar e consultar destinos turísticos. O banco é acessado com `JdbcTemplate`, e os registros são persistidos em um H2 relacional no modo arquivo.

## Tecnologias

- Java 21;
- Spring Boot e Spring Web MVC;
- Spring JDBC (`JdbcTemplate`);
- Bean Validation;
- H2 Database.

## Como executar

Na pasta da API, execute:

```powershell
.\mvnw.cmd spring-boot:run
```

A API ficará em `http://localhost:8080/api/destinos`.

O banco fica em `data/alem-da-rota.mv.db`. A tabela `destino` é criada automaticamente pelo Controller durante a inicialização, sem um arquivo `schema.sql`.

O console H2 fica em `http://localhost:8080/h2-console`:

```text
JDBC URL: jdbc:h2:file:./data/alem-da-rota
User Name: sa
Password: (vazia)
```

## Integração com o Front-end

O CORS aceita `http://localhost:5173` e `http://127.0.0.1:5173`. No Front-end, a URL pode ser configurada assim:

```env
VITE_API_URL=http://localhost:8080/api/destinos
```

## Contrato do recurso `Destino`

| Campo | Tipo JSON | Obrigatório | Regras |
|---|---|---:|---|
| `id` | número | não | Gerado pelo H2; um id enviado no POST é ignorado. |
| `nome` | texto | sim | Não vazio; máximo de 100 caracteres. |
| `cidade` | texto | sim | Não vazia; máximo de 80 caracteres. |
| `estado` | texto | sim | Exatamente dois caracteres; salvo em maiúsculas. |
| `categoria` | texto | sim | Não pode estar vazia. O Front-end oferece opções prontas. |
| `melhorEpoca` | texto | sim | Não pode estar vazia. O Front-end oferece opções prontas. |
| `valorMedio` | número decimal | sim | Maior ou igual a zero. |
| `descricao` | texto | sim | Não vazia; máximo de 500 caracteres. |

## Resumo dos endpoints

| Método | URL | Finalidade | Sucesso | Erro de validação |
|---|---|---|---|---|
| GET | `/api/destinos` | Listar destinos | `200 OK` | — |
| POST | `/api/destinos` | Validar e cadastrar | `201 Created` | `400 Bad Request` |

## GET `/api/destinos`

Retorna todos os destinos persistidos, ordenados pelo id. Não recebe parâmetros nem corpo.

### Requisição

```http
GET /api/destinos HTTP/1.1
Host: localhost:8080
Accept: application/json
```

### Resposta com dados — `200 OK`

```json
[
  {
    "id": 1,
    "nome": "Chapada Diamantina",
    "cidade": "Lençóis",
    "estado": "BA",
    "categoria": "Natureza",
    "melhorEpoca": "Inverno",
    "valorMedio": 1800.00,
    "descricao": "Trilhas, cachoeiras e paisagens inesquecíveis."
  }
]
```

### Resposta sem dados — `200 OK`

```json
[]
```

Lista vazia não é erro: a consulta funcionou, mas não há registros.

### curl

```bash
curl http://localhost:8080/api/destinos
```

## POST `/api/destinos`

Recebe JSON, valida os campos, salva no H2 e devolve o destino com o id gerado.

### Requisição

```http
POST /api/destinos HTTP/1.1
Host: localhost:8080
Content-Type: application/json

{
  "nome": "Chapada Diamantina",
  "cidade": "Lençóis",
  "estado": "ba",
  "categoria": "Natureza",
  "melhorEpoca": "Inverno",
  "valorMedio": 1800.00,
  "descricao": "Trilhas, cachoeiras e paisagens inesquecíveis."
}
```

### Resposta — `201 Created`

```json
{
  "id": 1,
  "nome": "Chapada Diamantina",
  "cidade": "Lençóis",
  "estado": "BA",
  "categoria": "Natureza",
  "melhorEpoca": "Inverno",
  "valorMedio": 1800.00,
  "descricao": "Trilhas, cachoeiras e paisagens inesquecíveis."
}
```

A API converte `ba` para `BA` e gera o `id` automaticamente.

### curl

```bash
curl -X POST http://localhost:8080/api/destinos \
  -H "Content-Type: application/json" \
  -d '{"nome":"Chapada Diamantina","cidade":"Lençóis","estado":"BA","categoria":"Natureza","melhorEpoca":"Inverno","valorMedio":1800.00,"descricao":"Trilhas e cachoeiras."}'
```

## Respostas de erro

### Campos inválidos — `400 Bad Request`

Requisição:

```json
{
  "nome": "",
  "cidade": "Lençóis",
  "estado": "Bahia",
  "categoria": "Natureza",
  "melhorEpoca": "Inverno",
  "valorMedio": -10,
  "descricao": ""
}
```

Resposta:

```json
{
  "mensagem": "Verifique os dados informados",
  "erros": [
    "O nome é obrigatório",
    "Use a sigla do estado com duas letras",
    "O valor não pode ser negativo",
    "A descrição é obrigatória"
  ]
}
```

A ordem das mensagens pode variar.

### Campo ausente — `400 Bad Request`

Se `valorMedio` não for enviado:

```json
{
  "mensagem": "Verifique os dados informados",
  "erros": ["O valor médio é obrigatório"]
}
```

### JSON malformado — `400 Bad Request`

Se o corpo não for um JSON válido, o Spring rejeita a requisição antes de chamar o Controller.

## Códigos HTTP

| Código | Quando ocorre |
|---:|---|
| `200 OK` | GET concluído, com lista preenchida ou vazia. |
| `201 Created` | Destino validado e persistido pelo POST. |
| `400 Bad Request` | JSON inválido ou violação das validações. |
| `404 Not Found` | URL inexistente. Não há busca por id no contrato atual. |
| `500 Internal Server Error` | Falha inesperada no servidor ou banco. |

Não se usa `204 No Content`: o GET devolve uma lista e o POST devolve o destino criado.

## Fluxo interno

```text
GET → Controller → JdbcTemplate.query → SELECT no H2 → 200
POST → @Valid → Controller → JdbcTemplate.update → INSERT no H2 → 201
```

## Organização

```text
src/main/java/school/sptech/Alem_da_Rota/
├── AlemDaRotaApplication.java
├── config/ApiExceptionHandler.java
└── destino/
    ├── Destino.java
    └── DestinoController.java
```

- `Destino`: modelo da API e validações.
- `DestinoController`: criação da tabela, GET, POST, SQL, status e CORS.
- `ApiExceptionHandler`: transforma erros de validação em JSON.
