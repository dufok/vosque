/* create user */
//grab the images for the corresponding user
import { Lesson } from "@my/db/index";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const userRouter = router({
  current: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findFirst({ where: { id: ctx.user.id } });
  }),
  create: protectedProcedure
    .input(
      z.object({
        email: z.string(),
        id: z.string(),
        userName: z.string(), // Add the userName field with default value "none"
      })
    )
    .mutation(({ ctx, input }) => {
      //create user and link it to the user
      return ctx.prisma.user.create({
        data: {
          email: input.email,
          id: input.id,
          userName: input.userName, // Add the userName field
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        userName: z.string(), // Add the userName field with default value "none"
      })
    )
    .mutation(async({ ctx, input }) => {
      const { id, userName } = input;
      //update user
      return ctx.prisma.user.update({
        where: { id },
        data: { userName },
      });
    }),
    userLessons: protectedProcedure.query(async ({ ctx }) => {
      const userId = ctx.user.id;
    
      const user = await ctx.prisma.user.findUnique({
        where: { id: userId },
        include: { lessonPacks: true },
      });
    
      if (!user || !user.lessonPacks) {
        return [];
      }
    
      const allLessons: Lesson[] = [];
    
      for (const lessonPack of user.lessonPacks) {
        const lessonPackLessons = await ctx.prisma.lessonPackLessons.findMany({
          where: { lessonPackId: lessonPack.id },
        });
    
        for (const lessonPackLesson of lessonPackLessons) {
          const lesson = await ctx.prisma.lesson.findUnique({
            where: { id: lessonPackLesson.lessonId },
          });
    
          if (lesson) {
            allLessons.push(lesson);
          }
        }
      }
    
      return allLessons;
    }),
  lessonPackByName: protectedProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ ctx, input }) => {
      const { name } = input;
      return ctx.prisma.lessonPack.findFirst({ where: { name } });
    }),
  updateUserLessonPack: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        lessonPackName: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId, lessonPackName } = input;
      const lessonPack = await ctx.prisma.lessonPack.findUnique({ where: { name: lessonPackName } });
  
      if (!lessonPack) {
        throw new Error('LessonPack not found');
      }
  
      return ctx.prisma.user.update({
        where: { id: userId },
        data: { lessonPacks: { connect: { id: lessonPack.id } } },
      });
    }),
});

//question: can we get the id from ctx instead of input?
//or will there be no ctx yet because the user is not created yet?
//answer: no, ctx is not available yet because the user is not created yet
