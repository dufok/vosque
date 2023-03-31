const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Read data from JSON file
const data = JSON.parse(fs.readFileSync('exampleLessons.json', 'utf-8'));

async function importData() {
    for (const item of data) {
        // Check if the LessonPack exists, if not, create it
        let lessonPack = await prisma.lessonPack.findUnique({ where: { id: item.lessonPackId } });
        if (!lessonPack) {
            lessonPack = await prisma.lessonPack.create({ data: { id: item.lessonPackId, name: `LessonPack${item.lessonPackId}` } });
        }

        // Create the Lesson with the associated LessonPack
        await prisma.lesson.create({
            data: {
                id: item.id,
                name: item.name,
                content: item.content,
                lessonPackId: lessonPack.id,
            },
        });
    }

    console.log('Data imported successfully!');
    prisma.$disconnect();
}

importData().catch((e) => {
    console.error(e);
    process.exit(1);
});