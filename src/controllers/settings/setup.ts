import Cookies from "js-cookie";
import { defaultKeyPairFormValues } from "../../forms/setup/keyPairForm";
import { defaultServerSetupFormValues } from "../../forms/setup/serverSetupForm";
import { decryptData, encryptData } from "../../lib/keys/encryption";

export type ServerSetup = {
  server: string;
  clientId: string;
  clientSecret?: string;
  apiServer?: string;
  authServer?: string;
};

export type KeyPairSetup = {
  publicKey: string;
  privateKey: string;
  alias?: string;
  dateCreated?: Date | string;
};

export type SettingsSetup = {
  server: ServerSetup;
  keyPair: KeyPairSetup;
  skipped?: boolean;
};

const settingsSetupKey = "settings:setup";

export const setSettingsSetup = (setup: Partial<SettingsSetup>) => {
  const currentSetup = (getSettingsSetup() ?? {}) as any;
  const data = {
    ...currentSetup,
    ...setup,
  };
  Cookies.set(settingsSetupKey, encryptData(JSON.stringify(data)));
};

export const getSettingsSetup = (
  setup?: keyof SettingsSetup
): SettingsSetup | SettingsSetup[keyof SettingsSetup] | undefined => {
  const settingsSetup = Cookies.get(settingsSetupKey);

  const currentSetup = settingsSetup
    ? (JSON.parse(decryptData(settingsSetup)) as SettingsSetup)
    : {};

  const setupData = Object.assign(
    {
      server: defaultServerSetupFormValues,
      keyPair: defaultKeyPairFormValues,
      skipped: false,
    },
    currentSetup
  );

  return !setupData ? undefined : setup ? setupData[setup] : setupData;
};

export const isSetupComplete = () => {
  const settings = getSettingsSetup() as SettingsSetup;

  if (!settings) return false;

  for (const setupKey in settings) {
    if (typeof settings[setupKey as keyof SettingsSetup] !== "object") continue;
    const flag = settings[setupKey as keyof SettingsSetup] as any;
    if (!flag.complete) return false;
  }
  return true;
};

export const getMetacoServerInfo = () => {
  let { server, apiServer, authServer, clientId, clientSecret } =
    getSettingsSetup("server") as ServerSetup;
  apiServer =
    apiServer === "" ? `https://api.${server}` : `https://${apiServer}`;
  authServer =
    authServer === "" ? `https://auth.${server}` : `https://${authServer}`;

  return {
    apiServer,
    authServer,
    clientId,
    clientSecret,
  };
};

export const clearSettingsSetup = () => {
  Cookies.remove(settingsSetupKey);
};
