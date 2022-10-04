import React from "react";
import Dialog from "../components/dialog";

export type WithDiloagType = {
  onDialogClose?: () => void;
  closeDialog?: () => void;
  onSkip?: () => void;
  open?: boolean;
  openDialog?: () => void;
};

export type SnackbarType = "success" | "error" | "warning" | "info";

export const withDialog = (
  ChildComp: React.ComponentType<any | string>,
  defaultProps?: {
    open?: boolean;
    title?: string;
  }
) => {
  return class Component extends React.Component<WithDiloagType> {
    state: {
      open: boolean;
    } = {
      open: defaultProps?.open ?? false,
    };

    constructor(props: WithDiloagType) {
      super(props);

      this.state = {
        open: defaultProps?.open ?? props.open ?? false,
      };
    }

    openDialog = () => {
      this.setState({
        open: true,
      });
    };

    handleOnClose = () => {
      this.setState({
        open: false,
        message: "",
        type: undefined,
      });

      if (this.props.onDialogClose) this.props.onDialogClose();
    };

    componentDidUpdate = (prev: { open: boolean }) => {
      if (this.props.open !== prev.open) {
        this.setState({
          open: this.props.open,
        });
      }
    };

    render() {
      const { open } = this.state;
      const { onDialogClose } = this.props;
      return (
        <>
          <Dialog
            onClose={onDialogClose!}
            open={open}
            title={defaultProps?.title}>
            <ChildComp
              {...this.props}
              closeDialog={this.handleOnClose}
              openDialog={this.openDialog}
              onSkip={this.props.onSkip}
            />
          </Dialog>
        </>
      );
    }
  };
};
