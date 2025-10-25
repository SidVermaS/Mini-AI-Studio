import { ObjUnknown } from "@/types";
import { GenerateURL,Headers } from "./types";

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

const getHeaders = async (): Promise<Headers> => {

  const headers: Headers = {
    "Accept": 'application/json',
  };


  return headers;
};