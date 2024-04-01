import { privateInstance } from '@lib/apiPrivate';

export const refreshAccessToken = async (userId: string | null) => {
    return privateInstance.post('http://localhost:3000/auth/refresh', { userId });
};