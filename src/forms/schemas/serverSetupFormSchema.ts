import * as Yup from "yup";

export const serverSetupFormSchema = Yup.object().shape({
  clientId: Yup.string().required("Client ID is required."),
  clientSecret: Yup.string().optional(),
  server: Yup.string().required("Server is required."),
});
