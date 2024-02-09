import "./firebase.js";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const theme = createTheme({
  typography: {
    fontFamily: "Rubik, sans-serif",
  },
  palette: {
    primary: {
      //#E9F1FA  center
      //#00ABE4   up
      //  #000000
      main: "#00abe4",
      contrastText: "#fff",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App id="app" />
    </ThemeProvider>
  </React.StrictMode>
);
