import { handleConnectedConnection } from ".";
import {
  MESSAGE_ACTIONS,
  MESSAGE_DATA,
  MESSAGE_SOURCE,
} from "../../../../controllers/messaging/types";
import { ContentAppSettings } from "../../../../controllers/settings/app";
import IntentDetailsHandler from "../entities/intents/handler";
import PageLoadedHandler from "../handlers/pages/load";
import ConnectionHandler from "./handler";

export let isConnected: boolean = false;
export default class ConnectionReceiver extends ConnectionHandler {
  getAction(): MESSAGE_ACTIONS {
    return MESSAGE_ACTIONS.CONNECTED;
  }

  async handle(data: ContentAppSettings): Promise<void> {
    isConnected = true;
    handleConnectedConnection(data);
  }

  init = () => {
    chrome.runtime && chrome.runtime.onMessage.addListener(this.accept);
  };

  protected IsConnected = () => isConnected;

  private accept({ action, data, to }: MESSAGE_DATA) {
    if (to !== MESSAGE_SOURCE.CONTENT && to !== MESSAGE_SOURCE.ALL) return;

    const targetHandler = handlersRegistry.find(
      (h) => h.getAction() === action
    );

    if (targetHandler) targetHandler.handle(data);
  }
}

export const handlersRegistry: ConnectionHandler[] = [
  new ConnectionReceiver(),
  new PageLoadedHandler(),
  new IntentDetailsHandler(),
];
