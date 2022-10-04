import * as Yup from "yup";

export const keyPairFormSchema = Yup.object().shape({
  publicKey: Yup.string()
    .length(124, "Public key must be 124 characters.")
    .required("Public key is required."),
  privateKey: Yup.string().required("Private key is required."),
});
