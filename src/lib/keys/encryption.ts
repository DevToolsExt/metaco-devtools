import CryptoJS from "crypto-js";

const secretKey = "KsVtv5JUUQtPPg9ilGG9ldbNrxrgHYlADB0aJu3zW+4=";
export const encryptData = (message: string) =>
  CryptoJS.AES.encrypt(message, secretKey).toString();

export const decryptData = (encryptedData: string) =>
  CryptoJS.AES.decrypt(encryptedData, secretKey).toString(CryptoJS.enc.Utf8);
