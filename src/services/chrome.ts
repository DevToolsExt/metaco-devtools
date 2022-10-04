// import Cookies from "js-cookie";

import Cookies from "js-cookie";
import {
  MESSAGE_ACTIONS,
  MESSAGE_DATA,
  MESSAGE_SOURCE,
} from "../controllers/messaging/types";

const sendChromeMessage = async <MessageType = unknown, ResponseType = unknown>(
  message: MessageType
) => {
  const tabId = Cookies.get("metacoTabId");

  if (!chrome?.tabs || !tabId)
    throw new Error("Chrome extension not available");
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(+tabId, message, (response: ResponseType) => {
      resolve(response);
    });
  });
};

export const sendMessage = async <Data = unknown>(
  action: MESSAGE_ACTIONS,
  data: Data,
  to: MESSAGE_SOURCE
) => {
  const response = await sendChromeMessage<MESSAGE_DATA>({
    action,
    data,
    from: MESSAGE_SOURCE.POPUP,
    to,
  });
};
