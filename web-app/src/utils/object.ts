import { ObjUnknown } from "@/types";

export const omit = <T extends ObjUnknown, K extends keyof T>(
  obj: T,
  keys: K | K[],
): Partial<T> => {
  const result: Partial<T> = {};
  const omitKeys: Set<K> = new Set<K>(Array.isArray(keys) ? keys : [keys]);
  for (const key in obj) {
    if (!omitKeys.has(key as unknown as K)) {
      result[key] = obj[key];
    }
  }
  return result;
};

export const pick = <T extends ObjUnknown, K extends keyof T>(
  obj: T,
  keys: K | K[],
): Partial<T> => {
  const result: Partial<T> = {};
  const pickKeys: Set<K> = new Set<K>(Array.isArray(keys) ? keys : [keys]);
  for (const key in obj) {
    if (pickKeys.has(key as unknown as K)) {
      result[key] = obj[key];
    }
  }
  return result;
};

export const isEmpty = (data: unknown) =>
  data === undefined || data === null || !Object.keys(data)?.length;

export const isFilled = (data: unknown) =>
  data !== undefined && data !== null && Object.keys(data)?.length;

export const toAny = (data: unknown) => JSON.parse(JSON.stringify(data));

export const isNumber = (data: unknown): data is number => typeof data === 'number' && !isNaN(data);

export const isFilledString = (data: unknown): data is string =>
  typeof data === 'string' && Boolean(data.trim().length);
