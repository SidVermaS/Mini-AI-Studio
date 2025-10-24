import { ObjUnknown } from "@interfaces/index";

export const omit = <T extends ObjUnknown, K extends keyof T>(obj: T, keys: K | K[]): Partial<T> => {
  const result: Partial<T> = {};
  const omitKeys: Set<K> = new Set<K>(Array.isArray(keys) ? keys : [keys]);
  for (const key in obj) {
    if (!omitKeys.has(key as unknown as K)) {
      result[key] = obj[key];
    }
  }
  return result;
};

export const pick = <T extends ObjUnknown, K extends keyof T>(obj: T, keys: K | K[]): Partial<T> => {
  const result: Partial<T> = {};
  const pickKeys: Set<K> = new Set<K>(Array.isArray(keys) ? keys : [keys]);
  for (const key in obj) {
    if (pickKeys.has(key as unknown as K)) {
      result[key] = obj[key];
    }
  }
  return result;
};

export const isEmpty = (data: unknown) => data === undefined || data === null || !Object.keys(data)?.length;

export const isFilled = (data: unknown) => data !== undefined && data !== null && Object.keys(data)?.length;

export const toAny = (data: unknown) => JSON.parse(JSON.stringify(data));

export const isNumber = (data: unknown): data is number => ![null, undefined, ''].includes(data as string | null | undefined) && !isNaN(Number(data));

export const deepCleanObj = (obj: unknown): Partial<ObjUnknown> => {
  const cleaned = {} as ObjUnknown;

  for (const [key, value] of Object.entries(toAny(obj))) {
    if (value === undefined) continue;

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      cleaned[key] = deepCleanObj(value);
    } else if (Array.isArray(value)) {
      cleaned[key] = value.map((item) => (item && typeof item === 'object' ? deepCleanObj(item) : item));
    } else {
      cleaned[key] = value;
    }
  }

  return cleaned;
};
