import {
  Button,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps,
} from "@mui/material";
import { fieldToTextField, TextFieldProps } from "formik-mui";

import React from "react";

export interface EditableTextFieldType extends TextFieldProps {
  onEditClicked: () => void;
  isEditable: boolean;
}

export default (props: EditableTextFieldType) => {
  const { onEditClicked, isEditable, ...fieldPropsRequired } = props;

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
  ) as any;

  const { helperText, ...fieldProps } = fieldToTextField(fieldPropsRequired);

  return (
    <FormControl variant='outlined'>
      <InputLabel disabled={!isEditable}>{label}</InputLabel>
      <OutlinedInput
        {...(fieldProps as OutlinedInputProps)}
        disabled={!isEditable}
        type='text'
        onChange={onChange}
        endAdornment={
          <InputAdornment position='end'>
            <Button
              size='small'
              variant='text'
              color='secondary'
              onClick={onEditClicked}>
              Edit
            </Button>
          </InputAdornment>
        }
      />
      <FormHelperText id='outlined-weight-helper-text'>
        {helperText}
      </FormHelperText>
    </FormControl>
  );
};
