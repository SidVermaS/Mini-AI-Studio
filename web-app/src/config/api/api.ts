import { isFilled, toAny } from "@/utils";
import { APICall, APIHeaders, GenerateURL, Method } from "./types";

import { APIResError, AppError } from "@/errors";
import { ObjAny, ObjUnknown } from "@/types";
import { getCookie } from "@/utils/cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

export const queryParamsToStr = (data: ObjUnknown): string => {
  const filteredEntries = Object.entries(data).filter(([_, value]) => value !== undefined);
  if (filteredEntries.length === 0) {
    return '';
  }
  return (
    '?' +
    filteredEntries
      .map(([key, valueP]) => {
        const value = Array.isArray(valueP)
          ? (valueP as string[]).join(',').slice(0, -1)
          : String(valueP);
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      })
      .join('&')
  );
};

export const generateUrl = (args: GenerateURL): string => {
  let url = `${args.baseUrl}${args.path}`;

  if (args?.routeId !== undefined) {
    url += `/${args.routeId}`;
  }

  if (args?.query && Object.keys(args.query).length) {
    const queryString = queryParamsToStr(args.query);
    if (queryString) {
      url += queryString;
    }
  }

  return url;
};

/**
 * 
 * @param path 
 * @param method 
 * @param params 
 * @returns 
 */
export const apiCall = async <Payload = unknown, Response = unknown>(
  path: string,
  method: Method,
  { baseUrl: baseUrlParam, isFormData = false, isAuth = true, payload, query, routeId, headers }: APICall<Payload>,
): Promise<Response> => {
  try {
    const baseUrl = baseUrlParam || BASE_URL;

    const url = generateUrl({
      baseUrl,
      path,
      query,
      routeId,
    });

    let baseHeaders: APIHeaders = {} as APIHeaders;

    if (isFilled(headers)) {
      baseHeaders = { ...baseHeaders, ...headers };
    }
    if (!isFormData && ['POST', 'PATCH', 'PUT'].includes(method) && isFilled(payload)) {
      baseHeaders['Content-Type'] = 'application/json';
      baseHeaders['Accept'] = 'application/json';
    }
    // if (method === 'DELETE') {
    //   baseHeaders = omit(baseHeaders, ['Content-Type', 'Accept']) as APIHeaders;
    // }

    if (isAuth) {
      baseHeaders.Authorization = `Bearer ${getCookie('token')}`;
    }

    const options: RequestInit = {
      headers: baseHeaders,
      method,
    };
    if (isFormData && isFilled(payload)) {
      const formData = Object.keys(payload!).reduce((formData: FormData, key: string) => {
        const value = (payload as ObjAny)[key];
        formData.append(key, value);
        return formData;
      }, new FormData());
      options.body = formData;

    } else if (isFilled(payload)) {
      options.body = JSON.stringify(payload);
    }

    const response = await fetch(url, options);
    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');
    const json = isJson ? await response.json() : null;

    if (response.status >= 200 && response.status < 300) {
      return json as Response;
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
