export type Nullable<T> = T | null;
export type UndefinedNull = undefined | null;
export type StringUndefined = string | undefined;
export type StringUndefinedNull = string | UndefinedNull;
export type StringNumber = string | number;
export type StringNull = Nullable<string>;
export type BooleanNull = Nullable<boolean>;
export type NumberNull = Nullable<number>;
export type KeyStrStr = Record<string, string>;
export type StrNullVoidFn = (id: StringNull) => void;
export type ObjUnknown = Record<string, unknown>;
export type ObjStr = Record<string, string>;
export type ObjStrNum = Record<string, string | number>;
export type Primitive = string | boolean | number | null | undefined;

export type Email = string
export type UUID = string;
export type VoidFn = () => void;
export type Data<T> = {
  data: T[];
};
export type CursorData<T> = Data<T> & {
  nextCursorId: NumberNull;
};
export type CursorPagination = {
    cursorId: NumberNull;
    pageSize: number;
}