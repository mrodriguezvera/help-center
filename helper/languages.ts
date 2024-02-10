import { IncomingMessage } from "http";

export const getLanguage = (req?: IncomingMessage) =>
    req?.headers?.['accept-language']?.split(',').map((a: string) => a.split(';')[0])[0];