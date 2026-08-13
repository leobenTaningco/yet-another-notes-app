import { Request, Response } from "express";
import { createTodo } from "../services/todo.service.ts";
import { createTodoSchema } from "../schemas/todo.schema.ts"

export function createTodoController(req: Request, res: Response) {
    const result = createTodoSchema.safeParse(req.body);

    if (!result.success){
        return res.status(400).json({
            error: result.error.issues,
        })
    }
    
    const todo = createTodo(String(result.data.title), String(result.data.bodyNote || ""));

    res.status(201).json(todo);
}