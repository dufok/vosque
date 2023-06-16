import { PrismaClient, Prisma } from "@prisma/client";
import seedData from './seed.json';

const prisma = new PrismaClient();

async function main() {
  
  // Update Lesson data
  for (const lesson of seedData.lessons) {
    const lessonData: Prisma.LessonUpdateInput = {
      name: lesson.name,
      content: lesson.content,
    };
    
    await prisma.lesson.update({
      where: { id: lesson.id },
      data: lessonData,
    });
  }

  // Update Phrasebook data
  for (const phrasebook of seedData.phrasebooks) {
    const phrasebookData: Prisma.PhrasebookUpdateInput = {
      name: phrasebook.name,
      content: phrasebook.content,
    };

    await prisma.phrasebook.update({
      where: { id: phrasebook.id },
      data: phrasebookData,
    });
  }

}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
