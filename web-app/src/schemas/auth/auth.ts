

import { NameRx } from '@/consts';
import { z } from 'zod';

export const PasswordSchema = z.string().min(8).max(32);

export const AuthRegisterSchema = z.object({
    email: z.email(),
    password: PasswordSchema.min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
    confirm_password: PasswordSchema,
    name: z.string().min(2).max(100).regex(NameRx),
}).refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
});
export type AuthRegister = z.infer<typeof AuthRegisterSchema>;

export const AuthLoginSchema = z.object({
    email: z.email(),
    password: PasswordSchema,
});
export type AuthLogin = z.infer<typeof AuthLoginSchema>;