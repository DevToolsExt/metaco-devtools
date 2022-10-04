import { IncomingHttpHeaders } from "http2";
import { MESSAGE_ACTIONS } from "../../../../controllers/messaging/types";
import { getSession } from "../../../../services/auth/sessions";
import { sendMessage } from "../messages/send";

export type TAnyHash = Record<string, any>;

export type HTTPRequestOptions<T = unknown> = {
  headers?: IncomingHttpHeaders;
  body?: T;
  options?: TAnyHash;
};

export type HttpRequestType = <T = unknown>(
  method: "GET" | "POST",
  url: string,
  options?: HTTPRequestOptions
) => Promise<T>;

export default abstract class ConnectionHandler<Data = unknown> {
  abstract getAction(): MESSAGE_ACTIONS;

  abstract handle(data: Data): Promise<void>;

  private httpRequest = (window as any).httpRequest as HttpRequestType;

  protected sendHttp = async <ResponseType>(
    method: "GET" | "POST",
    url: string,
    options?: HTTPRequestOptions
  ) => {
    const response = await this.httpRequest<{ data: ResponseType }>(
      method,
      url,
      {
        ...options,
        headers: {
          ...(options?.headers ?? {}),
          authorization: `Bearer ${(await getSession()).jwt}`,
          "content-type": "application/json",
        },
      }
    );

    return response.data;
  };

  protected sendMessage = sendMessage;
}
