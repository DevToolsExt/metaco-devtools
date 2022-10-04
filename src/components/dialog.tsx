import { DialogContent } from "@mui/material";
import MuiDialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";

export interface DialogPops {
  open: boolean;
  children: React.ReactNode;
  title?: string;
  onClose: () => void;
}

export default function Dialog({ children, onClose, open, title }: DialogPops) {
  const handleClose = () => {
    onClose();
  };

  return (
    <MuiDialog onClose={handleClose} open={open}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>{children}</DialogContent>
    </MuiDialog>
  );
}
