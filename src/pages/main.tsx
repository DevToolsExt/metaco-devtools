import { MenuItem, Select, Stack } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { Box } from "@mui/system";
import Cookies from "js-cookie";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Loading from "../components/progress";
import ChromeMessage from "../controllers/messaging/receiver";
import { Me, me } from "../controllers/profile/me";
import { getAppSettings, setAppSettings } from "../controllers/settings/app";
import { withNavigation, WithNavigationType } from "../hoc/withNavigation";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function MainApp({ navigate }: WithNavigationType) {
  const [isHarmonize, setIsHarmonize] = React.useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [domains, setDomains] = React.useState<Me["domains"]>([]);

  const location = useLocation();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const checkSession = async () => {
    try {
      const appSettings = getAppSettings();
      let meData = appSettings.me;
      if (!meData) {
        meData = await me();
      }
      setIsLoggedIn(true);
      const selectedDomain = appSettings.selectedDomain ?? meData?.domains[0];
      setAppSettings({
        isLoggedIn: true,
        lastUpdate: new Date(),
        me: meData,
        selectedDomain,
      });
      setDomains(meData?.domains ?? []);
    } catch (error) {
      setIsLoggedIn(false);
      setAppSettings({
        isLoggedIn: false,
      });
    } finally {
      setLoading(false);
    }
  };

  if (location.hash.includes("popup")) {
    document.body.classList.add("popupMode");
  } else if (location.hash.includes("connect")) {
    navigate(location.hash.slice(1));
  }

  React.useEffect(() => {
    new ChromeMessage().init();

    chrome.tabs &&
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true,
        },
        (tabs) => {
          const [currentTab] = tabs;
          if (currentTab.title !== "Harmonize") {
            setIsHarmonize(false);
            return;
          }
          setIsHarmonize(true);

          const tabId = currentTab.id as number;

          Cookies.set("metacoTabId", tabId.toString());

          // const url = new URL(currentTab.url!);

          // chrome.tabs.sendMessage(
          //   currentTab.id!,
          //   {
          //     data: {
          //       action: "init",
          //     },
          //   },
          //   (response) => {
          //     console.log(response);
          //     callback();
          //   }
          // );
        }
      );

    checkSession();
  }, []);

  return (
    <>
      <AppBar
        position='static'
        color='primary'
        enableColorOnDark
        sx={{
          boxShadow: 0,
        }}>
        <Container
          maxWidth='xl'
          sx={{
            padding: "0px !important",
          }}>
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1 }} />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                height: 40,
                padding: "5px",
                flexGrow: 1,
              }}>
              <img
                src={window.location.origin + "/brand.png"}
                width='auto'
                height='100%'></img>
            </Box>
            {/* <Typography
              variant='h6'
              noWrap
              component='a'
              href='/'
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                letterSpacing: ".2rem",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}>
              Metaco Dev Tools
            </Typography> */}

            {/* <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                color='inherit'>
                <MenuIcon />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}>
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign='center'>{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box> */}
            {/* <Typography
              variant='h5'
              noWrap
              component='a'
              href='/'
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "inherit",
                textDecoration: "none",
              }}>
              Metaco Dev Tools
            </Typography> */}
            {/* <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}>
                  {page}
                </Button>
              ))}
            </Box> */}

            {/* <Box sx={{ flexGrow: 0 }}>
              <Tooltip title='Open settings'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}>
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign='center'>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box> */}
            {Boolean(domains.length) && (
              <Box sx={{ flexGrow: 0, marginLeft: 1, marginRight: 1 }}>
                <Select
                  sx={{
                    ".MuiSelect-select": {
                      padding: "5px 14px",
                    },
                  }}
                  value={getAppSettings().selectedDomain.id ?? domains[0].id}
                  onChange={(event) => {
                    setAppSettings({
                      selectedDomain: domains.find(
                        (d) => d.id === event.target.value
                      ),
                    });
                    navigate(window.location.href);
                  }}
                  inputProps={{ "aria-label": "Without label" }}>
                  {domains.map((d) => (
                    <MenuItem value={d.id}>{d.alias}</MenuItem>
                  ))}
                </Select>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Stack
        sx={{
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
        }}>
        <Container
          sx={{
            margin: 0,
            height: "calc(100vh - 48px)",
            overflow: "hidden",
            padding: "0px !important",
          }}>
          {isLoading ? <Loading label='loading' /> : <Outlet />}
        </Container>
      </Stack>
    </>
  );
}

export default withNavigation(MainApp, { noHeader: true });
