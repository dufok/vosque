// api/src/router/seed.ts
import { router, protectedProcedure } from "../trpc";
import { PrismaClient } from "@prisma/client";
import seedData from '@my/db/seed/seed_2023-04-09.json';

const prisma = new PrismaClient();

async function seedDatabase() {
  
  //Delete all data from the tables before seeding
  await prisma.lesson.deleteMany({});
  await prisma.phrasebook.deleteMany({});
  await prisma.lessonPack.deleteMany({});
  await prisma.phrasebookPack.deleteMany({});
  

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

    for (const lessonId of lessonPack.lessons) {
      const lesson = lessonsById[lessonId];
      if (!lesson) {
        console.warn(`Lesson with ID ${lessonId} not found. Skipping...`);
        continue;
      }
      await prisma.lesson.create({
        data: {
          name: lesson.name,
          content: lesson.content,
          lessonPackId: createdLessonPack.id,
        },
      });
    }
  }

  for (const phrasebookPack of seedData.phrasebookPacks) {
    const createdPhrasebookPack = await prisma.phrasebookPack.create({
      data: {
        name: phrasebookPack.name,
      },
    });

    for (const phrasebookId of phrasebookPack.phrasebooks) {
      const phrasebook = phrasebooksById[phrasebookId];
      if (!phrasebook) {
        console.warn(`Phrasebook with ID ${phrasebookId} not found. Skipping...`);
        continue;
      }
      await prisma.phrasebook.create({
        data: {
          name: phrasebook.name,
          content: phrasebook.content,
          phrasebookPackId: createdPhrasebookPack.id,
        },
      });
    }
  }
}

export const seedRouter = router({
  seed: protectedProcedure.mutation(async () => {
    try {
      await seedDatabase();
      return "Database seeded successfully";
    } catch (error) {
      console.log("Error while seeding:", error);
      return `Error while seeding: ${error.message}`;
    }
  }),
});
