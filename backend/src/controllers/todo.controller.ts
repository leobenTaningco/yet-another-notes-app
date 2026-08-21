import { Request, Response } from "express";
import * as todoService from "../services/todo.service";

export async function createTodoController(req: Request, res: Response) {
    try {
        const { userId, title, bodyNote } = req.body;

        const todo = await todoService.createTodoService(
            userId,
            title,
            bodyNote
        );

        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({
            message: "Failed to create todo"
        });
    }
}

export async function getAllTodoController(req: Request, res: Response) {
    try {
        const todos = await todoService.getAllTodoService()
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({
            message: "Failed to get todos"
        })
    }
}

export async function getTodoByIdController(req: Request, res: Response){
    try {
        const { id } = req.body;
        const todos = await todoService.getTodoByIdService(id);
        
        if(!todos){
            return res.status(404).json({
                message: "Todo not found"
            })
        }
        
        res.status(200).json(todos)
    } catch (error) {
        res.status(500).json({
            message: "Failed to get todo"
        })
    }
}

export async function deleteTodoByIdController(req: Request, res: Response) {
    try {
        const { id } = req.body;
        const todos = await todoService.deleteTodoByIdService(id);

        if(!todos){
            return res.status(404).json({
                message: "Todo not found"
            });
        }

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete todo"
        })
    }
}


