// api/src/router/seed.ts
import { router, protectedProcedure } from "../trpc";
import { PrismaClient } from "@prisma/client";
import seedData from '@my/db/seed/example.seed.json';

const prisma = new PrismaClient();

async function seedDatabase() {
  // Seed Lesson data
  const lessonsMap = new Map<number, any>();
  for (const lesson of seedData.lessons) {
    const prismaInstance = new PrismaClient();
    const createdLesson = await prismaInstance.lesson.create({
      data: {
        name: lesson.name,
        content: lesson.content,
      },
    });
    lessonsMap.set(lesson.id, createdLesson);
    await prismaInstance.$disconnect();
  }

  // Seed LessonPack data and relations
  for (const lessonPack of seedData.lessonPacks) {
    const prismaInstance = new PrismaClient();
    const createdLessonPack = await prismaInstance.lessonPack.create({
      data: {
        name: lessonPack.name,
      },
    });

    for (const lessonId of lessonPack.lessons) {
      const lesson = lessonsMap.get(lessonId);

      if (lesson) {
        await prisma.lessonPackLessons.create({
          data: {
            lessonId: lesson.id,
            lessonPackId: createdLessonPack.id,
          },
        });
      }
    }
    await prismaInstance.$disconnect();
  }

  const phrasebooksMap = new Map<number, any>();
  for (const phrasebook of seedData.phrasebooks) {
    const prismaInstance = new PrismaClient();
    const createdPhrasebook = await prismaInstance.phrasebook.create({
      data: {
        name: phrasebook.name,
        content: phrasebook.content,
      },
    });
    phrasebooksMap.set(phrasebook.id, createdPhrasebook);
    await prismaInstance.$disconnect();
  }

  // Seed phrasebookPack data and relations
  for (const phrasebookPack of seedData.phrasebookPacks) {
    const prismaInstance = new PrismaClient();
    const createdPhrasebookPack = await prismaInstance.phrasebookPack.create({
      data: {
        name: phrasebookPack.name,
      },
    });

    for (const phrasebookId of phrasebookPack.phrasebooks) {
      const phrasebook = phrasebooksMap.get(phrasebookId);

      if  (phrasebook) {
        await prisma.phrasebookPackPhrasebook.create({
          data: {
           phrasebookId: phrasebook.id,
            phrasebookPackId: createdPhrasebookPack.id,
          },
        });
      }
    }
    await prismaInstance.$disconnect();
  }
}

export const seedRouter = router({
  seed: protectedProcedure.mutation(async () => {
    await seedDatabase();
    return "Database seeded successfully";
  }),
});
