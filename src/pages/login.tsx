import { Login } from "@mui/icons-material";
import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { Component } from "react";
import { withSnackbar, WithSnackbarType } from "../hoc/withSnackbar";

class LoginPage extends Component<WithSnackbarType> {
  state: Readonly<{ loading: boolean; publicKey: string; privateKey: string }> =
    {
      loading: false,
      publicKey: "",
      privateKey: "",
    };

  loginHandler = async () => {
    const { privateKey, publicKey, loading } = this.state;
    // alert(`${publicKey}:${privateKey}`);
    this.props.showSnackbar("Incorrect credentials", "error");
  };

  render() {
    const { privateKey, publicKey, loading } = this.state;
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}>
        <Stack
          padding={5}
          sx={{
            background: "#ffffff03",
            borderRadius: 5,
            minWidth: 300,
          }}>
          <Typography marginBottom={1} variant='h6' align='center'>
            User Credential
          </Typography>
          <Stack marginY={1}>
            <TextField
              id='outlined-basic'
              label='Public Key (Base 64 encoded)'
              variant='outlined'
              value={publicKey}
              onChange={(event) => {
                const publicKey = event.target.value;
                this.setState({
                  publicKey,
                });
              }}
            />

            <TextField
              id='outlined-basic'
              label='Private Key'
              variant='outlined'
              type='password'
              value={privateKey}
              onChange={(event) => {
                const privateKey = event.target.value;
                this.setState({
                  privateKey,
                });
              }}
            />
          </Stack>

          <Button
            variant='contained'
            endIcon={<Login />}
            onClick={this.loginHandler}>
            Login
          </Button>
        </Stack>
      </Container>
    );
  }
}

export default withSnackbar(LoginPage);
