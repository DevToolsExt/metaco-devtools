import { initiateConnection } from "../../connection";
import { HttpRequestType } from "../../connection/handler";
import { getSession } from "../../connection/sessions";

const httpRequest = (window as any).httpRequest as HttpRequestType;

export default async (url: URL) => {
  const params = new URLSearchParams(url.search);
  const intentId = params.get("intentId");
  const targetDomain = params.get("targetDomainId");

  if (intentId === null && targetDomain === null) {
    throw new Error("IntentID and TargetDomainID are required.");
  }

  const response = await httpRequest<{
    details: {
      metadata: {
        customProperties: any;
      };
    };
  }>(
    "GET",
    `https://api.${url.hostname}/v1/domains/${targetDomain}/intents/${intentId}`,
    {
      headers: {
        authorization: `Bearer ${(await getSession()).jwt}`,
      },
    }
  ).catch((reason) => {
    if (reason === "Unauthorized") {
      initiateConnection(url.hostname);
    }
  });

  return response;
};
