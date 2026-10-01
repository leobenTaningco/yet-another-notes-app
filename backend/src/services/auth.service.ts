import { ensureUserRepository } from "../repositories/auth.repository"

export async function ensureUserService(userId: string){
    return ensureUserRepository(userId);
}