
export const isNot = (path: string[], value: string) => path.every((p) => !!p && p !== value);