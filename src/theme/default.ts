import { ThemeOptions } from "@mui/material";

export const defaultStyle: ThemeOptions = {
  components: {
    MuiButton: {
      defaultProps: {
        size: "small",
      },
    },
    MuiFilledInput: {
      defaultProps: {
        margin: "dense",
      },
    },
    MuiFormControl: {
      defaultProps: {
        margin: "dense",
      },
    },
    MuiFormHelperText: {
      defaultProps: {
        margin: "dense",
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: "small",
      },
    },
    MuiInputBase: {
      defaultProps: {
        margin: "dense",
      },
    },
    MuiInputLabel: {
      defaultProps: {
        margin: "dense",
      },
    },
    MuiListItem: {
      defaultProps: {
        dense: true,
      },
    },
    MuiOutlinedInput: {
      defaultProps: {
        margin: "dense",
      },
      styleOverrides: {
        root: ({ theme }) => ({
          "&.Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.secondary.dark,
            },
            "&.MuiInputLabel-root": {
              color: `${theme.palette.secondary.dark} !important`,
            },
          },
        }),
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&.Mui-focused": {
            color: theme.palette.text.primary,
          },
        }),
      },
    },
    MuiFab: {
      defaultProps: {
        size: "small",
      },
    },
    MuiTable: {
      defaultProps: {
        size: "small",
      },
    },
    MuiTextField: {
      defaultProps: {
        margin: "dense",
      },
    },
    MuiToolbar: {
      defaultProps: {
        variant: "dense",
      },
    },
  },
  transitions: {
    easing: {
      // This is the most common easing curve.
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      // Objects enter the screen at full velocity from off-screen and
      // slowly decelerate to a resting point.
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      // Objects leave the screen at full velocity. They do not decelerate when off-screen.
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      // The sharp curve is used by objects that may return to the screen at any time.
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      // most basic recommended timing
      standard: 300,
      // this is to be used in complex animations
      complex: 375,
      // recommended when something is entering screen
      enteringScreen: 225,
      // recommended when something is leaving screen
      leavingScreen: 195,
    },
  },
};
