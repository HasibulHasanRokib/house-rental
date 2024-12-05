const { PrismaClient } = require("@prisma/client");
const { dummyProperties } = require("./placeholderData");
const prisma = new PrismaClient();

async function main() {
  await Promise.all(
    dummyProperties.map(async (property) => {
      await prisma.property.upsert({
        where: {
          slug: property.slug,
        },
        update: property,
        create: property,
      });
    })
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
