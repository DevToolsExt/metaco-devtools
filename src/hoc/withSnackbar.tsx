import { Alert, Snackbar } from "@mui/material";
import React from "react";

export type WithSnackbarType = {
  showSnackbar: (message: string, type?: SnackbarType) => void;
};

export type SnackbarType = "success" | "error" | "warning" | "info";

export const withSnackbar = (ChildComp: React.ComponentType<any | string>) => {
  return class Component extends React.Component {
    state: {
      open: boolean;
      message: "";
      type?: SnackbarType;
    } = {
      open: false,
      message: "",
    };

    showSnackbar = (message: string, type?: SnackbarType) => {
      this.setState({
        message,
        type,
        open: true,
      });
    };

    handleOnClose = () => {
      this.setState({
        open: false,
        message: "",
        type: undefined,
      });
    };

    render() {
      const { open, message, type } = this.state;
      return (
        <>
          <ChildComp {...this.props} showSnackbar={this.showSnackbar} />
          {type ? (
            <Snackbar
              open={open}
              autoHideDuration={4000}
              message={message}
              onClose={this.handleOnClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}>
              <Alert severity={type} sx={{ width: "100%" }}>
                {message}
              </Alert>
            </Snackbar>
          ) : (
            <Snackbar
              open={open}
              autoHideDuration={4000}
              message={message}
              onClose={this.handleOnClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            />
          )}
        </>
      );
    }
  };
};
