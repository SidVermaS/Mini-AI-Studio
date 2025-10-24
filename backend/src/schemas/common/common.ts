import z from "zod";

export const CursorIdSchema = z
  .union([z.number(), z.literal('null').transform(() => null), z.string(), z.null()])
  .transform((data) => {
    if (data === null || data === undefined || data === 'null') return null;
    const num = Number(data);
    return isNaN(num) ? null : num;
  })
  .refine((data) => data === null || (typeof data === 'number' && data > 0), {
    message: 'cursorId must be null or a positive number',
  });
export const CursorPaginationSchema = z.object({
  cursorId: CursorIdSchema,
  pageSize: z
    .union([z.string(), z.number()])
    .default(10)
    .transform((data) => parseInt(String(data)))
    .refine((data) => data > 0 && data <= 10, {
      message: 'pageSize must be between 1 and 10',
    }),
});
export type CursorPagination = z.infer<typeof CursorPaginationSchema>;

export const UUIDSchema = z.uuid();
export type UUID = z.infer<typeof UUIDSchema>;

export const RouteParamSchema = z.object({
  id: UUIDSchema,
});
export type RouteParam = z.infer<typeof RouteParamSchema>;