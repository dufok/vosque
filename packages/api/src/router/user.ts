/* create user */
//grab the images for the corresponding user
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
});

//question: can we get the id from ctx instead of input?
//or will there be no ctx yet because the user is not created yet?
//answer: no, ctx is not available yet because the user is not created yet
