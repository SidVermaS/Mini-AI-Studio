export type Email = string & { __type: "Email" };
export type Name = string & { __type: "Name" };
export type UUIDV4 = string & { __type: "UUIDV4" };
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