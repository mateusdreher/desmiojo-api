import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categoriesData = [
  { name: "Bolos e tortas doces" },
  { name: "Carnes" },
  { name: "Aves" },
  { name: "Peixes e frutos do mar" },
  { name: "Saladas, molhos e acompanhamentos" },
  { name: "Sopas" },
  { name: "Massas" },
  { name: "Bebidas" },
  { name: "Doces e sobremesas" },
  { name: "Lanches" },
  { name: "Prato Único" },
  { name: "Light" },
  { name: "Alimentação Saudável" },
];

async function main() {
  console.log(`Start seeding ...`);

  await prisma.category.createMany({
    data: categoriesData,
    skipDuplicates: true,
  });

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
