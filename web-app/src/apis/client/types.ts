import { ObjStr, ObjUnknown } from "@/types";

export type GenerateURL = {
  baseUrl: string;
  path: string;
  query?: ObjUnknown;
  routeId?: string | number;
};


export interface APICall<PayloadT = unknown> {
  baseUrl?: string;
  payload?: PayloadT;
  query?: ObjUnknown;
  routeId?: string | number;
  isAuth?: boolean;
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
