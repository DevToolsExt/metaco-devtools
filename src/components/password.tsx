import { Visibility, VisibilityOff } from "@mui/icons-material";
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
  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const {
    form: { setFieldValue },
    field: { name },
    label,
  } = props;

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

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
      <InputLabel htmlFor='outlined-adornment-password'>{label}</InputLabel>
      <OutlinedInput
        {...(fieldProps as OutlinedInputProps)}
        type={values.showPassword ? "text" : "password"}
        onChange={onChange}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge='end'>
              {values.showPassword ? <VisibilityOff /> : <Visibility />}
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
