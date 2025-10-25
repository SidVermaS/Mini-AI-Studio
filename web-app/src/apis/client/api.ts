import { isFilled } from "@/utils";
import { APICall, APIHeaders, Method } from "./types";
import { generateUrl } from "./utils";
import { APIResError, AppError } from "@/errors";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

const getHeaders = async (): Promise<APIHeaders> => {
  const headers: APIHeaders = {
    'Accept': 'application/json',
  };
  return headers;
};

export const apiCall = async <PayloadT = unknown, ResponseT = unknown>(
  path: string,
  method: Method,
  {baseUrl:baseUrlParam, isAuth = true, payload, query, routeId, headers }: APICall<PayloadT>,
): Promise<ResponseT> => {
  try {
    const baseUrl = baseUrlParam || BASE_URL;

    const url = generateUrl({
      baseUrl,
      path,
      query,
      routeId,
    });

    let baseHeaders = await getHeaders();

    if (isFilled(headers)) {
      baseHeaders = { ...baseHeaders, ...headers };
    }
    if (['POST', 'PATCH', 'PUT'].includes(method) && isFilled(payload)) {
      baseHeaders['Content-Type'] = 'application/json';
    }
    // if (method === 'DELETE') {
    //   baseHeaders = omit(baseHeaders, ['Content-Type', 'Accept']) as APIHeaders;
    // }

   

    const options: RequestInit = {
      headers: baseHeaders,
      method,
    };
     if (isAuth) {
     options.credentials='include'
    }
    if (isFilled(payload)) {
      options.body = JSON.stringify(payload);
    }

    const response = await fetch(url, options);

    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');
    const json = isJson ? await response.json() : null;

    if (response.status >= 200 && response.status < 300) {
      return json as ResponseT;
    } else if (response.status === 401) {
      // 
    }

    throw new APIResError(response.status, json || { message: 'No response body' });
  } catch (error) {
    if (error instanceof APIResError) {
      throw error;
    } else if (error instanceof TypeError) {
      throw error;
    }
    throw new AppError('Unknown error', error as Error);
  }
};
