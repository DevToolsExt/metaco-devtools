import { getSignatureURL } from ".";
import { ClientRequest } from "../../lib/request";

export const generateKey = async () =>
  new ClientRequest(getSignatureURL(), "/keys/generate", "POST").send();
