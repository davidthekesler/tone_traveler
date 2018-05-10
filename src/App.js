import React from 'react';

import Header from './components/Header/Header';
import ToneComponent from './components/ToneComponent/ToneComponent';

import 'typeface-roboto';

import './styles/main.css';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import withTheme from 'material-ui/styles/withTheme';

const muiTheme = createMuiTheme({
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary: {
      main: '#EA2',
    },
    secondary: {
      main: '#b2ebf2',
    }
  },
});



const App = () => (
  <MuiThemeProvider theme={muiTheme}>
    <div id="mainContainer" layout="vertical">
      <Header/>
      <ToneComponent />
    </div>
  </MuiThemeProvider>
);


export default withTheme() (App);
