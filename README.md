# Desmiojo API

Bem-vindo à API do Desmiojo! A API para o aplicativo de receitas número 1 de quem quer deixar o miojo de lado.

Este projeto foi construído seguindo os princípios da **Clean Architecture** e **Domain-Driven Design (DDD)**, com uma estrutura modular para garantir escalabilidade e manutenibilidade.

## 🚀 Tecnologias Principais

-   **Node.js**: Ambiente de execução.
-   **TypeScript**: Linguagem principal para um código mais seguro e robusto.
-   **Express.js**: Framework web para a construção da API.
-   **Prisma**: ORM para interação com o banco de dados e gerenciamento de migrações.
-   **PostgreSQL**: Banco de dados relacional.
-   **Docker & Docker Compose**: Para containerização e orquestração do ambiente de desenvolvimento.
-   **JWT (JSON Web Token)**: Para autenticação.
-   **Scalar**: Para documentação da API a partir de uma especificação OpenAPI.

## ✅ Pré-requisitos

Antes de começar, garanta que você tenha as seguintes ferramentas instaladas na sua máquina:

-   **Node.js** (versão 22.x ou superior)
-   **PNPM** (gerenciador de pacotes). Se não tiver, instale com: `npm install -g pnpm`
-   **Docker**
-   **Docker Compose**

## ⚙️ Configuração do Ambiente

1.  **Clonar o Repositório (se aplicável):**
    ```bash
    git clone git@github.com:mateusdreher/desmiojo-api.git
    cd desmiojo-api
    ```

2.  **Variáveis de Ambiente:**
    Este projeto usa um arquivo `.env` para gerenciar variáveis de ambiente. Copie o arquivo de exemplo para criar o seu.

    ```bash
    cp .env.example .env
    ```
    
    ```env
    # .env.example

    # Configurações da Aplicação
    API_PORT=3004
    DOCKER_API_PORT=3333
    DB_PORT=5432
    DOCKER_DB_PORT=5432
    JWT_SECRET="seu-segredo-super-secreto-shhhh"
    DATABASE_URL=""postgresql://desmiojo:P@ssword@localhost:5432/desmiojo_db?schema=desmiojo"
    ```
    **Importante:** A api vai funcionar com essas envs, mas podem ser mudadas caso queira, é importante mudar o JWT_SECRET para maior segurança.

## 📦 Instalação

Instale todas as dependências do projeto usando o PNPM:

```bash
pnpm install
```

## ▶️ Executando a Aplicação com Docker

A forma recomendada para rodar este projeto em desenvolvimento é usando o Docker Compose, que orquestra tanto a API quanto o banco de dados.
  1. Para iniciar o ambiente completo (API + Banco de Dados):
  Este comando irá construir a imagem da API, iniciar os containers, aplicar as migrações do banco,

```bash
docker-compose up -d --build
```

2. Para parar o ambiente:

```bash
docker-compose down
```
3. Para resetar completamente o banco de dados:
Este comando irá parar os containers e deletar o volume de dados do banco, forçando uma reinicialização do zero na próxima vez que você rodar docker-compose up.

```bash
docker-compose down -v
```


## 📖 Acessando a Aplicação e a Documentação

Com a aplicação rodando, você pode acessar:

    URL Base da API: http://localhost:3333/api

    Documentação da API (Scalar): http://localhost:3333/docs

A documentação é interativa e permite que você teste todos os endpoints diretamente pelo navegador. Para endpoints protegidos, use a rota de /login para obter um token JWT e use o botão "Authorize" na UI da documentação para inseri-lo.

## 🗃️ Fluxo de Trabalho com o Banco de Dados (Prisma)

Todas as alterações no schema do banco de dados DEVEM ser feitas através do sistema de migrações do Prisma para manter a consistência.

Para criar uma nova migração após alterar o schema.prisma:

1. Garanta que seu container do banco de dados esteja rodando (pode usar docker-compose up -d desmiojo-db).
2. Execute o comando migrate dev na sua máquina local:
```bash
npx prisma migrate dev --name "nome-descritivo-da-sua-mudanca"
```
  Isso irá gerar um novo arquivo de migração SQL na pasta prisma/migrations.

3. Faça o commit da nova pasta de migração no Git.

**Para rodar o script de seed manualmente (se necessário):**
```bash
npx prisma db seed
```
