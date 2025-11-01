# What-Ever Quiz Game

## Descrição
What-Ever é um jogo de perguntas e respostas interativo desenvolvido com Spring Boot e interface web. O projeto utiliza a API do Open Trivia Database para fornecer uma experiência educativa e divertida aos usuários, permitindo que testem seus conhecimentos em diferentes categorias.

O Back-end vai fazer somente o ranking dos usuários.

## Principais Funcionalidades

### Sistema de Quiz
- **Perguntas Personalizadas:**
  - Seleção do número de questões
  - Escolha de categoria específica
  - Definição do nível de dificuldade
  - Opção entre questões múltipla escolha ou verdadeiro/falso
- **Sistema de Pontuação:**
  - Cálculo automático de pontos
  - Feedback imediato após cada resposta
  - Acompanhamento do progresso

### Gerenciamento de Jogadores
- **Perfil do Jogador:**
  - Registro e autenticação
  - Histórico de partidas
  - Estatísticas detalhadas:
    - Pontuação total
    - Recorde pessoal
    - Média de pontos por jogo
    - Total de partidas jogadas
- **Sistema de Ranking:**
  - Classificação dos melhores jogadores
  - Visualização de top scores

## Stack Tecnológica

### Backend
- **Framework:** Spring Boot
- **Linguagem:** Java 21
- **APIs:**
  - RESTful endpoints
  - Integração com Open Trivia DB
- **Dependências:**
  - Lombok para redução de boilerplate
  - Spring Web para endpoints REST
  - Spring Data JPA para persistência
  - Spring DevTools
  - Jarkata Validacion 

### Frontend
- **Tecnologias Web:**
  - HTML5 para estruturação
  - CSS3 com Bootstrap para estilização
  - JavaScript para interatividade
- **Recursos:**
  - Interface responsiva
  - Design moderno e intuitivo
  - Feedback visual em tempo real

## API Endpoints

### Quiz (WhatEverController)
```
GET  /whatever/questions - Obtém questões personalizadas
  Parâmetros:
  - amount: número de questões
  - category: categoria desejada
  - difficulty: nível de dificuldade
  - type: tipo de questão

POST /whatever/score - Processa e calcula pontuação
```

### Jogadores (PlayerController)
```
POST   /api/players          - Registra novo jogador
PUT    /api/players/{id}/score - Atualiza pontuação
GET    /api/players/top      - Lista ranking
GET    /api/players/{id}     - Busca jogador por ID
GET    /api/players/by-name/{nome} - Busca por nome
DELETE /api/players/{id}     - Remove jogador
```

## Configuração e Execução

### Pré-requisitos
- Java 21 ou superior
- Maven instalado
- Conexão com internet (para acesso à API do Open Trivia)

### Passos para Execução

1. Clone o repositório:
   ```bash
   git clone [URL_DO_REPOSITORIO]
   ```

2. Navegue até a pasta do projeto:
   ```bash
   cd what-ever
   ```

3. Execute a aplicação:
   ```bash
   ./mvnw spring-boot:run
   ```

4. Acesse no navegador:
   ```
   http://localhost:8080
   ```

## Guia de Uso

1. **Início do Jogo:**
   - Acesse a página inicial
   - Registre-se ou faça login (se necessário)

2. **Configuração da Partida:**
   - Selecione o número de questões
   - Escolha a categoria desejada
   - Defina o nível de dificuldade
   - Escolha o tipo de questões

3. **Durante o Jogo:**
   - Leia cada questão cuidadosamente
   - Selecione sua resposta
   - Receba feedback imediato

4. **Fim de Jogo:**
   - Visualize sua pontuação final
   - Confira sua posição no ranking
   - Opção de iniciar nova partida

## Estrutura do Projeto
```
what-ever/
├── src/
│   ├── main/
│   │   ├── java/br/com/sexteto/What_ever/
│   │   │   ├── config/
│   │   │   │   ├── AppConfig.java
│   │   │   │   └── WebConfig.java
│   │   │   ├── controller/
│   │   │   │   ├── PlayerController.java
│   │   │   │   └── WhatEverController.java
│   │   │   ├── Exception/
│   │   │   │   ├── GlobalExceptionHandler.java
│   │   │   │   └── PlayerAlreadyExistsException.java
│   │   │   ├── model/
│   │   │   │   ├── Pergunta.java
│   │   │   │   ├── Player.java
│   │   │   │   └── Question.java
│   │   │   ├── repository/
│   │   │   │   └── PlayerRepository.java
│   │   │   ├── service/
│   │   │   │   ├── PlayerService.java
│   │   │   │   └── WhatEverService.java
│   │   │   └── WhatEverApplication.java
│   │   └── resources/
│   │       ├── static/
│   │       │   ├── index.html
│   │       │   ├── script.js
│   │       │   └── styles.css
│   │       └── application.properties
│   └── test/
└── pom.xml
```

## Contribuição
Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature
   ```bash
   git checkout -b feature/sua-feature
   ```
3. Commit suas alterações
   ```bash
   git commit -m 'Adiciona nova feature'
   ```
4. Push para a branch
   ```bash
   git push origin feature/sua-feature
   ```
5. Abra um Pull Request

## Licença
Este projeto está licenciado sob a MIT License.

## Equipe
Desenvolvido pelo Grupo Sexteto como parte do projeto acadêmico.

---
