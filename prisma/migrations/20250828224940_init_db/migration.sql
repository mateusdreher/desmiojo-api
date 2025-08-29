-- CreateEnum
CREATE TYPE "desmiojo"."RecipeStatus" AS ENUM ('draft', 'published');

-- CreateTable
CREATE TABLE "desmiojo"."users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "desmiojo"."recipes" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "preparation_time_minutes" INTEGER NOT NULL,
    "servings" INTEGER NOT NULL,
    "preparation_method" TEXT NOT NULL,
    "ingredients" TEXT NOT NULL,
    "status" "desmiojo"."RecipeStatus" NOT NULL DEFAULT 'draft',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "author_id" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "recipes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "desmiojo"."categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_login_key" ON "desmiojo"."users"("login");

-- AddForeignKey
ALTER TABLE "desmiojo"."recipes" ADD CONSTRAINT "recipes_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "desmiojo"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "desmiojo"."recipes" ADD CONSTRAINT "recipes_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "desmiojo"."categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
