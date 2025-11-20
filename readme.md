# 🎮 Whatever - Player Management API

API REST para gerenciamento de jogadores desenvolvida com Spring Boot 3.5.7 e Java 21, seguindo os princípios **SOLID** e boas práticas de arquitetura em camadas.

## 📋 Sobre o Projeto

Sistema de gerenciamento de jogadores que permite criar, listar, atualizar e deletar informações de players, incluindo suas partidas e pontuações. O projeto implementa separação de responsabilidades, injeção de dependências e padrões de projeto para garantir código limpo e manutenível.

## 🚀 Tecnologias Utilizadas

- **Java 21**
- **Spring Boot 3.5.7**
  - Spring Data JPA
  - Spring Web
  - Spring Validation
  - Spring DevTools
  - Spring Cache
- **MySQL 8.0.33** - Banco de dados relacional
- **Lombok** - Redução de código boilerplate
- **Maven** - Gerenciamento de dependências

## 📦 Estrutura do Projeto

```
src/main/java/com/whatever/
├── controller/          # Controladores REST
│   └── PlayerController.java
├── dto/                # Data Transfer Objects
│   ├── ApiResponse.java
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
├── performance/        # Performance, cache e seeding
│   ├── WhatEverPerformance.java
│   ├── WhatEverSeeder.java
│   └── PlayerSeedService.java
├── repository/         # Repositories JPA
│   └── PlayerRepository.java
└── service/            # Lógica de negócio
    ├── IPlayerService.java
    ├── PlayerService.java
    ├── IPlayerPerformanceService.java
    └── PlayerPerformanceService.java
```

## 🎯 Princípios SOLID Aplicados

### **SRP (Single Responsibility Principle)**
- **Controllers**: Apenas gerenciam requisições HTTP
- **Services**: Contêm toda a lógica de negócio e conversões
- **Repositories**: Acesso exclusivo aos dados
- **Mappers**: Transformação entre DTOs e Entidades

### **OCP (Open/Closed Principle)**
- Uso de interfaces para facilitar extensão sem modificar código existente

### **DIP (Dependency Inversion Principle)**
- Controllers e Services dependem de abstrações (interfaces)
- Injeção de dependências via construtor

### **ISP (Interface Segregation Principle)**
- Interfaces específicas: `IPlayerService` e `IPlayerPerformanceService`

## ⚙️ Configuração

### Pré-requisitos

- Java 21 ou superior
- Maven 3.6+ (ou usar o wrapper incluído)
- MySQL 8.0+ instalado e rodando

### Banco de Dados

O projeto utiliza **MySQL**. Configure as credenciais em `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/quiz
spring.datasource.username=root
spring.datasource.password=sua_senha
spring.jpa.hibernate.ddl-auto=create-drop
```

**Nota:** O banco será recriado a cada inicialização (`create-drop`). Para manter os dados, altere para `update`

### Executando o Projeto

**Windows:**
```bash
.\mvnw.cmd spring-boot:run
```

**Linux/Mac:**
```bash
./mvnw spring-boot:run
```

A aplicação estará disponível em: `http://localhost:8081`

Na primeira execução, o seeder criará automaticamente **15 players** de exemplo com dados aleatórios.

## 📡 Endpoints da API

### Base URL
```
http://localhost:8081
```

### Players (CRUD Completo)

| Método   | Endpoint                 | Descrição               | Status Code   |
| -------- | ------------------------ | ----------------------- | ------------- |
| `POST`   | `/players`               | Criar novo player       | 201 (Created) |
| `GET`    | `/players/findAll`       | Listar todos os players | 200 (OK)      |
| `GET`    | `/players/findById/{id}` | Buscar player por ID    | 200 (OK)      |
| `PUT`    | `/players/update/{id}`   | Atualizar player        | 200 (OK)      |
| `DELETE` | `/players/delete/{id}`   | Deletar player          | 200 (OK)      |

### Performance (Paginação e Cache)

