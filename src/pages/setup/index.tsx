import { Check, DoneAllOutlined } from "@mui/icons-material";
import {
  Button,
  Container,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import { styled } from "@mui/material/styles";
import { Component } from "react";
import {
  setSettingsSetup,
  SettingsSetup,
} from "../../controllers/settings/setup";
import { KeyPairForm } from "../../forms/setup/keyPairForm";
import { ServerSetupForm } from "../../forms/setup/serverSetupForm";
import { WithDiloagType } from "../../hoc/withDialog";
import { withNavigation, WithNavigationType } from "../../hoc/withNavigation";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.secondary.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.secondary.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const steps = ["Server Setup", "Key-Pair Setup", "Completed"];

const QontoStepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
    ...(ownerState.active && {
      color: theme.palette.secondary.main,
    }),
    "& .QontoStepIcon-completedIcon": {
      color: theme.palette.text.primary,
      zIndex: 1,
      fontSize: 18,
    },
    "& .QontoStepIcon-circle": {
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: "currentColor",
    },
  })
);

const QontoStepIcon = (props: StepIconProps) => {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className='QontoStepIcon-completedIcon' />
      ) : (
        <div className='QontoStepIcon-circle' />
      )}
    </QontoStepIconRoot>
  );
};

class SetupPage extends Component<
  {
    open?: boolean;
  } & WithDiloagType &
    WithNavigationType
> {
  state: Readonly<{ currentStep: number }> = {
    currentStep: 0,
  };

  onStepComplete = (values: any) => {
    let { currentStep } = this.state;
    currentStep += 1;
    setSettingsSetup(values);
    this.setState({
      currentStep,
    });
  };

  onStepBack = () => {
    let { currentStep } = this.state;
    currentStep = currentStep - 1 < 0 ? 0 : currentStep - 1;
    this.setState({
      currentStep,
    });
  };

  onSkipSetup = () => {
    if (this.props.closeDialog) this.props.closeDialog();
    if (this.props.onSkip) this.props.onSkip();
  };

  render() {
    const { currentStep } = this.state;
    const data = this.props.getCurrentState<SettingsSetup>() ?? {};
    return (
      <Container
        maxWidth='md'
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          overflowY: "auto",
        }}>
        <Stack
          sx={{
            flexGrow: 1,
          }}>
          {(() => {
            switch (currentStep) {
              case 1:
                return (
                  <KeyPairForm
                    initialValues={data.keyPair}
                    onComplete={this.onStepComplete}
                    onStepBack={this.onStepBack}
                    // onSkipSetup={this.onSkipSetup}
                    label='Key-Pair Setup'
                  />
                );
              case 2:
                return (
                  <Stack
                    padding={5}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}>
                    <DoneAllOutlined
                      sx={{
                        width: 70,
                        height: 70,
                        color: "#4af24a",
                      }}
                    />
                    <Typography>
                      Setup is done. You can now use the extension.
                    </Typography>
                    <Button
                      onClick={() => {
                        this.props.navigate("/");
                      }}
                      variant='contained'
                      color='secondary'
                      size='medium'
                      sx={{ marginTop: 2 }}>
                      Done
                    </Button>
                  </Stack>
                );

              default:
                return (
                  <ServerSetupForm
                    initialValues={data.server}
                    onComplete={this.onStepComplete}
                    onStepBack={this.onStepBack}
                    onSkipSetup={this.onSkipSetup}
                  />
                );
            }
          })()}
        </Stack>
        <Stack
          sx={{
            marginBottom: 2,
          }}>
          <Stepper
            alternativeLabel
            activeStep={this.state.currentStep}
            connector={<QontoConnector />}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Stack>
      </Container>
    );
  }
}

export default withNavigation(SetupPage);
