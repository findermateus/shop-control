# Shop Control
O Shop Control é um sistema de gestão comercial desenvolvido para facilitar o controle de produtos, estoques, preços, clientes e pedidos.
Seu objetivo é centralizar as operações de uma loja em um único ambiente, permitindo uma administração mais eficiente e organizada.

# Modelos

https://app.eraser.io/workspace/87qqIlFRlymQq7XefaMo

# WireFrame

https://www.figma.com/design/fOYjeERDhn5g6cn7mCciiW/E-commerce?node-id=0-1&p=f

# Padrões de Desenvolvimento

- [Conventional Commits](./docs/patterns/conventional-commits.md)
- [Pull Requests](./docs/patterns/pull-requests.md)

# Releases

- [Releases](./docs/releases.md)

# Arquitetura

- [Architecture](./docs/architecture.md)

# Requisitos

- [Requirements](./docs/requirements.md)

# Modelagem

- [Modeling](./docs/modeling.md)

# Guia de Instalação e Configuração do Projeto

Este guia detalha os passos necessários para configurar e executar o ambiente de desenvolvimento localmente, incluindo o backend e o frontend da aplicação.

## Pré-requisitos

Antes de começar, garanta que você tenha as seguintes ferramentas instaladas em sua máquina:
* [Docker](https://www.docker.com/get-started) e [Docker Compose](https://docs.docker.com/compose/install/)
* [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
* [NPM](https://www.npmjs.com/)

---

## Configurando o Backend (Server)

O backend é uma aplicação Laravel que roda em contêineres Docker.

1.  **Navegue até o diretório do servidor:**
    ```bash
    cd server
    ```
2.  **Configure as variáveis de ambiente:**
    Copie o arquivo de exemplo `.env.example` para um novo arquivo chamado `.env`.
    ```bash
    cp .env.example .env
    ```
    Em seguida, abra o arquivo `.env` e ajuste as configurações do banco de dados conforme necessário.
    ```env
    DB_CONNECTION=mysql
    DB_HOST=db
    DB_PORT=3306
    DB_DATABASE=e_commerce
    DB_USERNAME=application
    DB_PASSWORD=password # Senha da aplicação
    DB_ROOT_PASSWORD=sua_senha_root_segura # Senha do root do MySQL
    ```

3.  **Inicie os serviços com Docker Compose:**
    Este comando irá construir as imagens e iniciar os contêineres em segundo plano (`-d`).
    ```bash
    docker-compose up -d --build
    ```

4.  **Execute as migrations do banco de dados:**
    Para criar as tabelas no banco de dados, execute o comando `migrate` do Artisan dentro do contêiner `workspace`.
    ```bash
    docker-compose exec workspace php artisan migrate
    ```

**Pronto!** O servidor da API estará rodando em `http://localhost:8080`.

---

## Configurando o Frontend (Client)

O frontend é uma aplicação Next.js.

1.  **Navegue até o diretório do cliente:**
    ```bash
    cd client
    ```
2.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env.local` na raiz da pasta `client/` e adicione a URL da API.
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:8080/api
    ```

3.  **Instale as dependências do projeto:**
    ```bash
    npm install
    ```

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

**Pronto!** A aplicação frontend estará acessível em `http://localhost:3000`.

---

## Pós-instalação: Criando um Administrador (Manager)

Por padrão, os usuários administradores (`managers`) não podem ser registrados pela interface pública. A criação deve ser feita manualmente no banco de dados.

1.  **Gere um manager padrão:**
    Entre no container 'workspace' e execute o comando artisan
2. ```bash
   php artisan app:generate-default-user
2.  **Realize o login:**
    Após executar o comando, você poderá utilizar o usuário padrão com login 'admin' e senha 'password'.