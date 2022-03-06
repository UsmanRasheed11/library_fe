import React from "react";
import { Provider } from "react-redux";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { ThemeProvider } from "styled-components/macro";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

import "./i18n";
import createTheme from "./theme";
import MyRoutes from "./routes";

import useTheme from "./hooks/useTheme";


function App({ store }) {
  const { theme } = useTheme();
  return (
    <HelmetProvider>
      <Helmet
        titleTemplate="%s | Library App"
        defaultTitle="Library Admin App"
      />
      <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MuiThemeProvider theme={createTheme(theme)}>
          <ThemeProvider theme={createTheme(theme)}>
            <MyRoutes />
          </ThemeProvider>
        </MuiThemeProvider>
        </LocalizationProvider>
      </Provider>
    </HelmetProvider>
  );
}

export default App;