| Método | Endpoint                     | Descrição                       | Status Code |
| ------ | ---------------------------- | ------------------------------- | ----------- |
| `GET`  | `/performance/com-paginacao` | Listar com paginação e métricas | 200 (OK)    |
| `GET`  | `/performance/cache`         | Listar com cache (otimizado)    | 200 (OK)    |

#### Parâmetros de Paginação

Para usar paginação, adicione os seguintes parâmetros na URL:

- **`page`**: Número da página (começa em 0)
- **`size`**: Quantidade de itens por página
- **`sort`**: Campo para ordenação seguido da direção (asc/desc)

**Exemplos:**

```http
# Primeira página com 10 itens
GET /performance/com-paginacao?page=0&size=10

# Segunda página com 20 itens
GET /performance/com-paginacao?page=1&size=20

# Primeira página ordenada por nome (ascendente)
GET /performance/com-paginacao?page=0&size=10&sort=nome,asc

# Primeira página ordenada por pontuação (descendente)
GET /performance/com-paginacao?page=0&size=10&sort=pontuacao,desc

# Com cache - mesma estrutura (performance otimizada)
GET /performance/cache?page=0&size=10&sort=nome,asc
```

**Resposta da Paginação:**
```json
{
  "content": [
    {
      "id": 1,
      "nome": "Player 1",
      "partidas": 5,
      "pontuacao": 42
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
  "totalPages": 2,
  "totalElements": 15,
  "last": false,
  "first": true,
  "numberOfElements": 10,
  "size": 10,
  "number": 0
}
```

**Nota:** O endpoint `/performance/cache` exibe no console o tempo de execução da consulta, sendo mais rápido em requisições subsequentes devido ao cache.

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
  "nome": "Player Atualizado",
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

A API implementa validações automáticas nos DTOs usando Bean Validation:

### Criação de Player (POST /players)
- **Nome**: 
  - Obrigatório (`@NotBlank`)
  - Entre 3 e 50 caracteres (`@Size`)
- **Partidas**: Iniciado automaticamente com 0
- **Pontuação**: Iniciado automaticamente com 0

### Atualização de Player (PUT /players/update/{id})
- **Nome**: 
  - Obrigatório (`@NotBlank`)
  - Entre 3 e 50 caracteres (`@Size`)
- **Partidas**: 
  - Não pode ser nulo (`@NotNull`)
  - Mínimo: 0 (`@Min`)
  - Máximo: 50 (`@Max`)
- **Pontuação**: 
  - Não pode ser nulo (`@NotNull`)
  - Mínimo: 0 (`@Min`)
  - Máximo: 50 (`@Max`)

### Exemplo de Erro de Validação

**Requisição Inválida:**
```json
{
  "nome": "AB"
}
```

**Resposta (400 Bad Request):**
```json
{
  "nome": "Nome deve ter entre 3 e 50 caracteres"
}
```

**Outro exemplo - Valores fora do limite:**
```json
{
  "nome": "Player Teste",
  "partidas": 100,
  "pontuacao": -5
}
```

**Resposta (400 Bad Request):**
```json
{
  "partidas": "Partidas não pode ser maior que 50",
  "pontuacao": "Pontuação não pode ser negativo"
}
```

## 🔧 Funcionalidades Especiais

### 🌱 Seeder Automático
- Na primeira execução, **15 players** são criados automaticamente com dados aleatórios
- Verifica se já existem dados para evitar duplicação
- Gera players com:
  - Nomes sequenciais (Player 1, Player 2, etc.)
  - Partidas aleatórias (0 a 50)
  - Pontuações aleatórias (0 a 50)
- Implementado com separação de responsabilidades usando `PlayerSeedService`

### 🛡️ Tratamento Global de Exceções
- **Validações de entrada** com mensagens personalizadas (Bean Validation)
- **Tratamento de erros de negócio** (`IllegalArgumentException`)
  - Jogador duplicado
  - Nome inválido ou vazio
  - Player não encontrado
- **Respostas consistentes** em formato JSON padronizado

