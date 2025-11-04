# 🎮 Whatever - Player Management API

API REST para gerenciamento de jogadores desenvolvida com Spring Boot 3.5.7 e Java 21.

## 📋 Sobre o Projeto

Sistema de gerenciamento de jogadores que permite criar, listar, atualizar e deletar informações de players, incluindo suas partidas e pontuações.

## 🚀 Tecnologias Utilizadas

- **Java 21**
- **Spring Boot 3.5.7**
  - Spring Data JPA
  - Spring Web
  - Spring Validation
  - Spring DevTools
- **H2 Database** - Banco de dados em memória (para desenvolvimento)
- **Lombok** - Redução de código boilerplate
- **Maven** - Gerenciamento de dependências

## 📦 Estrutura do Projeto

```
src/main/java/com/whatever/
├── controller/          # Controladores REST
│   └── PlayerController.java
├── dto/                # Data Transfer Objects
│   ├── PlayerRequest.java
│   ├── PlayerResponse.java
│   └── PlayerUpdateRequest.java
├── entity/             # Entidades JPA
│   └── Player.java
├── exception/          # Tratamento de exceções
│   ├── ErrorMessage.java
│   └── GlobalExceptionHandler.java
├── mapper/             # Conversão entre DTOs e Entities
│   └── PlayerMapper.java
├── performance/        # Testes de performance e seeding
│   ├── WhatEverPerformance.java
│   └── WhatEverSeeder.java
├── repository/         # Repositories JPA
│   └── PlayerRepository.java
└── service/            # Lógica de negócio
    └── PlayerService.java
```

## ⚙️ Configuração

### Pré-requisitos

- Java 21 ou superior
- Maven 3.6+ (ou usar o wrapper incluído)

### Banco de Dados

O projeto utiliza **H2 Database** em memória, então **não é necessário configurar** nenhum banco de dados externo.

### Console H2

Acesse o console do H2 em:
```
http://localhost:8080/h2-console
```

**Credenciais:**
- JDBC URL: `jdbc:h2:mem:whatever`
- Username: `admin`
- Password: `admin`

### Executando o Projeto

**Windows:**
```bash
.\mvnw.cmd spring-boot:run
```

**Linux/Mac:**
```bash
./mvnw spring-boot:run
```

Na primeira execução, o seeder criará automaticamente 50 players de exemplo.

## 📡 Endpoints da API

### Base URL
```
http://localhost:8080
```

### Players

| Método   | Endpoint                 | Descrição               |
| -------- | ------------------------ | ----------------------- |
| `POST`   | `/players`               | Criar novo player       |
| `GET`    | `/players/findAll`       | Listar todos os players |
| `GET`    | `/players/findById/{id}` | Buscar player por ID    |
| `PUT`    | `/players/update/{id}`   | Atualizar player        |
| `DELETE` | `/players/delete/{id}`   | Deletar player          |

### Performance

| Método | Endpoint                               | Descrição            |
| ------ | -------------------------------------- | -------------------- |
| `GET`  | `/what-ever/performance/com-paginacao` | Listar com paginação |
| `GET`  | `/what-ever/performance/cache`         | Listar com cache     |

#### Parâmetros de Paginação

Para usar paginação, adicione os seguintes parâmetros na URL:

- **`page`**: Número da página (começa em 0)
- **`size`**: Quantidade de itens por página
- **`sort`**: Campo para ordenação (opcional)

**Exemplos:**

```http
# Primeira página com 10 itens
GET /what-ever/performance/com-paginacao?page=0&size=10

# Segunda página com 20 itens
GET /what-ever/performance/com-paginacao?page=1&size=20

# Primeira página ordenada por nome (ascendente)
GET /what-ever/performance/com-paginacao?page=0&size=10&sort=nome,asc

# Primeira página ordenada por pontuação (descendente)
GET /what-ever/performance/com-paginacao?page=0&size=10&sort=pontuacao,desc

# Com cache - mesma estrutura
GET /what-ever/performance/cache?page=0&size=10&sort=nome,asc
```

