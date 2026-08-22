import * as userRepository from '../repositories/user.repository'

export function createUserService(userId: string,
    username: string,
    status: string
) {
    return userRepository.createUserRepository(userId,username,status);
}

export function deleteAllUsersService(){
    return userRepository.deleteAllUsersRepository();
}