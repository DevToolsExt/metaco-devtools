import jwt_decode from "jwt-decode";
import {
  MESSAGE_ACTIONS,
  MESSAGE_DATA,
  MESSAGE_SOURCE,
} from "../controllers/messaging/types";

import moment from "moment";
import { ContentAppSettings } from "../controllers/settings/app";
import { sessionKey } from "../services/auth/sessions";

const waitUntil = async (validator: () => boolean) => {
  return new Promise((resolve) => {
    const validate = validator();
    if (!validate) {
      setTimeout(async () => {
        resolve(await waitUntil(validator));
      }, 100);
      return;
    }
    resolve(true);
  });
};

const isJWTExpired = (jwt: string) => {
  if (jwt === "") return true;
  const decoded = jwt_decode(jwt) as any;
  const expiryDate = moment(new Date(decoded.exp * 1000)).subtract(
    1,
    "minutes"
  );
  const isAfter = moment().isAfter(expiryDate);
  return isAfter;
};

export class ChromeBackgroundService {
  constructor() {
    this.startListeners();
    this.createKeepAlive();
  }

  private isConnected: boolean = false;
  private initialized: boolean = false;
  private scriptLoaded: boolean = false;
  private targetTabId?: number;
  private cotentSettings?: ContentAppSettings;

  private keepAliveInstance: NodeJS.Timer | null = null;

  private createKeepAlive = () => {
    if (this.keepAliveInstance === null)
      this.keepAliveInstance = setInterval(this.keepAlive, 1000);
  };

  private onPageLoaded = async (tabId: number, tab: chrome.tabs.Tab) => {
    await waitUntil(() => this.initialized);

    await this.handleConnected();

    chrome.tabs.sendMessage(
      tabId,
      createMessage<{
        url: string;
        isConnected: boolean;
        settings: ContentAppSettings;
        tabId: number;
      }>(
        MESSAGE_ACTIONS.PAGE_LOADED,
        {
          url: tab.url!,
          isConnected: this.isConnected,
          settings: this.cotentSettings!,
          tabId,
        },
        MESSAGE_SOURCE.CONTENT
      )
    );
  };

  private startListeners = () => {
    chrome.runtime &&
      chrome.runtime.onMessage.addListener(
        (message: MESSAGE_DATA, sender, sendResponse) => {
          if (
            message.to !== MESSAGE_SOURCE.BACKGROUND &&
            message.to !== MESSAGE_SOURCE.ALL
          )
            return;
          this.handleMessageReceived(message);
        }
      );

    chrome.tabs &&
      chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        if (changeInfo.status !== "complete" && tab.title !== "Harmonize")
          return;
        this.targetTabId = tabId;
        this.onPageLoaded(tabId, tab);
      });
  };

  private initConnection = (hostname?: string) => {
    chrome.windows.create({
      url: `/index.html#connect?host=${hostname}`,
      type: "popup",
      focused: true,
      width: 350,
      height: 600,
    });
  };

  private handleConnected = async () => {
    if (this.targetTabId && !this.scriptLoaded) {
      chrome.scripting.executeScript({
        target: {
          tabId: this.targetTabId,
        },
        files: ["plugins/boostrap.js"],
      });
      this.scriptLoaded = true;
    }

    if (!this.isConnected) {
      await this.keepAlive();
    }
    this.createKeepAlive();
  };

  private handleMessageReceived = async (message: MESSAGE_DATA) => {
    switch (message.action) {
      case MESSAGE_ACTIONS.INIT_CONNECTION:
        this.initConnection((message.data as { hostname: string }).hostname);
        break;
      case MESSAGE_ACTIONS.CONNECTED:
        await this.handleConnected();
        this.cotentSettings = message.data as ContentAppSettings;
        break;
      default:
        break;
    }
  };

  private keepAlive = async () => {
    const { [sessionKey]: session } = await chrome.storage.sync.get([
      sessionKey,
    ]);

    const [publicKey, jwt] = (session ?? "").split("|");

    const expired = jwt ? isJWTExpired(jwt) : true;

    if (expired) {
      this.isConnected = false;
      clearInterval(this.keepAliveInstance!);
      this.keepAliveInstance = null;
    } else {
      this.isConnected = true;
    }
    this.initialized = true;
  };
}

const createMessage = <Data>(
  action: MESSAGE_ACTIONS,
  data: Data,
  to: MESSAGE_SOURCE
): MESSAGE_DATA => {
  return {
    from: MESSAGE_SOURCE.BACKGROUND,
    to,
    action,
    data,
  };
};

new ChromeBackgroundService();
