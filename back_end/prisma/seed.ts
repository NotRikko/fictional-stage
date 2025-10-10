import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🧹 Clearing existing data...");
  await prisma.vote.deleteMany();
  await prisma.song.deleteMany();
  await prisma.character.deleteMany();
  await prisma.round.deleteMany();

  console.log("🌱 Inserting bootstrap data...");

  const round = await prisma.round.create({
    data: {
      name: "Round 1",
      description: "Mizi vs Sua",
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  const character1 = await prisma.character.create({
    data: {
      name: "Mizi",
      imageUrl: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000d72c4fdf9ab402ebeaf911cd1b25",
      biography: "Mizi",
      series: "Alien Stage",
      roundId: round.id,
    },
  });

  const character2 = await prisma.character.create({
    data: {
      name: "Sua",
      imageUrl: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da847fb4bcf9d748b52513d8e7d7",
      biography: "Sua",
      series: "Alien Stage",
      roundId: round.id,
    },
  });

  await prisma.song.create({
    data: {
      title: "Clemantis",
      characterId: character1.id,
    },
  });

  await prisma.song.create({
    data: {
      title: "Karma",
      characterId: character2.id,
    },
  });

  await prisma.user.create({
    data: {
      displayName: "Test",
      userName: "Test",
      password: "Test123",
    }
  })

  console.log("✅ Bootstrap data loaded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });