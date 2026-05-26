# Fintech FIAP — Gestão financeira integrada

Aplicação de gestão financeira pessoal desenvolvida como projeto integrador da FIAP.  
Permite cadastrar, consultar, editar e excluir **Receitas**, **Despesas** e **Investimentos** através de uma interface web conectada a uma API REST Java com banco de dados Oracle.

---

## Tecnologias utilizadas

| Camada | Tecnologia |
|--------|-----------|
| Backend | Java 17, Spring Boot 3, Spring Data JPA, Hibernate |
| Banco de dados | Oracle (instância FIAP) |
| Frontend | ReactJS, Vite, React Router, Axios, Recharts |

---

## Estrutura do projeto

```
Cap 14 - Grand Finale/
├── fintech/               # Projeto Backend (Spring Boot)
├── fintech-frontend/      # Projeto Frontend (ReactJS)
└── README.md
```

---

## Pré-requisitos

- **Java 17** ou superior
- **Maven 3.8** ou superior
- **Node.js 18** ou superior
- **npm 9** ou superior
- Conexão com a rede da FIAP (ou VPN, caso necessário para o Oracle)

---

## Inicialização — Backend

### 1. Acessar a pasta do backend

```bash
cd fintech
```

### 2. Instalar dependências e compilar

```bash
mvn clean install
```

### 3. Iniciar o servidor

```bash
mvn spring-boot:run
```

O backend estará disponível em: **http://localhost:8080**

> **Banco de dados:** a aplicação conecta automaticamente à instância Oracle da FIAP configurada em `src/main/resources/application.properties`. As tabelas já existem no banco — nenhuma configuração adicional é necessária.

---

## Inicialização — Frontend

### 1. Acessar a pasta do frontend (em outro terminal)

```bash
cd fintech-frontend
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

O frontend estará disponível em: **http://localhost:5173**

> **Importante:** o backend deve estar rodando antes de abrir o frontend, pois os dados são carregados diretamente da API Java.

---

## Dados de autenticação (usuário de teste)

| Campo | Valor |
|-------|-------|
| E-mail | `usuario@fintech.com` |
| Senha | `123456` |

> As credenciais são validadas contra os usuários cadastrados no `localStorage` do navegador. Um usuário padrão é criado automaticamente na primeira execução. Novos usuários podem ser criados pela tela de cadastro (`/cadastro`), acessível pelo link "Criar conta" na tela de login.

---

## Endpoints disponíveis

Base URL: `http://localhost:8080/api`

### Receitas
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/receitas` | Lista todas as receitas |
| GET | `/receitas/{id}` | Busca receita por ID |
| POST | `/receitas` | Cria nova receita |
| PUT | `/receitas/{id}` | Atualiza receita existente |
| DELETE | `/receitas/{id}` | Remove receita |

### Despesas
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/despesas` | Lista todas as despesas |
| GET | `/despesas/{id}` | Busca despesa por ID |
| POST | `/despesas` | Cria nova despesa |
| PUT | `/despesas/{id}` | Atualiza despesa existente |
| DELETE | `/despesas/{id}` | Remove despesa |

### Investimentos
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/investimentos` | Lista todos os investimentos |
| GET | `/investimentos/{id}` | Busca investimento por ID |
| POST | `/investimentos` | Cria novo investimento |
| PUT | `/investimentos/{id}` | Atualiza investimento existente |
| DELETE | `/investimentos/{id}` | Remove investimento |

---

## Páginas do Frontend

| Rota | Página |
|------|--------|
| `/` | Login |
| `/dashboard` | Visão geral com gráfico e totais |
| `/receitas` | CRUD completo de receitas |
| `/despesas` | CRUD completo de despesas |
| `/investimentos` | CRUD completo de investimentos |
| `/perfil` | Edição do nome de exibição |
| `/*` | Página de erro 404 personalizada |

---

## Observações

- Todas as requisições do frontend utilizam `http://localhost:8080/api` como base URL (`src/services/api.js`).
- Os controllers possuem `@CrossOrigin(origins = "*")` para permitir comunicação entre as portas 5173 e 8080.
- O banco de dados Oracle utilizado é a instância oficial da FIAP: `oracle.fiap.com.br:1521:ORCL`.
