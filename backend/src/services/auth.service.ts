import { findUserByUsername } from '../repositories/user.repository'

export async function loginService(username: string){
    const user = await findUserByUsername(username);

    return user;
}