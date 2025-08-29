export const openapiSpecification = {
  openapi: "3.0.0",
  info: {
    title: "Desmiojo API",
    version: "1.0.0",
    description:
      "API para o aplicativo de receitas número 1 de quem quer deixar o miojo de lado.",
  },
  servers: [
    {
      url: "/",
    },
  ],
  tags: [
    {
      name: "Autenticação",
      description: "Endpoints para login e gerenciamento de sessão.",
    },
    {
      name: "Usuários",
      description: "Endpoints para operações relacionadas a usuários.",
    },
    {
      name: "Receitas",
      description: "Endpoints para criar, listar e gerenciar receitas.",
    },
  ],
  components: {
    schemas: {
      LoginInput: {
        type: "object",
        required: ["login", "password"],
        properties: {
          login: {
            type: "string",
            format: "email",
            example: "john.doe@email.com",
          },
          password: {
            type: "string",
            example: "Password123",
          },
        },
      },
      LoginOutput: {
        type: "object",
        properties: {
          token: { type: "string" },
          refreshToken: { type: "string" },
        },
      },
      UserOutput: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          name: { type: "string" },
          email: { type: "string", format: "email" },
        },
      },
      Ingredient: {
        type: "object",
        properties: {
          name: { type: "string", example: "Farinha de trigo" },
          quantity: { type: "string", example: "2 xícaras" },
        },
      },
      CreateRecipeInput: {
        type: "object",
        required: ["title", "description", "ingredients"],
        properties: {
          title: { type: "string", example: "Bolo de Chocolate" },
          description: {
            type: "string",
            example: "Um bolo de chocolate fofinho e delicioso.",
          },
          ingredients: {
            type: "array",
            items: { $ref: "#/components/schemas/Ingredient" },
          },
        },
      },
      RecipeOutput: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          authorId: { type: "string", format: "uuid" },
          title: { type: "string" },
          description: { type: "string" },
          ingredients: {
            type: "array",
            items: { $ref: "#/components/schemas/Ingredient" },
          },
          status: {
            type: "string",
            enum: ["draft", "published"],
            example: "draft",
          },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      DeleteRecipeInput: {
        type: "object",
        required: ["recipeId"],
        properties: {
          recipeId: {
            type: "string",
            format: "uuid",
            description: "ID da receita a ser deletada.",
          },
        },
      },
      PublishRecipeInput: {
        type: "object",
        required: ["recipeId"],
        properties: {
          recipeId: {
            type: "string",
            format: "uuid",
            description: "ID da receita a ser publicada.",
          },
        },
      },
      ErrorOutput: {
        type: "object",
        properties: {
          name: { type: "string" },
          message: { type: "string" },
        },
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  paths: {
    "/users/login": {
      post: {
        tags: ["Autenticação"],
        summary: "Autentica um usuário e retorna um token JWT.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LoginInput",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Autenticação bem-sucedida.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/LoginOutput",
                },
              },
            },
          },
          "401": {
            description: "Credenciais inválidas.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorOutput",
                },
              },
            },
          },
        },
      },
    },
    "/recipes": {
      post: {
        tags: ["Receitas"],
        summary: "Cria uma nova receita.",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateRecipeInput" },
            },
          },
        },
        responses: {
          "201": {
            description: "Receita criada com sucesso.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/RecipeOutput" },
              },
            },
          },
          "400": {
            description: "Dados inválidos.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorOutput" },
              },
            },
          },
          "401": {
            description: "Não autorizado.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorOutput" },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Receitas"],
        summary: "Deleta uma receita existente.",
        description: "Apenas o autor da receita pode deletá-la.",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/DeleteRecipeInput" },
            },
          },
        },
        responses: {
          "204": { description: "Receita deletada com sucesso." },
          "401": {
            description: "Não autorizado.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorOutput" },
              },
            },
          },
          "403": {
            description: "Acesso proibido (usuário não é o autor).",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorOutput" },
              },
            },
          },
          "404": {
            description: "Receita não encontrada.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorOutput" },
              },
            },
          },
        },
      },
    },
    "/recipes/author": {
      get: {
        tags: ["Receitas"],
        summary: "Lista as receitas de um autor específico.",
        parameters: [
          {
            name: "authorId",
            in: "query",
            required: true,
            description: "O ID do autor para buscar as receitas.",
            schema: { type: "string", format: "uuid" },
          },
        ],
        responses: {
          "200": {
            description: "Uma lista de receitas.",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/RecipeOutput" },
                },
              },
            },
          },
        },
      },
    },
    "/recipes/publish": {
      post: {
        tags: ["Receitas"],
        summary: "Publica uma receita que está em rascunho.",
        description:
          'Muda o status de uma receita de "draft" para "published". Apenas o autor pode fazer isso.',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/PublishRecipeInput" },
            },
          },
        },
        responses: {
          "200": {
            description: "Receita publicada com sucesso.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/RecipeOutput" },
              },
            },
          },
          "401": {
            description: "Não autorizado.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorOutput" },
              },
            },
          },
          "403": {
            description: "Acesso proibido (usuário não é o autor).",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorOutput" },
              },
            },
          },
          "404": {
            description: "Receita não encontrada.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorOutput" },
              },
            },
          },
          "409": {
            description: "Conflito (ex: receita já está publicada).",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorOutput" },
              },
            },
          },
        },
      },
    },
  },
};
