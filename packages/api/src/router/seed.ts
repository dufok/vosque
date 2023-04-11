// api/src/router/seed.ts
import { router, protectedProcedure } from "../trpc";
import { PrismaClient } from "@prisma/client";
import seedData from '@my/db/seed/seed_exemple.json';

const prisma = new PrismaClient();

async function upsertLessonPackLesson(lessonPackId: number, lessonId: number) {
  const existingRelation = await prisma.lessonPackLesson.findUnique({
    where: {
      lessonId_lessonPackId: {
        lessonId: lessonId,
        lessonPackId: lessonPackId,
      },
    },
  });

  if (!existingRelation) {
    await prisma.lessonPackLesson.create({
      data: {
        lessonId: lessonId,
        lessonPackId: lessonPackId,
      },
    });
  }
}

async function upsertPhrasebookPackPhrasebook(phrasebookPackId: number, phrasebookId: number) {
  const existingRelation = await prisma.phrasebookPackPhrasebook.findUnique({
    where: {
      phrasebookId_phrasebookPackId: {
        phrasebookId: phrasebookId,
        phrasebookPackId: phrasebookPackId,
      },
    },
  });

  if (!existingRelation) {
    await prisma.phrasebookPackPhrasebook.create({
      data: {
        phrasebookId: phrasebookId,
        phrasebookPackId: phrasebookPackId,
      },
    });
  }
}

async function seedDatabase() {
  
  const lessonsById = Object.fromEntries(
    seedData.lessons.map((lesson) => [lesson.id, lesson])
  );

  const phrasebooksById = Object.fromEntries(
    seedData.phrasebooks.map((phrasebook) => [phrasebook.id, phrasebook])
  );

  for (const lessonPack of seedData.lessonPacks) {
    const existingLessonPack = await prisma.lessonPack.findUnique({
      where: {
        name: lessonPack.name,
      },
    });
    
    if (existingLessonPack) {
      console.log(`LessonPack with name "${lessonPack.name}" already exists. Skipping...`);
      
      const updatedLessonPack = await prisma.lessonPack.update({
        where: {
          id: existingLessonPack.id,
        },
        data: {
          name: lessonPack.name, // update the name if necessary
        },
      });

      for (const lessonId of lessonPack.lessons) {
        
        const lesson = lessonsById[lessonId];
        if (!lesson) {
          console.warn(`Lesson with ID ${lessonId} not found. Skipping...`);
          continue;
        }

        const existingLesson = await prisma.lesson.findUnique({
          where: {
            name: lesson.name,
          },
        });

        if (existingLesson) {
          console.log(`Lesson with name "${lesson.name}" and content "${lesson.content}" already exists in lessonPack "${updatedLessonPack.name}". Skipping...`);
          continue;
        }

        await upsertLessonPackLesson(updatedLessonPack.id, lessonId);

      }
    } else
    {
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

        const existingLesson = await prisma.lesson.findUnique({
          where: {
            name: lesson.name,
          },
        });

        if (existingLesson) {
          console.log(`Lesson with name "${lesson.name}" and content "${lesson.content}" already exists in lessonPack "${createdLessonPack.name}". Skipping...`);
          continue;
        }

        await upsertLessonPackLesson(createdLessonPack.id, lessonId);
      }
    }
  }

  for (const phrasebookPack of seedData.phrasebookPacks) {
    const existingPhrasebookPack = await prisma.phrasebookPack.findUnique({
      where: {
        name: phrasebookPack.name,
      },
    });

    if (existingPhrasebookPack) {
      console.log(`PhrasebookPack with name "${phrasebookPack.name}" already exists. Skipping...`);
      continue;
    }

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

      const existingPhrasebook = await prisma.phrasebook.findUnique({
        where: {
          name: phrasebook.name,
        },
      });

      if (existingPhrasebook) {
        console.log(`Phrasebook with name "${phrasebook.name}" and content "${phrasebook.content}" already exists in phrasebookPack "${createdPhrasebookPack.name}". Skipping...`);
        continue;
      }

      await upsertPhrasebookPackPhrasebook(createdPhrasebookPack.id, phrasebookId);
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
