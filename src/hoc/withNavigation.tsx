import { KeyboardArrowLeft } from "@mui/icons-material";
import { AppBar, Button, Stack, Toolbar } from "@mui/material";
import React from "react";
import {
  Location,
  NavigateFunction,
  useLocation,
  useNavigate,
} from "react-router-dom";

export type WithNavigationType = {
  backToMain: () => void;
  navigate: NavigateFunction;
  getCurrentState: <T>() => T;
  getLocation: () => Location;
};

export const withNavigation = (
  ChildComp: React.ComponentType<any | string>,
  defaultProps?: {
    noHeader?: boolean;
  }
) => {
  const { noHeader } = defaultProps ?? {};
  const NavigationWrapper = (props: any) => {
    const navigate = useNavigate();
    const location = useLocation();

    const backToMain = () => {
      navigate("/");
    };

    const getCurrentState = () => location.state;

    return (
      <>
        {!noHeader && !location.state?.noHeader && (
          <AppBar position='static'>
            <Toolbar>
              <Button
                onClick={backToMain}
                disableRipple
                disableFocusRipple
                disableTouchRipple
                variant='text'
                color='inherit'
                startIcon={<KeyboardArrowLeft />}>
                Back
              </Button>
            </Toolbar>
          </AppBar>
        )}
        <Stack
          sx={{
            display: "flex",
            height: `calc(100vh - ${noHeader ? 0 : 48}px)`,
            overflow: "hidden",
          }}>
          <Stack
            sx={{
              height: "100%",
              width: "100%",
            }}>
            <ChildComp
              {...props}
              navigate={navigate}
              backToMain={backToMain}
              getCurrentState={getCurrentState}
              getLocation={() => location}
            />
          </Stack>
        </Stack>
      </>
    );
  };

  return NavigationWrapper;
};
