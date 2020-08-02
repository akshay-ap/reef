import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { MyProvider } from "./OceanContext";
import { Provider } from "react-redux";
import store from "./redux";
import { SnackbarProvider } from "notistack";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#37474f",
      light: "#62727b",
      dark: "#102027",
    },
    secondary: {
      main: "#ff9800",
      light: "#ffc947",
      dark: "#c66900",
    },
  },
  overrides: {
    // MuiPaper: {
    //   root: {
    //     padding: 5,
    //     textAlign: "center",
    //     color: "black",
    //     backgroundColor: "#ffffff",
    //   },
    // },
    MuiButton: {
      root: {
        padding: 5,
        textAlign: "center",
        color: "black",
        backgroundColor: "#ff9800",
      },
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <MyProvider>
        <Provider store={store}>
          <SnackbarProvider maxSnack={3}>
            <App />
          </SnackbarProvider>
        </Provider>
      </MyProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
