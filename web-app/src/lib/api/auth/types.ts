export type AuthLoginPayload = { username: string; password: string };
export type AuthLoginResponse = { id: string; name: string; email: string; token: string };

export type AuthRegisterPayload = { username: string; password: string };
export type AuthRegisterResponse = { id: string;};