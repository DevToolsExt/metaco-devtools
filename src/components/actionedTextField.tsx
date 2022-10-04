import { ContentCopy } from "@mui/icons-material";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps,
} from "@mui/material";
import { fieldToTextField, TextFieldProps } from "formik-mui";

import React from "react";

export default (props: TextFieldProps) => {
  const {
    form: { setFieldValue },
    field: { name },
    label,
  } = props;

  const onChange = React.useCallback(
    (event: any) => {
      const { value } = event.target;
      setFieldValue(name, value ?? "");
    },
    [setFieldValue, name]
  );

  const { helperText, ...fieldProps } = fieldToTextField(props);

  return (
    <FormControl variant='outlined'>
      <InputLabel htmlFor='outlined-adornment-actioned-field'>
        {label}
      </InputLabel>
      <OutlinedInput
        {...(fieldProps as OutlinedInputProps)}
        type='text'
        onChange={onChange}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              aria-label='copy-text-field-value'
              onClick={() => {
                navigator.clipboard.writeText(fieldProps.value as string);
              }}
              edge='end'>
              <ContentCopy />
            </IconButton>
          </InputAdornment>
        }
      />
      <FormHelperText id='outlined-weight-helper-text'>
        {helperText}
      </FormHelperText>
    </FormControl>
  );
};
