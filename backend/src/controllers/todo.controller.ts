import { Request, Response } from "express";
import { createTodo, deleteTodoById } from "../services/todo.service";
import { createTodoSchema, getTodoByIdSchema } from "../schemas/todo.schema"
import { todos } from "../repositories/data.todos"

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

export function deleteTodoByIdController(req: Request, res: Response) {
    const result = getTodoByIdSchema.safeParse(req.params);

    const todo = deleteTodoById(Number(result));

    if(!todos){
        return res.status(404).json({
            message: "Todo not found"
        })
    }

    return res.status(200).json(todo);
    
}

export function getAllTodoController(req: Request, res: Response) {
    if(!todos){
        return res.status(404).json({
            message: "No Todo found"
        })
    }
    res.status(200).json(todos);
}

export function getTodoByIdController(req: Request, res: Response){
    const result = getTodoByIdSchema.safeParse(req.params);
    
    const todo = todos[Number(result)]

    if (!todo) {
        return res.status(404).json({
            message: "Todo not found"
        })
    }
    
    res.status(200).json(todo);
}