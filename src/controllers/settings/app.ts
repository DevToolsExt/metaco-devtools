import Cookies from "js-cookie";
import { EventData } from "../domains/getLatestEvent";
import { Me, MeDomain } from "../profile/me";

export type ContentAppSettings = {
  showCustomProperties: boolean;
};

export type AppSettings = {
  lastUpdate: Date | string;
  lastFetchedEventId?: Date | string;
  isLoggedIn: boolean;
  me: Me;
  selectedDomain: MeDomain;
  latestEvents: Map<string, EventData>;
  content: ContentAppSettings;
};

const defaultSettings = {
  selectedDomain: undefined,
  me: undefined,
  isLoggedIn: false,
  lastUpdate: undefined,
  lastFetchedEventId: undefined,
  content: {
    showCustomProperties: true,
  },
};

export const getAppSettings = (): AppSettings => {
  const settings = Cookies.get("settings:app");
  const parsedSettings = (
    settings ? JSON.parse(settings) : defaultSettings
  ) as AppSettings;

  const data = {
    ...parsedSettings,
    ...(parsedSettings.latestEvents && {
      latestEvents: new Map(Object.entries(parsedSettings.latestEvents)),
    }),
  };

  return data;
};

export const setAppSettings = (settings: Partial<AppSettings>): void => {
  const currentSettings = getAppSettings();
  let updatedSettings = {
    ...currentSettings,
    ...settings,
  };

  updatedSettings = {
    ...updatedSettings,
    latestEvents: Object.fromEntries(
      updatedSettings?.latestEvents ?? new Map()
    ),
  } as any;

  Cookies.set("settings:app", JSON.stringify(updatedSettings));
};

export const clearAppSettings = () => {
  Cookies.remove("settings:app");
};

export const updateLatestEvent = (domainId: string, event: EventData) => {
  const appSettings = getAppSettings();
  appSettings.latestEvents.set(domainId, event);

  setAppSettings({
    latestEvents: appSettings.latestEvents,
    lastFetchedEventId: new Date(),
  });
};

export const getLastestEventCache = (
  domainId: string
): EventData | undefined => {
  const appSettings = getAppSettings();
  const latestEvent = appSettings.latestEvents.get(domainId);
  return latestEvent;
};
