import { createHash as createHashCrypto } from "crypto";

export const createHash = (message: string) => {
  const shasum = createHashCrypto("sha1");
  shasum.update(message);
  return shasum.digest("hex");
};
