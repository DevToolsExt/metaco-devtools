// import LoadingButton from "@mui/lab/LoadingButton";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Stack,
  Typography,
} from "@mui/material";

import { Field, Form, Formik } from "formik";
import * as React from "react";
import Password from "../../components/password";
import TextField from "../../components/textField";
import { serverSetupFormSchema } from "../schemas/serverSetupFormSchema";

interface ServerSetupFormValues {
  clientId: string;
  clientSecret?: string;
  server: string;
  apiServer?: string;
  authServer?: string;
  complete?: boolean;
}

export const defaultServerSetupFormValues = {
  clientId: "",
  clientSecret: "",
  server: "",
  apiServer: "",
  authServer: "",
  complete: false,
};

export const ServerSetupForm: React.FC<{
  onComplete: (data: { server: ServerSetupFormValues }) => void;
  onStepBack: () => void;
  onSkipSetup: () => void;
  initialValues?: ServerSetupFormValues;
}> = ({ onComplete, initialValues: data }) => {
  const initialValues: ServerSetupFormValues = Object.assign(
    defaultServerSetupFormValues,
    data ?? {}
  );
  return (
    <Stack marginY={2}>
      <Typography marginBottom={1} variant='button' alignSelf='center'>
        Server Setup
      </Typography>
      <Formik
        validateOnMount
        validationSchema={serverSetupFormSchema}
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          onComplete({
            server: {
              ...values,
              complete: true,
            },
          });
        }}>
        {({ values, submitForm, isSubmitting, isValid }) => (
          <Form
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}>
            <Field
              name='clientId'
              label='Client ID'
              variant='outlined'
              fullWidth
              component={TextField}
            />
            <Field
              name='clientSecret'
              label='Client Secret'
              variant='outlined'
              fullWidth
              component={Password}
            />

            <Field
              name='server'
              label='Server'
              variant='outlined'
              fullWidth
              component={TextField}
            />

            <Accordion
              elevation={0}
              sx={{
                background: "transparent",
                "::before": {
                  display: "none",
                },
              }}>
              <AccordionSummary
                sx={{
                  margin: "0px !important",
                  minHeight: 30,
                  ".MuiAccordionSummary-content": {
                    margin: "0px !important",
                  },
                  "&.Mui-expanded": {
                    minHeight: 35,
                  },
                }}>
                <Typography variant='body2' color='secondary'>
                  Advance settings
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}>
                <Field
                  value={values.server !== "" ? `api.${values.server}` : ""}
                  disabled
                  name='apiServer'
                  label='API Server'
                  variant='outlined'
                  fullWidth
                  component={TextField}
                />

                <Field
                  disabled
                  value={values.server !== "" ? `auth.${values.server}` : ""}
                  name='authServer'
                  label='Auth Server'
                  variant='outlined'
                  fullWidth
                  component={TextField}
                />
              </AccordionDetails>
            </Accordion>

            <Stack
              sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}>
              {/* <Button
                size='medium'
                onClick={onSkipSetup}
                color='inherit'
                variant='text'>
                Skip
              </Button> */}
              <Button
                disabled={isSubmitting || !isValid}
                size='medium'
                onClick={submitForm}
                variant='contained'>
                Next
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};
