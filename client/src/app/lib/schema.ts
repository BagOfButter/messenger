import { z } from 'zod';

export const LoginSchema = z.object({email: z.string()
                                        .regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Invalid email address'),
                                    password: z.string()
                                        .min(6, 'Password must be at least 6 characters long')
                                        .max(18, 'Password must not exceed 18 characters')})
                            .required();

export const RegisterSchema = z.object({email: z.string()
                                            .regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Invalid email address'),
                                        username: z.string()
                                            .min(6, 'Username must be at least 6 characters long')
                                            .max(18, 'Username must not exceed 18 characters'),
                                        password: z.string()
                                            .min(6, 'Password must be at least 6 characters long')
                                            .max(18, 'Password must not exceed 18 characters'),
                                        repeatPassword: z.string()
                                        })
                                .required()
                                .refine(
                                    (data) => data.password === data.repeatPassword,
                                    {
                                      message: 'Passwords do not match',
                                      path: ['repeatPassword'],
                                    }
                                );