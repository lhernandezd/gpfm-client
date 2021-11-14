import React, { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { CssBaseline, CircularProgress, Typography } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import NotificationSnackbar from "./components/shared/NotificationSnackbar";
import CustomTheme from "./utils/theme";
import AppLayout from "./components/AppLayout";

const Login = lazy(() => import("./pages/Login/Login"));
const Home = lazy(() => import("./pages/Home/Home"));
const Users = lazy(() => import("./pages/Users/Users"));
const Patients = lazy(() => import("./pages/Patients/Patients"));
const Histories = lazy(() => import("./pages/Histories/Histories"));
const Entities = lazy(() => import("./pages/Entities/Entities"));
const Agreements = lazy(() => import("./pages/Agreements/Agreements"));
const Appointments = lazy(() => import("./pages/Appointments/Appointments"));

function App() {
  const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated);
  return (
    <ThemeProvider theme={CustomTheme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <CssBaseline />
        <div className="App">
          <NotificationSnackbar isAuthenticated={isAuthenticated} />
          <Suspense fallback={(
            <div style={{
              height: "100vh",
              display: "flex",
              flexGrow: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
            >
              <Typography variant="h2" component="h2">
                Loading .....
              </Typography>
              <CircularProgress size={100} />
            </div>
        )}
          >
            <Router>
              {isAuthenticated ? (
                <Redirect
                  to={{
                    pathname: "/home",
                  }}
                />
              ) : (
                <Redirect
                  to={{
                    pathname: "/login",
                  }}
                />
              )}
              <Switch>
                <Route path="/login" component={Login} />
                <AppLayout>
                  <Route exact path="/" component={Home} />
                  <Route path="/home" component={Home} />
                  <Route path="/users" component={Users} />
                  <Route path="/patients" component={Patients} />
                  <Route path="/histories" component={Histories} />
                  <Route path="/appointments" component={Appointments} />
                  <Route path="/entities" component={Entities} />
                  <Route path="/agreements" component={Agreements} />
                </AppLayout>
              </Switch>
            </Router>
          </Suspense>
        </div>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}

export default App;
