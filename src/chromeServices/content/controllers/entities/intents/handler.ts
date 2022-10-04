import { MESSAGE_ACTIONS } from "../../../../../controllers/messaging/types";
import ConnectionHandler from "../../connection/handler";
import { handleIntentDetails } from "./details";

type IntentHandlerData = {
  url: URL;
};

export default class IntentDetailsHandler extends ConnectionHandler<IntentHandlerData> {
  getAction(): MESSAGE_ACTIONS {
    return MESSAGE_ACTIONS.SHOW_INTENT_DETAILS;
  }

  async handle({ url }: IntentHandlerData): Promise<void> {
    handleIntentDetails(url);
  }
}
