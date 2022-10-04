import { ContentCopy } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";
import React, { FunctionComponent } from "react";

type CopyButtonSizeType = "small" | "medium" | "large";

interface CopyButtonProps {
  onCopyClicked: () => string;
  size?: CopyButtonSizeType | number;
}

const CopyButton: FunctionComponent<CopyButtonProps> = ({
  onCopyClicked,
  size,
}) => {
  const [copy, setCopy] = React.useState<boolean>(false);

  const btnSize = size ?? "medium";

  return (
    <Stack
      sx={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "5px",
      }}>
      <IconButton
        {...(typeof size === "number"
          ? {
              sx: { width: size, height: size },
            }
          : { size: btnSize as CopyButtonSizeType })}
        color='secondary'
        disabled={copy}
        onClick={() => {
          setCopy(true);
          navigator.clipboard.writeText(onCopyClicked());
          setTimeout(() => {
            setCopy(false);
          }, 500);
        }}>
        <ContentCopy
          sx={{
            width:
              typeof size === "number"
                ? size
                : size === "small"
                ? 20
                : size === "medium"
                ? 30
                : 40,
            height:
              typeof size === "number"
                ? size
                : size === "small"
                ? 20
                : size === "medium"
                ? 30
                : 40,
          }}
        />
      </IconButton>
      {copy && (
        <Typography
          sx={{
            fontSize:
              typeof size === "number"
                ? Math.ceil(size * 0.75)
                : size === "small"
                ? 12
                : size === "medium"
                ? 16
                : 22,
          }}>
          Copied
        </Typography>
      )}
    </Stack>
  );
};

export default CopyButton;
