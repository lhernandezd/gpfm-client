import { createTheme } from "@material-ui/core/styles";

const CustomTheme = createTheme({
  palette: {
    primary: {
      main: "#00897b",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundColor: "#eaedef",
        },
      },
    },
  },
});

export default CustomTheme;
