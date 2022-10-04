import { ClientRequest } from "../../lib/request";
import { getMetacoServerInfo } from "../settings/setup";

export type EventDataPayload = {
  id: string;
  type: string;
};

export type EventData = {
  domainId: string;
  id: string;
  savedAt: string;
  sequenceNumber: number;
  payload: EventDataPayload;
};

export const getLatestEvent = async (
  domainId: string,
  lastEventId?: string
): Promise<EventData | undefined> => {
  const { apiServer } = getMetacoServerInfo();
  let currentStartingAfter = lastEventId;
  let response;
  let count = 100;
  do {
    response = await new ClientRequest(
      apiServer,
      `/v1/domains/${domainId}/events${
        currentStartingAfter ? `?startingAfter=${currentStartingAfter}` : ""
      }`,
      "GET"
    )
      .isAuthenticated()
      .send();

    currentStartingAfter = response.data.nextStartingAfter;
    count = response.data.count;
  } while (count === 100);

  return response.data.items.length
    ? (response.data.items.slice(-1)[0] as EventData)
    : undefined;
};
