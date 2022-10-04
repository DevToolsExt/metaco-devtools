import { ContentCopy } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { maskMiddleStrings } from "../utils/strings";

type CopyTextFieldProps = {
  value: string;
  label: string;
  masked?: number;
  valueOverrider?: (value: string) => string;
};

export default function CopyTextField({
  value,
  label,
  masked,
  valueOverrider,
}: CopyTextFieldProps) {
  const [copied, setCopied] = React.useState<boolean>(false);

  const copyText = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <TextField
      disabled
      label={label}
      variant='outlined'
      id={`${label}-generated`}
      value={
        masked
          ? maskMiddleStrings(
              valueOverrider ? valueOverrider(value) : value,
              masked
            )
          : value
      }
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            {copied && (
              <Typography color='secondary.dark' variant='button'>
                Copied
              </Typography>
            )}
            <IconButton color='secondary' onClick={copyText}>
              <ContentCopy />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
