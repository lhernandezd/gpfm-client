import React, { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { CssBaseline, CircularProgress, Typography } from "@material-ui/core";
import "./App.css";
import NotificationSnackbar from "./components/NotificationSnackbar";

const Home = lazy(() => import("./pages/Home/Home"));
const Login = lazy(() => import("./pages/Login/Login"));

function App() {
  const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated);
  return (
    <>
      <CssBaseline />
      <div className="App">
        <NotificationSnackbar />
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
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/home">
                <Home />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Suspense>
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
