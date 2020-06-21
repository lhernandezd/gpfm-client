import React from "react";
import { useSelector } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";

function App() {
  const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated);
  return (
    <>
      <CssBaseline />
      <div className="App">
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
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