### ⚡ Performance e Cache
- **Endpoints dedicados** para testes de performance
- **Medição de tempo** usando `StopWatch` do Spring
- **Cache implementado** com Spring Cache
  - Primeira requisição: consulta o banco
  - Requisições seguintes: retorna do cache (muito mais rápido)
- **Logs no console** mostrando tempo de execução
- **Paginação nativa** do Spring Data JPA

### 🔐 CORS Habilitado
- Permite requisições de qualquer origem (`@CrossOrigin("*")`)
- Ideal para desenvolvimento com frontend separado

## 🏗️ Padrões e Arquitetura

### Padrões de Projeto Utilizados
- **DTO Pattern**: Separação entre entidades e objetos de transferência
- **Mapper Pattern**: Conversão centralizada entre DTOs e Entities
- **Repository Pattern**: Abstração de acesso a dados
- **Service Layer Pattern**: Lógica de negócio separada dos controllers
- **Facade Pattern**: Controllers como fachada para os serviços
- **Dependency Injection**: Injeção via construtor (imutabilidade)

### Arquitetura em Camadas

```
┌─────────────────────────────────────────┐
│          Controller Layer               │
│  (Recebe requisições HTTP)              │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│          Service Layer                  │
│  (Lógica de negócio + Conversões)      │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│         Repository Layer                │
│  (Acesso aos dados - Spring Data JPA)  │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│           Database (MySQL)              │
└─────────────────────────────────────────┘
```

### Fluxo de Dados
1. **Controller** recebe requisição HTTP com DTO
2. **Service** valida, converte e aplica regras de negócio
3. **Repository** persiste/busca dados no banco
4. **Service** converte entidade para DTO de resposta
5. **Controller** retorna resposta HTTP com DTO

## 🧪 Testes e Qualidade

### Validações Implementadas
- ✅ Validação de campos obrigatórios
- ✅ Validação de tamanho de strings
- ✅ Validação de valores mínimos e máximos
- ✅ Validação de duplicidade (nomes únicos)
- ✅ Validação de existência (busca por ID)

### Tratamento de Erros
- ✅ Respostas HTTP apropriadas (400, 404, 500)
- ✅ Mensagens de erro descritivas
- ✅ Exception handling centralizado

## 📊 Melhorias Aplicadas (SOLID Refactoring)

### Antes vs Depois

#### Controller
**❌ Antes:**
- Fazia conversões de DTO ↔ Entidade
- Conhecia `PlayerMapper` diretamente
- Dependia de `Player` (entidade)

**✅ Depois:**
- Apenas delega ao serviço
- Trabalha exclusivamente com DTOs
- Desacoplado da camada de entidades

#### Service
**❌ Antes:**
- Retornava entidades JPA
- Lógica de conversão no controller

**✅ Depois:**
- Recebe e retorna apenas DTOs
- Centraliza conversões internamente
- Encapsula lógica de negócio completamente

#### Performance
**❌ Antes:**
- Controller acessava repository diretamente
- Violava separação de responsabilidades
- Usava `@Autowired` (field injection)

**✅ Depois:**
- Service dedicado (`PlayerPerformanceService`)
- Injeção via construtor
- Cache e métricas na camada correta

## 📄 Licença

Este é um projeto de demonstração para fins educacionais.

## 👥 Autores

- **Marcelo Henrique** - [@Marcelo-Henrique-dev](https://github.com/Marcelo-Henrique-dev)
- **Luanderson** - Contribuidor

## 🚀 Próximas Melhorias

- [ ] Implementar testes unitários e de integração
- [ ] Adicionar documentação com Swagger/OpenAPI
- [ ] Implementar autenticação e autorização (Spring Security)
- [ ] Adicionar mais métricas de performance
- [ ] Implementar soft delete
- [ ] Adicionar filtros de busca avançados
- [ ] Dockerizar a aplicação

---

**Status do Projeto:** ✅ Em produção - SOLID aplicado, arquitetura refatorada

**Última atualização:** Novembro 2025
