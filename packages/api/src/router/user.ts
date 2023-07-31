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
  lessonPackBySku: protectedProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const { name } = input;
        return await ctx.prisma.lessonPack.findFirst({ where: { name } });
      } catch (error) {
        console.error(error);
        throw error;
      }
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
  userLessonPacks: protectedProcedure.query(async ({ ctx }) => {
      const userId = ctx.user.id;
      const user = await ctx.prisma.user.findUnique({
        where: { id: userId },
        include: { lessonPacks: true },
      });
      if (!user || !user.lessonPacks || user.lessonPacks.length === 0) {
        return "Пока что нет";
      }
      return user.lessonPacks.map(pack => pack.name);
    }),
  createPayment: protectedProcedure
    .input(
      z.object({
        prepayId: z.string(),
        merchantTradeNo: z.string(),
        code: z.string(),
      })
    )
    .mutation(async({ctx, input}) => {
      const userId = ctx.user.id;
      const { prepayId, merchantTradeNo, code } = input;

      return ctx.prisma.payment.create({
        data: {
          prepayId,
          merchantTradeNo,
          code,
          userId,
        },
      });
    }),
});

//question: can we get the id from ctx instead of input?
//or will there be no ctx yet because the user is not created yet?
//answer: no, ctx is not available yet because the user is not created yet
