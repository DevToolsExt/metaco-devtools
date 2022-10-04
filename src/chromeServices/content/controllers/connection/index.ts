import {
  MESSAGE_ACTIONS,
  MESSAGE_SOURCE,
} from "../../../../controllers/messaging/types";
import { ContentAppSettings } from "../../../../controllers/settings/app";
import { hideConnectionButton } from "../../views/common/connectButton";
import { handleLoadedPage } from "../handlers/pages/load";
import { sendMessage } from "../messages/send";

export const initiateConnection = (hostname: string) => {
  sendMessage(
    MESSAGE_ACTIONS.INIT_CONNECTION,
    { hostname },
    MESSAGE_SOURCE.BACKGROUND
  );
};

export const handleConnectedConnection = (settings: ContentAppSettings) => {
  hideConnectionButton();

  handleLoadedPage(settings);
};
