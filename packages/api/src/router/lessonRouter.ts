import { router, publicProcedure, protectedProcedure } from '../trpc'
import { z } from 'zod'

interface LessonPackInput {
  name: string;
  lessons: {
    name: string;
    content: {
      type: string;
      data: Record<string, unknown>;
    };
  }[];
}

export const lessonRouter = router({
  createLessonPack: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        lessons: z.array(z.object({
          name: z.string(),
          content: z.object({
            type: z.string(),
            data: z.object({}),
          }),
        })),
      }))
      .mutation(({ ctx, input }: { ctx: any; input: LessonPackInput }) => {
        const { name, lessons } = input;

      return ctx.prisma.lessonPack.create({
        data: {
          name,
          lessons: {
            create: lessons.map(lesson => ({
              name: lesson.name,
              content: lesson.content,
            }))
          },
        },
      });
    }),
})
