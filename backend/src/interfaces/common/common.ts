export type ObjUnknown = Record<string, unknown>;
export type Nullable<T> = T | null;
export type Undefined<T> = T | undefined ;
export type UndefinedNullable<T> = T | undefined | null;
export type NumberNull = Nullable<number>;

export type Data<T> = {
  data: T[];
};
export type CursorData<T> = Data<T> & {
  nextCursorId: NumberNull;
};