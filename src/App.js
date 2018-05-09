import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from './components/Header/Header';
import ToneComponent from './components/ToneComponent/ToneComponent';

import 'typeface-roboto';

import './styles/main.css';

import { createMuiTheme } from 'material-ui/styles';
import withTheme from 'material-ui/styles/withTheme';

const muiTheme = createMuiTheme({
  fontFamily: 'Roboto, sans-serif',
  palette: {

    primary: {
      light: '#b2ebf2',
      main: '#e5ffff',
      dark: '#81b9bf',
    },
    secondary: {
      light: '#ffeb3b',
      main: '#ffff72',
      dark: '#c8b900',
    },
  },
});



const App = () => (
  <MuiThemeProvider>
    <div id="mainContainer" layout="vertical">
      <Header/>
      <ToneComponent />
    </div>
  </MuiThemeProvider>
);


export default withTheme() (App);
