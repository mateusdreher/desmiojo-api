\set ON_ERROR_STOP on

CREATE SCHEMA IF NOT EXISTS desmiojo;
SET search_path TO desmiojo;

CREATE TYPE "RecipeStatus" AS ENUM ('draft', 'published');

CREATE TABLE "users" (
    "id" UUID PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "login" VARCHAR(255) NOT NULL UNIQUE,
    "password" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE "categories" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE "recipes" (
    "id" UUID PRIMARY KEY,
    "title" VARCHAR(255) NOT NULL,
    "category_id" INTEGER,
    "author_id" UUID NOT NULL,
    "preparation_time_minutes" INTEGER NOT NULL,
    "servings" INTEGER NOT NULL,
    "preparation_method" TEXT NOT NULL,
    "ingredients" TEXT, -- Para um MVP, armazenar como texto/JSON é aceitável
    "status" "RecipeStatus" NOT NULL DEFAULT 'draft',
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_author FOREIGN KEY("author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_category FOREIGN KEY("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE
);


INSERT INTO categories (name) VALUES
  ('Bolos e tortas doces'),
  ('Carnes'),
  ('Aves'),
  ('Peixes e frutos do mar'),
  ('Saladas, molhos e acompanhamentos'),
  ('Sopas'),
  ('Massas'),
  ('Bebidas'),
  ('Doces e sobremesas'),
  ('Lanches'),
  ('Prato Único'),
  ('Light'),
  ('Alimentação Saudável');

\echo 'Banco de dados e tabelas criados com sucesso. Categorias inseridas.'
