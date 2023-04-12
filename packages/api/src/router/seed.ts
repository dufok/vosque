// api/src/router/seed.ts
import { router, protectedProcedure } from "../trpc";
import { PrismaClient } from "@prisma/client";
import seedData from '@my/db/seed/example.seed.json';

const prisma = new PrismaClient();

async function seedDatabase() {
  // Seed Lesson data
  const lessonsMap = new Map<number, any>();
  for (const lesson of seedData.lessons) {
    const createdLesson = await prisma.lesson.create({
      data: {
        name: lesson.name,
        content: lesson.content,
      },
    });
    lessonsMap.set(lesson.id, createdLesson);
  }

  // Seed LessonPack data and relations
  for (const lessonPack of seedData.lessonPacks) {
    const createdLessonPack = await prisma.lessonPack.create({
      data: {
        lessonId: lessonId,
        lessonPackId: lessonPackId,
      },
    });
  }

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
  

  const phrasebooksMap = new Map<number, any>();
  for (const phrasebook of seedData.phrasebooks) {
    const createdPhrasebook = await prisma.phrasebook.create({
      data: {
        name: phrasebook.name,
        content: phrasebook.content,
      },
    });
    phrasebooksMap.set(phrasebook.id, createdPhrasebook);
  }

  // Seed phrasebookPack data and relations
  const createdPhrasebookPack = await prisma.phrasebookPack.create({
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
