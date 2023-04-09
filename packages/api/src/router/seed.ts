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

async function seedDataInParallel(lessonPack, lessonsById, phrasebookPack, phrasebooksById) {
  const lessonPromises = lessonPack.lessons.map(async (lessonId) => {
    const lesson = lessonsById[lessonId];
    if (!lesson) {
      console.warn(`Lesson with ID ${lessonId} not found. Skipping...`);
      return;
    }
    return prisma.lesson.create({
      data: {
        name: lesson.name,
        content: lesson.content,
        lessonPackId: lessonPack.id,
      },
    });
  });

  const phrasebookPromises = phrasebookPack.phrasebooks.map(async (phrasebookId) => {
    const phrasebook = phrasebooksById[phrasebookId];
    if (!phrasebook) {
      console.warn(`Phrasebook with ID ${phrasebookId} not found. Skipping...`);
      return;
    }
    return prisma.phrasebook.create({
      data: {
        name: phrasebook.name,
        content: phrasebook.content,
        phrasebookPackId: phrasebookPack.id,
      },
    });
  });

  await Promise.all([...lessonPromises, ...phrasebookPromises]);
}

async function seedDatabase() {
  await deleteAllData();

  const lessonsById = Object.fromEntries(
    seedData.lessons.map((lesson) => [lesson.id, lesson])
  );

  const phrasebooksById = Object.fromEntries(
    seedData.phrasebooks.map((phrasebook) => [phrasebook.id, phrasebook])
  );

  for (const lessonPack of seedData.lessonPacks) {
    const createdLessonPack = await prisma.lessonPack.create({
      data: {
        name: lessonPack.name,
      },
    });

    for (const phrasebookPack of seedData.phrasebookPacks) {
      const createdPhrasebookPack = await prisma.phrasebookPack.create({
        data: {
          name: phrasebookPack.name,
        },
      });

      await seedDataInParallel(createdLessonPack, lessonsById, createdPhrasebookPack, phrasebooksById);
    }
  }
}


export const seedRouter = router({
  seed: protectedProcedure.mutation(async () => {
      await seedDatabase();
  }),
});
