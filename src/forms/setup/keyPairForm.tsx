// import LoadingButton from "@mui/lab/LoadingButton";
import { Button, Stack, Typography } from "@mui/material";

import { Field, Form, Formik } from "formik";
import * as React from "react";
import TextField from "../../components/textField";
import { keyPairFormSchema } from "../schemas/keyPairFormSchema";

interface KeyPairFormValues {
  publicKey: string;
  privateKey: string;
  complete?: boolean;
}

export const defaultKeyPairFormValues = {
  publicKey: "",
  privateKey: "",
  complete: false,
};

export const KeyPairForm: React.FC<{
  onComplete?: (data: { keyPair: KeyPairFormValues }) => void;
  onStepBack?: () => void;
  onSkipSetup?: () => void;
  label?: string;
  initialValues?: KeyPairFormValues;
}> = ({ onComplete, onStepBack, onSkipSetup, label, initialValues: data }) => {
  const initialValues: KeyPairFormValues = Object.assign(
    defaultKeyPairFormValues,
    data ?? {}
  );
  return (
    <Stack marginY={2}>
      {label && (
        <Typography marginBottom={1} variant='button' alignSelf='center'>
          {label}
        </Typography>
      )}
      <Formik
        validateOnMount
        validationSchema={keyPairFormSchema}
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          if (onComplete)
            onComplete({
              keyPair: {
                ...values,
                complete: true,
              },
            });
        }}>
        {({ submitForm, isSubmitting, isValid }) => (
          <Form
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}>
            <Field
              name='publicKey'
              label='Public Key'
              variant='outlined'
              fullWidth
              rows={2}
              multiline
              component={TextField}
            />
            <Field
              name='privateKey'
              label='Private Key'
              variant='outlined'
              fullWidth
              rows={4}
              multiline
              component={TextField}
            />

            <Stack
              sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}>
              {onSkipSetup && (
                <Button
                  size='medium'
                  color='inherit'
                  variant='text'
                  onClick={onSkipSetup}>
                  Skip
                </Button>
              )}

              {onStepBack && (
                <Button
                  size='medium'
                  color='secondary'
                  variant='outlined'
                  onClick={onStepBack}>
                  Back
                </Button>
              )}

              <Button
                disabled={isSubmitting || !isValid}
                sx={{
                  marginLeft: 1,
                }}
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
