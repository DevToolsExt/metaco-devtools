import { MESSAGE_ACTIONS } from "../../../../../controllers/messaging/types";
import { ContentAppSettings } from "../../../../../controllers/settings/app";
import {
  getCurrentPage,
  getCurrentURL,
  HAROMINZE_PAGE,
} from "../../../utils/url";
import { showConnectButton } from "../../../views/common/connectButton";
import { initiateConnection } from "../../connection";
import ConnectionHandler from "../../connection/handler";
import { handleIntentDetails } from "../../entities/intents/details";

type IntentHandlerData = {
  url: string;
  isConnected: boolean;
  settings: ContentAppSettings;
  tabId: number;
};

export default class PageLoadedHandler extends ConnectionHandler<IntentHandlerData> {
  getAction(): MESSAGE_ACTIONS {
    return MESSAGE_ACTIONS.PAGE_LOADED;
  }

  async handle({
    url,
    isConnected,
    settings,
    tabId,
  }: IntentHandlerData): Promise<void> {
    if (document.title !== "Harmonize") return;
    const u = new URL(url);
    if (!isConnected) {
      showConnectButton(() => {
        initiateConnection(u.hostname);
      });
    } else {
      handleLoadedPage(
        settings ?? {
          showCustomProperties: true,
        }
      );
    }
  }
}

export const handleLoadedPage = async (settings: ContentAppSettings) => {
  const currentPage = getCurrentPage();

  switch (currentPage) {
    case HAROMINZE_PAGE.INTENTS:
      if (settings.showCustomProperties) {
        handleIntentDetails(getCurrentURL());
      }
      break;

    default:
      break;
  }
};
