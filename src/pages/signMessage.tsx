import {
  Alert,
  AlertTitle,
  Button,
  Container,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { Component } from "react";
import { signMessage } from "../controllers/keyManagement";
import {
  SignMessageForm,
  SignMessageFormValues,
} from "../forms/signMessageForm";
import { withNavigation } from "../hoc/withNavigation";

class SignMessagePage extends Component {
  state: Readonly<{
    signature: string;
    copied: boolean;
  }> = {
    signature: "",
    copied: false,
  };

  onSubmit = async (data: SignMessageFormValues) => {
    const response = await signMessage(data.privateKey, data.message);
    this.setState({
      signature: response.data.signature,
    });
  };

  render() {
    const { signature, copied } = this.state;
    return (
      <Container
        maxWidth='md'
        sx={{
          padding: "5px !important",
          display: "flex",
          flexDirection: "column",
        }}>
        {signature !== "" && (
          <Alert
            variant='filled'
            severity='success'
            action={
              <Stack>
                <Button
                  disabled={copied}
                  color='primary'
                  variant='contained'
                  onClick={() => {
                    this.setState({
                      copied: true,
                    });
                    navigator.clipboard.writeText(signature);
                    setTimeout(() => {
                      this.setState({
                        copied: false,
                      });
                    }, 500);
                  }}>
                  {copied ? "Copied" : "Copy"}
                </Button>
                <Button
                  color='inherit'
                  onClick={() => {
                    this.setState({
                      signature: "",
                    });
                  }}>
                  Clear
                </Button>
              </Stack>
            }>
            <AlertTitle>Signature</AlertTitle>
            <Typography
              sx={{
                wordBreak: "break-word",
              }}>
              {signature}
            </Typography>
          </Alert>
        )}
        <SignMessageForm
          onSubmit={this.onSubmit}
          disabled={Boolean(signature !== "")}
        />
      </Container>
    );
  }
}

export default withNavigation(SignMessagePage);
