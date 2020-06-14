import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import Login from './pages/Login/Login';

function App() {
  return (
    <React.Fragment>
    <CssBaseline />
      <div className="App">
        <Login />
      </div>
    </React.Fragment>
  );
}

export default App;
