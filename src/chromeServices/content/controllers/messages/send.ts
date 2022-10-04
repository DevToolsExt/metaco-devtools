import {
  MESSAGE_ACTIONS,
  MESSAGE_SOURCE,
} from "../../../../controllers/messaging/types";

export const sendMessage = <Data>(
  action: MESSAGE_ACTIONS,
  data: Data,
  to: MESSAGE_SOURCE,
  cb?: (response: any) => void
) => {
  chrome.runtime.sendMessage(
    {
      action,
      from: MESSAGE_SOURCE.CONTENT,
      to,
      data,
    },
    (response) => {
      if (cb) cb(response);
    }
  );
};
