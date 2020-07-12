import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import Main from './components/MainComponent';
import './App.css';

const theme = createMuiTheme({
  palette: {
      primary: {
          main: '#150578',
      },
      secondary: {
          main: '#21DAF1'
      },
      common: {
        white: '#ffffff',
        black: '#000000',
      },
      success: {
        main: '#01AE4B'
      },
      error: {
        main: '#EB0000'
      },
      warning: {
        main: '#F6AC00'
      },
  }
});

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Main />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
