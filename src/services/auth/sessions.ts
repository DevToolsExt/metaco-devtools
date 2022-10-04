import Cookies from "js-cookie";
import { clearAppSettings } from "../../controllers/settings/app";
import { clearSettingsSetup } from "../../controllers/settings/setup";

export const sessionKey = "auth:session";

export const setSession = (session: {
  publicKey: string;
  accessToken: string;
}) => {
  // Cookies.set(sessionKey, Object.values(session).join("|"), { expires: 7 });
  chrome.storage.sync.set({
    [sessionKey]: Object.values(session).join("|"),
  });
};

export const getSession = async () => {
  // const currentSession = Cookies.get(sessionKey);

  const sessions = await chrome.storage.sync.get([sessionKey]);

  const currentSession = sessions[sessionKey];

  if (!currentSession) {
    return;
  }
  try {
    return currentSession.split("|");
  } catch (error) {}
};

export const logoutUser = () => {
  Cookies.remove(sessionKey);
  clearAppSettings();
  clearSettingsSetup();
};

const privateKey = "auth:privateKey";

export const getPrivateKey = () => {
  Cookies.get(privateKey);
};

export const setPrivateKey = (key: string) => {
  Cookies.set(privateKey, key);
};
