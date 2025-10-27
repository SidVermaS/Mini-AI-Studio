export const formatDateMMDDYYYYHHMM = (date: Date | string): string => {
    const pad = (digit: number) => (digit < 10 ? "0" + digit : digit);
     date = typeof date === "string" ? new Date(date) : date;
    return (
        (date.getMonth() + 1) +
        "/" +
        (date.getDate()) +
        "/" +
        date.getFullYear() +
        " " +
        (date.getHours()) +
        ":" +
        pad(date.getMinutes())
    );
}
