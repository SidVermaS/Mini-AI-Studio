import { Email } from "../data";

export type User = { id: string; name: string; email: Email }

export type AuthLoginPayload = { username: string; password: string };

export type AuthLoginResponse = { user: User; token: string };

export type AuthRegisterPayload = { username: string; password: string };
export type AuthRegisterResponse = { id: string;};