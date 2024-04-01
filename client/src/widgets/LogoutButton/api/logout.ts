import { privateInstance } from '@lib/apiPrivate';

export const logoutUser = async (userId: string | null) => {
    return privateInstance.post('http://localhost:3000/auth/logout', { userId });
};