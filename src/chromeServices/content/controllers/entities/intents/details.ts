import { viewCustomProperties } from "../../../views/intents/viewCustomProperties";
import { viewFailedState } from "../../../views/intents/viewFailedState";
import getDetails from "./getDetails";

export const handleIntentDetails = async (url: URL) => {
  try {
    const details = (await getDetails(url)) as any;

    if (details.data.state.status === "Failed") {
      viewFailedState(details.data.state.error);
    }

    const customProperties = details.data?.details?.metadata?.customProperties;
    if (!customProperties) return;
    viewCustomProperties(customProperties);
  } catch (error) {}
};
