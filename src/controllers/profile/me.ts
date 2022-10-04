import { ClientRequest } from "../../lib/request";
import { getMetacoServerInfo } from "../settings/setup";

export type MeDomain = {
  alias: string;
  id: string;
  userReference: {
    alias: string;
    id: string;
  };
};

export type Me = {
  domains: MeDomain[];
  publicKey: string;
};

export const me = async (): Promise<Me> => {
  const { apiServer } = getMetacoServerInfo();
  const response = await new ClientRequest(apiServer, "/v1/me", "GET")
    .isAuthenticated()
    .send();
  return response.data as Me;
};
