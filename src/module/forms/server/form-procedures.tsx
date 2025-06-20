import { eq } from "drizzle-orm";

import { db } from "@dentist/db";
import { form } from "@dentist/db/schema";
import { createTRPCRouter, protectedAuthProcedure } from "@dentist/trpc/init";

import { getOneSchema } from "../schemas";

export const formRouter = createTRPCRouter({
  getMany: protectedAuthProcedure.query(async () => {
    const [forms] = await db
      .select()
      .from(form);

    return [forms];
  }),
  getOne: protectedAuthProcedure.input(getOneSchema).query(async ({ input }) => {
    const [dataForm] = await db.select().from(form).where(eq(form.id, input.id));

    return dataForm;
  }),
  create: protectedAuthProcedure.mutation(() => "Hello world create"),
  update: protectedAuthProcedure.mutation(() => "Hello world update"),
  changeStatus: protectedAuthProcedure.mutation(() => "Hello world changeStatus")
});
