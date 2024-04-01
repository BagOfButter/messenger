import { privateInstance } from '@lib/apiPrivate';
import { RegisterInfo } from '@widgets/RegisterForm/models/types';

export const registerUser = async (data: RegisterInfo) => {
    return privateInstance.post('http://localhost:3000/auth/register', data);
};