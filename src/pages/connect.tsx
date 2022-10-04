import { Button, Container } from "@mui/material";
import { Component } from "react";
import Loading from "../components/progress";
import {
  MESSAGE_ACTIONS,
  MESSAGE_SOURCE,
} from "../controllers/messaging/types";
import { me } from "../controllers/profile/me";
import { getAppSettings } from "../controllers/settings/app";
import { withNavigation, WithNavigationType } from "../hoc/withNavigation";
import { sendMessage } from "../services/chrome";

class ConnectPage extends Component<WithNavigationType> {
  state: Readonly<{}> = {
    loading: true,
    hasSetup: false,
  };

  async componentDidMount(): Promise<void> {
    const settings = getAppSettings();

    if (!settings.me) {
      this.setState({
        loading: false,
        hasSetup: Boolean(settings.isLoggedIn),
      });
    }

    await me();

    sendMessage(
      MESSAGE_ACTIONS.CONNECTED,
      { ...settings.content },
      MESSAGE_SOURCE.ALL
    );

    window.close();

    // getValidJWT().then(() => {
    //   // setTimeout(() => {
    //   //   sendMessage(
    //   //     MESSAGE_ACTIONS.CONNECTED,
    //   //     {
    //   //       ...
    //   //     },
    //   //     MESSAGE_SOURCE.CONTENT
    //   //   );
    //   //   window.close();
    //   // }, 3000);
    // });
  }

  render() {
    const { loading, hasSetup } = this.state as any;
    return (
      <Container
        maxWidth='md'
        sx={{
          padding: "5px !important",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}>
        {loading ? (
          <Loading label='Connecting...' />
        ) : !hasSetup ? (
          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}>
            <Button
              variant='outlined'
              color='secondary'
              onClick={() => {
                const query = new URLSearchParams(
                  this.props.getLocation().search
                );
                this.props.navigate("/setup", {
                  state: {
                    noHeader: true,
                    server: {
                      server: query.get("host"),
                    },
                  },
                });
              }}>
              Connect Now
            </Button>
          </Container>
        ) : null}
      </Container>
    );
  }
}

export default withNavigation(ConnectPage, { noHeader: true });
