import { ObjStr, ObjUnknown, StringNumber } from "@/types";

export type GenerateURL = {
  baseUrl: string;
  path: string;
  query?: ObjUnknown;
  routeId?: StringNumber;
};

export interface APICall<Payload = unknown> {
  baseUrl?: string;
  payload?: Payload;
  query?: ObjUnknown;
  routeId?: StringNumber;
  isAuth?: boolean;
  isFormData?: boolean;
  headers?: ObjStr;
}

export interface AuthHeader {
  Authorization?: string;
}

export interface HeadersBase extends AuthHeader {
  'Content-Type'?: string;
  'Accept'?: string;
}
export type APIHeaders = HeadersBase & ObjStr;

export type Method = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
