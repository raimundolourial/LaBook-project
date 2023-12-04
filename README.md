# LaBook-project

<h1 align="center">Labook-Backend</h1>

<div align="center">



Clique [**AQUI**](https://documenter.getpostman.com/view/28338994/2s9YeK5VtS) para conferir o resultado final da API!

<p align="center">
<br>
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=nodejs,typescript,express,mysql,sqlite,postman," style="height: 25px;"/>
  </a>
</p>
<p align="center"><strong>Status do Projeto:<br></strong>Concluído ✔</p>

</div>

## Índice

- [LaBook-project](#labook-project)
  - [Índice](#índice)
  - [1. Resumo do Projeto](#1-resumo-do-projeto)
  - [2. Instalação](#2-instalação)
    - [Pré-requisitos:](#pré-requisitos)
    - [Instalações necessárias:](#instalações-necessárias)
  - [3. Inicialização](#3-inicialização)
  - [4. Banco de dados](#4-banco-de-dados)
  - [5. Ferramentas e Tecnologias Utilizadas](#5-ferramentas-e-tecnologias-utilizadas)
  - [6. Endpoints](#6-endpoints)
    - [`Signup`](#signup)
    - [`Login`](#login)
    - [`Create post`](#create-post)
    - [`Get posts`](#get-posts)
    - [`Edit post`](#edit-post)
    - [`Delete post`](#delete-post)
    - [`Like or dislike post`](#like-or-dislike-post)
  - [7. Lista de requisitos do Projeto](#7-lista-de-requisitos-do-projeto)
  - [9. Desenvolvedora](#9-desenvolvedora)

## 1. Resumo do Projeto

[🔼](#índice)

O **LaBook-Backend** é uma rede social com o objetivo de promover a conexão e interação entre pessoas. Quem se cadastrar no aplicativo poderá criar e curtir publicações. [documentação](https://documenter.getpostman.com/view/28338994/2s9YeK5VtS)  no Postman.

## 2. Instalação

[🔼](#índice)

### Pré-requisitos:

Ter instalado o `node.js` e o `npm` .

### Instalações necessárias:

```bash
npm install
```

## 3. Inicialização

[🔼](#índice)

Para rodar o servidor localmente digite o seguinte comando:

```bash
npm run dev
```

## 4. Banco de dados

[🔼](#índice)

A modelagem do banco de dados segue a tabela a seguir: <br>
![Alt text](https://dbdiagram.io/d/63d16443296d97641d7c1ae1)

## 5. Ferramentas e Tecnologias Utilizadas

[🔼](#índice)


-   **SQL**
-   **SQLite**
-   **Knex**
-   **Postman**
-   **NodeJs**
-   **Typescript**
-   **Express**



## 6. Endpoints

[🔼](#índice)


### `Signup`

[🔼](#índice)

-   **Método HTTP:** POST
-   **Descrição:** Cadastra um novo Usuário.
-   **Exemplo:**

    ```json
    // request POST /users/signup
    // body JSON
    
    
    [
        {
         "name": "Beltrana",
         "email": "beltrana@email.com",
         "password": "beltrana00"
        }

        // Response
        // status 201 CREATED
        {
            "message": "Cadastro realizado com sucesso",
            "token": "um token jwt"
        }
    ]
    ```


---

### `Login`

[🔼](#índice)

-   **Método HTTP:** POST
-   **Descrição:** Endpoint público utilizado para login. Devolve um token jwt..
-   **Exemplo:**

    ```json
   // request POST /users/login
    // body JSON
    {
    "email": "beltrana@email.com",
     "password": "beltrana00"
    }

    // response
    // status 200 OK    
    {
    "token": "um token jwt"
    }
    ```


---

### `Create post`

[🔼](#índice)

-   **Método HTTP:** POST
-   **Descrição:** Endpoint protegido, requer um token jwt para acessá-lo. Cria um novo Post
-   **Exemplo:**

    ```json
   // request POST /posts
    // headers.authorization = "token jwt"
    // body JSON
    {
        "content": "Partiu happy hour!"
    }

    // response
    // status 201 CREATED
    ```


---

### `Get posts`

[🔼](#índice)

-   **Método HTTP:** GET
-   **Descrição:** Endpoint protegido, requer um token jwt para acessá-lo. Retorna todos os posts feitos
-   **Exemplo:** 

    ```json
    // request GET /posts
    // headers.authorization = "token jwt"

    // response
    // status 200 OK
    [
        {
            "id": "uma uuid v4",
            "content": "Hoje vou estudar POO!",
            "likes": 2,
            "dislikes" 1,
            "createdAt": "2023-01-20T12:11:47:000Z"
            "updatedAt": "2023-01-20T12:11:47:000Z"
            "creator": {
                "id": "uma uuid v4",
                "name": "Fulano"
            }
        },
        {
            "id": "uma uuid v4",
            "content": "kkkkkkkkkrying",
            "likes": 0,
            "dislikes" 0,
            "createdAt": "2023-01-20T15:41:12:000Z"
            "updatedAt": "2023-01-20T15:49:55:000Z"
            "creator": {
                "id": "uma uuid v4",
                "name": "Ciclana"
            }
        }
    ]
    ```

---

### `Edit post`

[🔼](#índice)

-   **Método HTTP:** PUT
-   **Descrição:** Endpoint protegido, requer um token jwt para acessá-lo.Só quem criou o post pode editá-lo e somente o conteúdo pode ser editado.
-   **Exemplo:**

    ```json
    // request PUT /posts/:id
    // headers.authorization = "token jwt"
    // body JSON
    {
        "content": "Partiu happy hour lá no point de sempre!"
    }

    // response
    // status 200 OK
    ```

---

### `Delete post`

[🔼](#índice)

-   **Método HTTP:** DELETE
-   **Descrição:** Endpoint protegido, requer um token jwt para acessá-lo. Só quem criou o post pode deletá-lo. Admins podem deletar o post de qualquer pessoa.

-   **Exemplo:**

    ```json
        // request DELETE /posts/:id
    // headers.authorization = "token jwt"

    // response
    // status 200 OK
    ```

---

### `Like or dislike post`

[🔼](#índice)

-   **Método HTTP:** PUT
-   **Descrição:** Endpoint protegido, requer um token jwt para acessá-lo. Quem criou o post não pode dar like ou dislike no mesmo.
-   **Exemplo:**

    ```json
        // request PUT /posts/:id/like
        // headers.authorization = "token jwt"
        // body JSON
    {
        "like": true
    }

    // response
    // status 200 OK
    ```

---



## 7. Lista de requisitos do Projeto

[🔼](#índice)

-   [ ✔ ] Documentação Postman de todos os endpoints (obrigatória para correção)

  
-   [ ✔ ] Endpoints :

    -   [ ✔ ] Signup
    -   [ ✔ ] login
    -   [ ✔ ] create post
    -   [ ✔ ] get posts
    -   [ ✔ ] edit post
    -   [ ✔ ] delete post
    -   [ ✔ ] like / dislike post

-   [ ✔ ] Autenticação e autorização

    -   [ ✔ ] identificação UUID
    -   [ ✔ ] senhas hasheadas com Bcrypt
    -   [ ✔ ] tokens JWT

-   [ ✔ ] Código
    -   [ ✔ ] POO
    -   [ ✔ ] Arquitetura em camadas
    -   [ ✔ ] Roteadores no Express

-   [ ✔ ] Criar o arquivo README.md 

## 9. Desenvolvedora

[🔼](#índice)

Este projeto foi desenvolvido por:

**Raimundo Junior** 
