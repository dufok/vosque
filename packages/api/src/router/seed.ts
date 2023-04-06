// api/src/router/seed.ts
import { router, protectedProcedure } from "../trpc";
import { PrismaClient } from "@prisma/client";
import seedData from '@my/db/seed/seed.json';

const prisma = new PrismaClient();

async function seedDatabase() {
  for (const lessonPack of seedData.lessonPacks) {
    const createdLessonPack = await prisma.lessonPack.create({
      data: {
        name: lessonPack.name,
      },
    });

    for (const lesson of lessonPack.lessons) {
      await prisma.lesson.create({
        data: {
          name: lesson.name,
          content: lesson.content,
          lessonPackId: createdLessonPack.id,
        },
      });
    }
  }

  for (const phrasebook of seedData.phrasebooks) {
    await prisma.phrasebook.create({
      data: {
        name: phrasebook.name,
        content: phrasebook.content,
      },
    });
  }
}

export const seedRouter = router({
  seed: protectedProcedure.mutation(async () => {
    await seedDatabase();
    return "Database seeded successfully";
  }),
});
