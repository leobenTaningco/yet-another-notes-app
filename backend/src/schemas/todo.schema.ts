import { z } from "zod";

export const createTodoSchema = z.object({
    title: z.string().min(1),
    bodyNote: z.union([z.string().nullable(), z.number().nullable()]),
});

export const getTodoByIdSchema = z.object({
    id: z.coerce.number().int().positive()
});