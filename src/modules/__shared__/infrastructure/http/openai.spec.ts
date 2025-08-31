// FILE: src/infrastructure/http/openapi.spec.ts

// Importa os fragmentos da especificação
import tags from "./openapi/tags.json";
import userSchemas from "./openapi/components/schemas/users.schemas.json";
import recipeSchemas from "./openapi/components/schemas/recipes.schemas.json";
import errorSchemas from "./openapi/components/schemas/errors.schemas.json";
import securityComponents from "./openapi/components/security.components.json";
import userPaths from "./openapi/paths/users.paths.json";
import recipePaths from "./openapi/paths/recipes.paths.json";

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
      url: "/api", // Mantive o prefixo /api como sugerido anteriormente
    },
  ],
  // Compõe as seções a partir dos arquivos importados
  tags: tags,
  components: {
    schemas: {
      ...userSchemas,
      ...recipeSchemas,
      ...errorSchemas,
    },
    securitySchemes: securityComponents,
  },
  paths: {
    ...userPaths,
    ...recipePaths,
  },
};
