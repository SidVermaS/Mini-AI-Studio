import { apiCall } from "@/config";
import { AuthLoginPayload, AuthLoginResponse, AuthRegisterPayload, AuthRegisterResponse } from "@/types";

export const login = async (payload: AuthLoginPayload) => await apiCall<AuthLoginPayload, AuthLoginResponse>(
    '/api/v1/auth/login',
    'POST',
    {
        isAuth: false,
        payload,
    },
);

export const register = async (payload: AuthRegisterPayload) => await apiCall<AuthRegisterPayload, AuthRegisterResponse>(
    '/api/v1/auth/register',
    'POST',
    {
        isAuth: false,
        payload,
    },
);