import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import SignIn from './components/account/SignIn';

import ReallosLogo from './assets/reallos-logo.svg';
import './App.css';

const theme = createMuiTheme({
  palette: {
      primary: {
          main: '#150578',
      },
      secondary: {
          main: '#92DCE5'
      }
  }
});

function App() {
  let [signInModalVisible, setSignInModalVisibility] = useState(false);
  
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <div id="app-container">
          <img src={ReallosLogo} alt="Reallos" />

          <Button variant="contained" onClick={() => setSignInModalVisibility(true)}>
            Sign In
          </Button>
        </div>

        <SignIn visible={signInModalVisible.toString()} />
      </div>
    </ThemeProvider>
  );
}

export default App;
