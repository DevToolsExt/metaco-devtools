import Cookies from "js-cookie";
import { decryptData, encryptData } from "../lib/keys/encryption";
import { ClientRequest } from "../lib/request";
import { KeyPairSetup } from "./settings/setup";

const siloAPI = "https://silo-signing-api.azurewebsites.net";

export const generateKeyPair = async () =>
  await new ClientRequest(siloAPI, "/keys/generate", "POST").send();

export const signMessage = async (privateKey: string, payload: any) => {
  const path = `/signatures/${typeof payload === "string" ? "string" : "key"}`;
  return await new ClientRequest(siloAPI, path, "POST").send({
    payload,
    privateKey,
  });
};

export const addNewHistory = async (keyPair: KeyPairSetup) => {
  const history = getKeyPairHistory();

  history.unshift(keyPair);

  Cookies.set(
    keyPairHistoryKey,
    encryptData(
      JSON.stringify(history.length > 5 ? history.slice(0, -1) : history)
    )
  );
};

const keyPairHistoryKey = "keyPair:history";

export const getKeyPairHistory = () => {
  const history = Cookies.get(keyPairHistoryKey);

  if (!history) return [];

  const decryptedHistory = decryptData(history);

  return JSON.parse(decryptedHistory) as KeyPairSetup[];
};

export const clearHistory = () => {
  Cookies.remove(keyPairHistoryKey);
};
