import {
  Assignment,
  Event,
  KeyboardArrowRight,
  Logout,
  OpenInFull,
  Refresh,
} from "@mui/icons-material";
import KeyIcon from "@mui/icons-material/Key";
import {
  Alert,
  Button,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import moment from "moment";
import { Component } from "react";
import CopyButton from "../components/copyButton";
import {
  EventData,
  getLatestEvent,
} from "../controllers/domains/getLatestEvent";
import {
  AppSettings,
  getAppSettings,
  getLastestEventCache,
  setAppSettings,
  updateLatestEvent,
} from "../controllers/settings/app";
import { isSetupComplete, SettingsSetup } from "../controllers/settings/setup";
import { withNavigation, WithNavigationType } from "../hoc/withNavigation";
import { logoutUser } from "../services/auth/sessions";
import { isInPopUpMode } from "../utils/common";
import { maskMiddleStrings } from "../utils/strings";

class DashboardPage extends Component<WithNavigationType> {
  state: Readonly<{
    skipped: boolean;
    openSetup: boolean;
    currentSetup?: SettingsSetup;
    appSettings?: AppSettings;
  }> = {
    openSetup: false,
    skipped: true,
  };

  getMenu = () => [
    {
      label: "Generate Key-Pair",
      icon: KeyIcon,
      global: true,
      path: "/generateKeyPair",
    },
    {
      label: "Sign Message",
      icon: Assignment,
      global: true,
      path: "/sign",
    },
    {
      divider: true,
    },
    {
      label: "Expand View",
      icon: OpenInFull,
      global: true,
      action: async () => {
        window.open(
          `chrome-extension://${window.location.hostname}/index.html`,
          "_blank"
        );
      },
      showValidation: isInPopUpMode,
    },
    {
      label: "Refresh",
      icon: Refresh,
      global: false,
      action: async () => {
        setAppSettings({
          me: undefined,
        });
        this.props.navigate(window.location.href);
      },
      note: () => (
        <Typography
          sx={{
            textAlign: "right",
            color: "grey",
            fontSize: 12,
          }}>
          Last update <br />
          {moment(this.state.appSettings?.lastUpdate).format("lll")}
        </Typography>
      ),
    },
  ];

  fetchLatestEvent = async (domainId: string) => {
    const appSettings = getAppSettings();
    this.setState({
      appSettings: {
        ...appSettings,
        lastFetchedEventId: undefined,
      },
    });

    const lastEvent = getLastestEventCache(appSettings.selectedDomain.id!);
    const event = await getLatestEvent(domainId, lastEvent?.id);
    if (!event && !lastEvent) return;
    updateLatestEvent(domainId, (event ?? lastEvent) as EventData);

    this.setState({
      appSettings: getAppSettings(),
    });
  };

  componentDidMount = () => {
    const appSettings = getAppSettings();
    this.setState({
      appSettings,
    });

    const domainId = appSettings?.selectedDomain?.id;
    if (!domainId) return;

    const latestEvent = getLastestEventCache(domainId);
    if (latestEvent) {
      return;
    }
    this.fetchLatestEvent(appSettings.selectedDomain.id);
  };

  renderDomainMenu = () => {
    if (!this.state.appSettings?.selectedDomain?.id) return null;
    const latestEvent = getLastestEventCache(
      this.state.appSettings?.selectedDomain.id!
    );

    if (!latestEvent) return null;

    return (
      <List
        dense
        sx={{
          width: "100%",
          flexGrow: 0,
        }}
        subheader={
          <ListSubheader
            sx={{
              "&&": {
                lineHeight: "25px",
                marginTop: "8px",
              },
            }}
            component='div'
            id='domain-dashboard-menu'>
            Domain
          </ListSubheader>
        }>
        <ListItem
          secondaryAction={
            <IconButton
              disabled={
                this.state.appSettings?.lastFetchedEventId === undefined
              }
              onClick={() => {
                this.fetchLatestEvent(
                  this.state.appSettings?.selectedDomain?.id as any
                );
              }}
              color='secondary'>
              <Refresh />
            </IconButton>
          }>
          <ListItemIcon>
            <Event />
          </ListItemIcon>
          <ListItemText
            primary={
              <Stack
                sx={{
                  flexDirection: "row",
                  alignItems: "center",
                }}>
                <Typography>Latest Event ID</Typography>&nbsp;
                {this.state.appSettings?.lastFetchedEventId !== undefined && (
                  <Typography fontSize={12} color='rgba(255, 255, 255, 0.7)'>
                    {moment(latestEvent.savedAt).fromNow()}
                  </Typography>
                )}
              </Stack>
            }
            secondary={
              this.state.appSettings?.lastFetchedEventId === undefined ? (
                "Fetching..."
              ) : (
                <Stack sx={{ flexDirection: "row" }}>
                  {maskMiddleStrings(latestEvent.id, 16)}
                  <CopyButton size={18} onCopyClicked={() => latestEvent.id} />
                </Stack>
              )
            }
          />
        </ListItem>
        <Divider />
      </List>
    );
  };

  render() {
    return (
      <Container
        maxWidth='md'
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "calc(100vh - 48px)",
          padding: "0px !important",
        }}>
        {!isSetupComplete() && (
          <Alert
            variant='filled'
            severity='warning'
            sx={{
              margin: 1,
              justifyContent: "center",
              display: "flex",
              "& .MuiAlert-message": {
                width: "100%",
              },
            }}>
            <Typography variant='body2'>
              Complete the setup to maximize this dev tools features.
            </Typography>
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}>
              <Button
                color='primary'
                variant='contained'
                size='small'
                onClick={() => {
                  this.props.navigate("/setup", {
                    state: this.state.currentSetup,
                  });
                  // this.setState({
                  //   openSetup: true,
                  //   skipped: false,
                  // });
                }}>
                Setup
              </Button>
            </Stack>
          </Alert>
        )}

        {this.renderDomainMenu()}
        <List
          dense={false}
          sx={{
            width: "100%",
            flexGrow: 0,
            paddingBottom: 0,
          }}>
          {this.getMenu().map((menu, index: number) => {
            const {
              label,
              icon: Icon,
              path,
              divider,
              action,
              note,
              global,
              showValidation,
            } = menu as any;

            if (showValidation && !showValidation()) return null;

            if (divider) {
              return <Divider key={`divider-${index}`} />;
            }

            if (!global && !this.state.appSettings?.isLoggedIn) {
              return null;
            }

            return (
              <ListItemButton
                key={index}
                {...(path && {
                  onClick: () => {
                    this.props.navigate(path);
                  },
                })}
                {...(action && {
                  onClick: () => {
                    action();
                  },
                })}>
                <ListItemIcon>
                  {(() => (Icon ? <Icon /> : null))()}
                </ListItemIcon>
                <ListItemText primary={label} />
                {path && <KeyboardArrowRight />}
                {note && (typeof note === "string" ? note : note() ?? null)}
              </ListItemButton>
            );
          })}
        </List>
        {this.state.appSettings?.isLoggedIn && (
          <List
            dense
            sx={{
              width: "100%",
              flexGrow: 1,
              display: "flex",
              alignItems: "flex-end",
            }}>
            <ListItem
              secondaryAction={
                <Button
                  variant='text'
                  color='secondary'
                  endIcon={<Logout />}
                  onClick={() => {
                    logoutUser();
                    this.props.navigate(window.location.href);
                  }}>
                  Logout
                </Button>
              }>
              <ListItemText
                primary={
                  this.state.appSettings.selectedDomain.userReference.alias
                }
                secondary={
                  <Stack
                    sx={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}>
                    <Typography sx={{ fontSize: 12 }}>
                      {maskMiddleStrings(
                        this.state.appSettings.selectedDomain.userReference.id,
                        16
                      )}
                    </Typography>
                    <CopyButton
                      size={16}
                      onCopyClicked={() =>
                        this.state.appSettings!.selectedDomain.userReference.id
                      }
                    />
                  </Stack>
                }
              />
            </ListItem>
          </List>
        )}
      </Container>
    );
  }
}

export default withNavigation(DashboardPage, {
  noHeader: true,
});
