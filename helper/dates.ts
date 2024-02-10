const padStart = (n: number) => `${n}`.padStart(2, '0');

export const formatYYYYMMDD = (date: Date) =>
    `${date.getFullYear()}-${padStart(date.getMonth() + 1)}-${padStart(date.getDate())}`;