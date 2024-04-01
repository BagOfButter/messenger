import { privateInstance } from '@lib/apiPrivate';
import { LoginFormInput } from '@widgets/LoginForm/models/types';

export const loginUser = async (data: LoginFormInput) => {
    return privateInstance.post('http://localhost:3000/auth/login', data);
};