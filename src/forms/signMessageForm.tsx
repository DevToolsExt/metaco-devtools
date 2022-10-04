import LoadingButton from "@mui/lab/LoadingButton";
import {
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

import { Field, Form, Formik } from "formik";
import * as React from "react";
import TextField from "../components/textField";

export interface SignMessageFormValues<T = unknown> {
  privateKey: string;
  message: T;
}

export const SignMessageForm: React.FC<{
  onSubmit?: <T>(data: SignMessageFormValues<T>) => Promise<void>;
  label?: string;
  disabled?: boolean;
}> = ({ onSubmit, label, disabled }) => {
  const initialValues: SignMessageFormValues = {
    privateKey: "",
    message: "",
  };

  const [type, setType] = React.useState<"string" | "payload">("string");

  return (
    <Stack gap={1}>
      {label && (
        <Typography marginBottom={1} variant='button' alignSelf='center'>
          {label}
        </Typography>
      )}
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
          if (onSubmit)
            await onSubmit({
              ...values,
              message:
                type === "string"
                  ? values.message
                  : JSON.parse(values.message as string),
            });
          actions.setSubmitting(false);
        }}>
        {({ submitForm, isSubmitting, setFieldValue }) => (
          <Form
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}>
            <Field
              disabled={disabled}
              name='privateKey'
              label='Private Key'
              variant='outlined'
              fullWidth
              rows={4}
              multiline
              component={TextField}
            />

            <ToggleButtonGroup
              fullWidth
              size='small'
              color='secondary'
              value={type}
              exclusive
              onChange={(
                event: React.MouseEvent<HTMLElement>,
                newAlignment: "string" | "payload"
              ) => {
                if (newAlignment === null) return;
                setType(newAlignment);
                setFieldValue("message", "");
              }}
              aria-label='Sign type'>
              <ToggleButton value='string'>String</ToggleButton>
              <ToggleButton value='payload'>Payload</ToggleButton>
            </ToggleButtonGroup>

            <Field
              disabled={disabled}
              name='message'
              label={type === "string" ? "Message" : "Payload"}
              variant='outlined'
              component={TextField}
              fullWidth
              {...(type === "string"
                ? {
                    rows: 1,
                    multiline: false,
                  }
                : {
                    rows: 4,
                    multiline: true,
                  })}
            />
            <LoadingButton
              disabled={disabled}
              type='submit'
              variant='contained'
              size='medium'
              loading={isSubmitting}
              loadingPosition='end'
              fullWidth
              onClick={submitForm}
              sx={{
                alignSelf: "flex-end",
              }}>
              Sign Now
            </LoadingButton>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};