**Resposta:**
```json
{
  "content": [
    {
      "id": 1,
      "nome": "Player 1",
      "partidas": 0,
      "pontuacao": 0
    }
  ],
  "pageable": {
    "pageNumber": 0,
    "pageSize": 10,
    "sort": {
      "sorted": true,
      "unsorted": false,
      "empty": false
    }
  },
  "totalPages": 5,
  "totalElements": 50,
  "last": false,
  "first": true,
  "numberOfElements": 10,
  "size": 10,
  "number": 0
}
```

## 📝 Exemplos de Requisições

### Criar Player
```http
POST /players
Content-Type: application/json

{
  "nome": "Player Exemplo"
}
```

**Resposta (201 Created):**
```json
{
  "message": "Player criado com sucesso!",
  "data": {
    "id": 1,
    "nome": "Player Exemplo",
    "partidas": 0,
    "pontuacao": 0
  }
}
```

### Listar Todos os Players
```http
GET /players/findAll
```

**Resposta (200 OK):**
```json
{
  "message": "Lista de players recuperada com sucesso!",
  "data": [
    {
      "id": 1,
      "nome": "Player Exemplo",
      "partidas": 10,
      "pontuacao": 100
    },
    {
      "id": 2,
      "nome": "Player 2",
      "partidas": 5,
      "pontuacao": 50
    }
  ]
}
```

### Buscar Player por ID
```http
GET /players/findById/1
```

**Resposta (200 OK):**
```json
{
  "message": "Player encontrado com sucesso!",
  "data": {
    "id": 1,
    "nome": "Player Exemplo",
    "partidas": 0,
    "pontuacao": 0
  }
}
```

### Atualizar Player
```http
PUT /players/update/1
Content-Type: application/json

{
  "name": "Player Atualizado",
  "partidas": 15,
  "pontuacao": 150
}
```

**Resposta (200 OK):**
```json
{
  "message": "Player atualizado com sucesso!",
  "data": {
    "id": 1,
    "nome": "Player Atualizado",
    "partidas": 15,
    "pontuacao": 150
  }
}
```

### Deletar Player
```http
DELETE /players/delete/1
```

**Resposta (200 OK):**
```json
{
  "message": "Player deletado com sucesso!"
}
```

## ✅ Validações

A API implementa validações automáticas nos DTOs:

### Criação de Player (POST)
- **Nome**: Obrigatório, entre 3 e 50 caracteres
- **Partidas**: Iniciado automaticamente com 0
- **Pontuação**: Iniciado automaticamente com 0

### Atualização de Player (PUT)
- **Nome**: Obrigatório, entre 3 e 50 caracteres
- **Partidas**: Não pode ser nulo, mínimo 0
- **Pontuação**: Não pode ser nulo, mínimo 0

### Exemplo de Erro de Validação

**Requisição Inválida:**
```json
{
  "name": "AB"
}
```

**Resposta (400 Bad Request):**
```json
{
  "name": "Nome deve ter entre 3 e 50 caracteres"
}
```

## 🔧 Funcionalidades Especiais

### Seeder Automático
- Na primeira execução, 50 players são criados automaticamente
- Verifica se já existem dados para evitar duplicação

### Tratamento Global de Exceções
- Validações de entrada com mensagens personalizadas
- Tratamento de erros de negócio (IllegalArgumentException)
- Tratamento de recursos não encontrados (EmptyResultDataAccessException)

### Performance
- Endpoints para teste de performance com paginação
- Implementação de cache para otimização de consultas

## 🏗️ Padrões Utilizados

- **DTO Pattern**: Separação entre entidades e objetos de transferência
- **Mapper Pattern**: Conversão entre DTOs e Entities
- **Repository Pattern**: Abstração de acesso a dados
- **Service Layer**: Lógica de negócio separada dos controllers
- **Global Exception Handler**: Tratamento centralizado de exceções

## 📄 Licença

Este é um projeto de demonstração para fins educacionais.

## 👥 Autores

- **Marcelo Henrique** - Repositório Original
- **Luanderson** - Branch develop-luanderson

---

**Status do Projeto:** ✅ Em desenvolvimento - Todas as funcionalidades básicas implementadas
