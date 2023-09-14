import { PrismaClient} from "@prisma/client";
import seedData from './seed.json';

const prisma = new PrismaClient();

try {

  async function main() {
    await prisma.lessonPackLessons.deleteMany();
    await prisma.phrasebookPackPhrasebook.deleteMany();
    await prisma.lesson.deleteMany();
    await prisma.phrasebook.deleteMany();
    
    //For lessons
    const lessonsMap = new Map<number, any>();
    for (const lesson of seedData.lessons) {
      const existingLesson = await prisma.lesson.findFirst({ where: { name: lesson.name } });

      if (existingLesson) {
        await prisma.lesson.update({
          where: { id: existingLesson.id },
          data: { content: lesson.content }
        });
        lessonsMap.set(lesson.id, existingLesson);
      } else {
        const createdLesson = await prisma.lesson.create({
          data: {
            name: lesson.name,
            content: lesson.content,
          },
        });
        lessonsMap.set(lesson.id, createdLesson);
      }
    }

    //For phrasebooks
    const phrasebooksMap = new Map<number, any>();
    for (const phrasebook of seedData.phrasebooks) {
      const existingPhrasebook = await prisma.phrasebook.findUnique({ where: { name: phrasebook.name } });

      if (existingPhrasebook) {
        await prisma.phrasebook.update({
          where: { id: existingPhrasebook.id },
          data: { content: phrasebook.content }
        });
        phrasebooksMap.set(phrasebook.id, existingPhrasebook);
      } else {
        const createdPhrasebook = await prisma.phrasebook.create({
          data: {
            name: phrasebook.name,
            content: phrasebook.content,
          },
        });
        phrasebooksMap.set(phrasebook.id, createdPhrasebook);
      }
    }

    //For lessonPackLessons
    for (const lessonPack of seedData.lessonPacks) {
      let currentLessonPack = await prisma.lessonPack.findUnique({
        where: { sku_number: lessonPack.sku_number } });

      if (!currentLessonPack) {
        currentLessonPack = await prisma.lessonPack.create({
          data: {
            sku_number: lessonPack.sku_number,
            name: lessonPack.name,
          },
        });
      }

      for (const lessonId of lessonPack.lessons) {
        let currentLesson = lessonsMap.get(lessonId);

        // Check if this lesson is already linked to the lesson pack
        const existingRelation = await prisma.lessonPackLessons.findUnique({
          where: {
            lessonId_lessonPackId: {
              lessonId: currentLesson.id,
              lessonPackId: currentLessonPack.id,
            },
          },
        });

        // If the relation doesn't exist, create it
        if (!existingRelation) {
          await prisma.lessonPackLessons.create({
            data: {
              lessonId: currentLesson.id,
              lessonPackId: currentLessonPack.id,
            },
          });
        }
      }
    }

    //For phrasebookPackPhrasebook
    for (const phrasebookPack of seedData.phrasebookPacks) {
      let currentPhrasebookPack = await prisma.phrasebookPack.findUnique({
        where: { sku_number: phrasebookPack.sku_number } });

      if (!currentPhrasebookPack) {
        currentPhrasebookPack = await prisma.phrasebookPack.create({
          data: {
            sku_number: phrasebookPack.sku_number,
            name: phrasebookPack.name,
          },
        });
      }

      for (const phrasebookId of phrasebookPack.phrasebooks) {
        let currentPhrasebook = phrasebooksMap.get(phrasebookId);

        // Check if this phrasebook is already linked to the phrasebook pack
        const existingRelation = await prisma.phrasebookPackPhrasebook.findUnique({
          where: {
            phrasebookId_phrasebookPackId: {
              phrasebookId: currentPhrasebook.id,
              phrasebookPackId: currentPhrasebookPack.id,
            },
          },
        });

        // If the relation doesn't exist, create it
        if (!existingRelation) {
          await prisma.phrasebookPackPhrasebook.create({
            data: {
              phrasebookId: currentPhrasebook.id,
              phrasebookPackId: currentPhrasebookPack.id,
            },
          });
        }
      }
    }
  }

  main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })


} catch (error) {
  console.error("Error seeding the database:", error);
}

  
