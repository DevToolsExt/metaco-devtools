import { getValidJWT } from "../../services/auth/getJWT";
import { MESSAGE_ACTIONS, MESSAGE_DATA, MESSAGE_SOURCE } from "./types";

export default class ChromeMessage {
  init = () => {
    chrome.runtime &&
      chrome.runtime.onMessage.addListener(
        (
          message: MESSAGE_DATA,
          sender: chrome.runtime.MessageSender,
          response: (response: any) => void
        ) => {
          if (message.to !== MESSAGE_SOURCE.POPUP) return;

          switch (message.action) {
            case MESSAGE_ACTIONS.RENEW_SESSION:
              getValidJWT().then(response);
              break;

            default:
              break;
          }
        }
      );
  };
}
