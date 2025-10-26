

import { NameRx } from '@/consts';
import { z } from 'zod';

export const PasswordSchema = z.string().min(8).max(32);

export const AuthRegisterSchema = z.object({
    email: z.email(),
    password: PasswordSchema,
    name: z.string().min(2).max(100).regex(NameRx),
});
export type AuthRegister = z.infer<typeof AuthRegisterSchema>;

export const AuthLoginSchema = z.object({
    email: z.email(),
    password: PasswordSchema,
});
export type AuthLogin = z.infer<typeof AuthLoginSchema>;