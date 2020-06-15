import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { RecoilRoot } from 'recoil';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <div className="App">
        <RecoilRoot>
          <Router>
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Router>
        </RecoilRoot>
      </div>
    </React.Fragment>
  );
}

export default App;
