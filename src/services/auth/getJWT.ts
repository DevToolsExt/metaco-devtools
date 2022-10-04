import jwt_decode from "jwt-decode";
import moment from "moment";
import qs from "querystring";
import {
  getMetacoServerInfo,
  getSettingsSetup,
  KeyPairSetup,
} from "../../controllers/settings/setup";
import { ClientRequest } from "../../lib/request";
import { getSession, setSession } from "./sessions";
import { signString } from "./sign";

export const isJWTExpired = (jwt: string) => {
  if (jwt === "") return true;
  const decoded = jwt_decode(jwt) as any;
  const expiryDate = moment(new Date(decoded.exp * 1000)).subtract(
    10,
    "minutes"
  );
  return moment().isAfter(expiryDate);
};

export const getValidJWT = async () => {
  const currentSession = await getSession();
  const { publicKey, privateKey } = getSettingsSetup("keyPair") as KeyPairSetup;

  if (
    !currentSession || // if no current session
    isJWTExpired(currentSession[1]) || // if token is expired
    publicKey !== currentSession[0] // if new user
  ) {
    const {
      data: { canonicalPayload, signature },
    } = await signString(undefined, privateKey);
    const jwt = await generateJWT(publicKey, signature, canonicalPayload);

    await setSession({ publicKey, accessToken: jwt });
    return jwt;
  } else return currentSession[1];
};

export const generateJWT = async (
  public_key: string,
  signature: string,
  challenge: string
) => {
  const { authServer, clientId, clientSecret } = getMetacoServerInfo();
  const data = {
    grant_type: "password",
    client_id: clientId,
    client_secret: clientSecret,
    signature,
    challenge,
    public_key,
  };
  const {
    data: { access_token },
  } = await new ClientRequest(
    `https://metacodevtools-gateway.herokuapp.com/rest?url=${authServer}`,
    "/token",
    "POST"
  ).send(qs.stringify(data), {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
  });
  // const response = await sendMessage({
  //   data: {
  //     action: ACTION_TYPE.GENERATE_TOKEN,
  //     data: {
  //       endpoint: `${authServer}/token`,
  //       options: {
  //         headers: {
  //           "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
  //         },
  //         body: data,
  //       },
  //     },
  //   },
  // });
  // return response as string;
  return access_token;
};

export const keepAlive = async () => {
  let timer: NodeJS.Timer | null = setInterval(getValidJWT, 3000);
  return () => {
    clearInterval(timer!);
    timer = null;
  };
};
