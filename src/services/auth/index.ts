import { getEnv } from "../../config";

export const getSignatureURL = () => getEnv("SIGNATURE_URL");

export const getOAuthURL = () => getEnv("HARMONIZE_OAUTH_URL");

export const getSandboxURL = () => getEnv("HARMONIZE_SANDBOX_URL");

export const getClientID = () => getEnv("SANDBOX_CLIENT_ID");
