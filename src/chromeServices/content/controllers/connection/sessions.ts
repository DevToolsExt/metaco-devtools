import { sessionKey } from "../../../../services/auth/sessions";

export const getSession = async () => {
  const { [sessionKey]: session } = await chrome.storage.sync.get([sessionKey]);

  const [publicKey, jwt] = session.split("|");

  return {
    publicKey,
    jwt,
  };
};
