import axios from "axios";
import { getEnv } from "../config";
import { getValidJWT } from "../services/auth/getJWT";

export class ClientRequest {
  private requestData;
  private requireJWT: boolean = false;

  constructor(
    private baseURL: string = getEnv("BASE_URL"),
    private basePath: string = "",
    private method: "GET" | "POST"
  ) {
    this.requestData = {
      method: method.toLowerCase(),
      url: `${baseURL}${basePath}`,
      data: {},
    };
  }

  isAuthenticated = (): this => {
    this.requireJWT = true;
    return this;
  };

  send = async (requestData?: any, headers?: any) => {
    try {
      if (this.requestData.method === "post" && requestData) {
        this.requestData["data"] = requestData || {};
      }
      if (this.requireJWT) {
        headers = {
          Authorization: `Bearer ${await getValidJWT()}`,
          ...(headers && { ...headers }),
          "Access-Control-Allow-Origin": "*",
        };
      }
      const _reqData = {
        ...this.requestData,
        ...(headers && { headers }),
        crossdomain: true,
      };
      const { data, status, statusText } = await axios(_reqData);

      return {
        data,
        status,
        statusText,
      };
    } catch (error) {
      throw error;
    }
  };
}
