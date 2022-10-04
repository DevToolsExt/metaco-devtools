import { getEnv } from "../../config";
import { signMessage } from "../../controllers/keyManagement";
import { decodeDoubleSlashes } from "../../utils/strings";

export const signString = async (
  payload: string = new Date().getTime().toString(),
  privateKey: string = getEnv("PRIVATE_KEY")
) => {
  return await signMessage(decodeDoubleSlashes(privateKey), payload);
};

export const signPayload = async (
  payload: any,
  privateKey: string = getEnv("PRIVATE_KEY")
) => {
  return await signMessage(privateKey, payload);
};
