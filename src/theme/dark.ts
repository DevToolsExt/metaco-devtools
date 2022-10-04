import { createTheme } from "@mui/material/styles";
import { defaultStyle } from "./default";

const theme = createTheme({
  ...defaultStyle,
  palette: {
    mode: "dark",
    primary: {
      main: "#022255",
    },
    secondary: {
      main: "#f35936",
    },
  },
});

export default theme;
