import { Email } from "../data";

export type User = { id: string; name: string; email: Email }

export type AuthLoginPayload = { email: Email; password: string };

export type AuthLoginResponse = { user: User; token: string };

export type AuthRegisterPayload = { email: Email; password: string };
export type AuthRegisterResponse = { id: string;};