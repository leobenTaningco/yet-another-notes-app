import { Request, Response } from "express";
import * as userService from "../services/user.service.ts"

export async function createUserController(req: Request, res: Response){
    try {
        const { userId, username, status} = req.body;

        const user = await userService.createUserService(
            userId,
            username,
            status
        );

        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({
            message: "Failed to create user"
        })
    }
}

export async function deleteAllUsersController(req: Request, res: Response){
    try {
        const users = await userService.deleteAllUsersService();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete users"
        })
    }
}