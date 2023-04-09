// api/src/router/seed.ts
import { router, protectedProcedure } from "../trpc";
import { PrismaClient } from "@prisma/client";
import seedData from '@my/db/seed/seed_2023-04-09.json';

const prisma = new PrismaClient();

async function deleteAllData() {
  //Delete all data from the tables before seeding
  await prisma.lesson.deleteMany({});
  await prisma.phrasebook.deleteMany({});
  await prisma.lessonPack.deleteMany({});
  await prisma.phrasebookPack.deleteMany({});
}

async function seedLessonsInParallel(lessons) {
  const lessonPromises = lessons.map((lesson) =>
    prisma.lesson.create({ data: lesson })
  );
  const createdLessons = await Promise.all(lessonPromises);
  return createdLessons.map((lesson) => lesson.id);
}

async function seedPhrasebooksInParallel(phrasebooks) {
  const phrasebookPromises = phrasebooks.map((phrasebook) =>
    prisma.phrasebook.create({ data: phrasebook })
  );
  const createdPhrasebooks = await Promise.all(phrasebookPromises);
  return createdPhrasebooks.map((phrasebook) => phrasebook.id);
}

async function seedLessonPacksInParallel(lessonPacks) {
  const lessonPackPromises = lessonPacks.map(async (lessonPack) => {
    const createdLessonPack = await prisma.lessonPack.create({
      data: {
        name: lessonPack.name,
      },
    });

    const addedLessonsToPack = await prisma.lessonPack.update({
      where: { id: createdLessonPack.id },
      data: {
        lessons: {
          connect: lessonPack.lessons.map((lessonId) => ({ id: lessonId })),
        },
      },
    });

    return addedLessonsToPack.id;
  });

  const lessonPackIds = await Promise.all(lessonPackPromises);
  return lessonPackIds;
}

async function seedPhrasebookPacksInParallel(phrasebookPacks) {
  const phrasebookPackPromises = phrasebookPacks.map(async (phrasebookPack) => {
    const createdPhrasebookPack = await prisma.phrasebookPack.create({
      data: {
        name: phrasebookPack.name,
      },
    });

    const addedPhrasebooksToPack = await prisma.phrasebookPack.update({
      where: { id: createdPhrasebookPack.id },
      data: {
        phrasebook: {
          connect: phrasebookPack.phrasebooks.map((phrasebookId) => ({ id: phrasebookId })),
        },
      },
    });

    return addedPhrasebooksToPack.id;
  });

  const phrasebookPackIds = await Promise.all(phrasebookPackPromises);
  return phrasebookPackIds;
}

async function seedDatabase(action) {
  switch (action) {
    case "deleteAllData":
        await deleteAllData();
      break;
    case "seedLessons":
      await prisma.$connect();
        const lessons = seedData.lessons;
        const lessonPacks = seedData.lessonPacks;
        await seedLessonsInParallel(lessons);
        await seedLessonPacksInParallel(lessonPacks);
      await prisma.$disconnect();
      break;
    case "seedPhrasebooks":
      await prisma.$connect();
        const phrasebooks = seedData.phrasebooks;
        const phrasebookPacks = seedData.phrasebookPacks;
        await seedPhrasebooksInParallel(phrasebooks);
        await seedPhrasebookPacksInParallel(phrasebookPacks);
      await prisma.$disconnect();
      break;
    default:
      throw new Error(`Invalid action: ${action}`);
  }
}

export const seedRouter = router({
  deleteAllData: protectedProcedure.mutation(async () => {
    try {
      await seedDatabase("deleteAllData");
      return "All data deleted";
    } catch (error) {
      console.log("Error while deleting data:", error);
      return `Error while deleting data: ${error.message}`;
    }
  }),
  seedLessons: protectedProcedure.mutation(async () => {
    try {
      await seedDatabase("seedLessons");
      return "Lessons seeded successfully";
    } catch (error) {
      console.log("Error while seeding lessons:", error);
      return `Error while seeding lessons: ${error.message}`;
    }
  }),
  seedPhrasebooks: protectedProcedure.mutation(async () => {
    try {
      await seedDatabase("seedPhrasebooks");
      return "Phrasebooks seeded successfully";
    } catch (error) {
      console.log("Error while seeding phrasebooks:", error);
      return `Error while seeding phrasebooks: ${error.message}`;
    }
  }),
});