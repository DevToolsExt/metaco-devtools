import { removeSlashes } from "slashes";

export const maskMiddleStrings = (text: string, n: number) => {
  const middle = Math.floor(n / 2);
  const startPart = text.slice(0, middle);
  const endPart = text.slice(-middle);

  return `${startPart}${".".repeat(4)}${endPart}`;
};

export const maskPrivateKey = (privateKey: string) =>
  privateKey
    .replace("-----BEGIN EC PRIVATE KEY-----\n", "")
    .replace("\n-----END EC PRIVATE KEY-----\n", "");

export const decodeDoubleSlashes = (text: string) => removeSlashes(text);
