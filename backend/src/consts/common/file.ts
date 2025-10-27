export type MimeTypes = "image/png" | "image/jpg" | "image/jpeg" | "image/webp";

export const FileConfig = {
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10 MB,
    MAX_NO_OF_FILES: 1,             // max number of files allowed per upload,
    ALLOWED_FILE_TYPES: ["image/png", "image/jpg", "image/jpeg", "image/webp",] as MimeTypes[],
};