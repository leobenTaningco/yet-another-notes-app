import { z } from "zod";

export const createTodoSchema = z.object({
    title: z.string().min(1),
    bodyNote: z.union([z.string().nullable(), z.number().nullable()]),
});