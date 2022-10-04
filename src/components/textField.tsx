import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps,
} from "@mui/material";
import { fieldToTextField, TextFieldProps } from "formik-mui";

import React from "react";
import { decodeDoubleSlashes } from "../utils/strings";

export default (props: TextFieldProps) => {
  const {
    form: { setFieldValue },
    field: { name },
    label,
  } = props;

  const onChange = React.useCallback(
    (event: any) => {
      const { value } = event.target;
      setFieldValue(name, decodeDoubleSlashes(value ?? ""));
    },
    [setFieldValue, name]
  );

  const { helperText, error, ...fieldProps } = fieldToTextField(props);

  return (
    <FormControl variant='outlined'>
      <InputLabel error={error} htmlFor='outlined-adornment-textfield'>
        {label}
      </InputLabel>
      <OutlinedInput
        error={error}
        {...(fieldProps as OutlinedInputProps)}
        onChange={onChange}
      />
      <FormHelperText error={error} id='outlined-weight-helper-text'>
        {helperText}
      </FormHelperText>
    </FormControl>
  );
};
