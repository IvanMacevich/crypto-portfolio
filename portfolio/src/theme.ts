import { createTheme } from "@mui/material/styles";
import type {} from "@mui/x-data-grid/themeAugmentation";

export const theme = createTheme({
  typography: {
    fontFamily: "Roboto Mono, Helvetica, Arial, sans-serif",
  },

  palette: {
    mode: "dark",
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#EBB94E",
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

    MuiDataGrid: {
      styleOverrides: {
        root: {
          backgroundColor: "#3B3838",
          borderRadius: 20,
          fontSize: 20,
        },
        row: {
          borderRadius: "8px", // или другой радиус скругления, который вам подходит
          backgroundColor: "#fff1",
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
