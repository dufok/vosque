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

async function seedLessonsInParallel(lessonPack, lessonsById) {
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
  await Promise.all([...lessonPromises]);
}

async function seedPhrasebookInParallel(phrasebookPack, phrasebooksById) {
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
  await Promise.all([...phrasebookPromises]);
}

async function seedDatabase(action) {
  switch (action) {
    case "deleteAllData":
      await deleteAllData();
      break;
    case "seedLessons":
      const lessonsById = Object.fromEntries(
        seedData.lessons.map((lesson) => [lesson.id, lesson])
      );
      for (const lessonPack of seedData.lessonPacks) {
        const createdLessonPack = await prisma.lessonPack.create({
          data: {
            name: lessonPack.name,
          },
        });
      await seedLessonsInParallel(createdLessonPack, lessonsById);
      };
      break;
    case "seedPhrasebooks":
      const phrasebooksById = Object.fromEntries(
        seedData.phrasebooks.map((phrasebook) => [phrasebook.id, phrasebook])
      );
      for (const phrasebookPack of seedData.phrasebookPacks) {
        const createdPhrasebookPack = await prisma.phrasebookPack.create({
          data: {
            name: phrasebookPack.name,
          },
        });
      await seedPhrasebookInParallel(createdPhrasebookPack, phrasebooksById);
      };
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