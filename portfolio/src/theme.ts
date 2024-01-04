import { grey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: grey[800],
      light: grey[200],
      dark: grey[800],
    },
    secondary: {
      main: "#ebb94c",
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          "&:-webkit-autofill": {
            WebkitBoxShadow: "inset 0 0 0 50px #3b3b3b !important",
          },
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        h6: {
          textDecoration: "none",
        },
      },
    },
  },
});
