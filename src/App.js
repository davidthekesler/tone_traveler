import React from 'react';
// import {
//   BrowserRouter as Router,
//   Route,
//   Redirect,
//   Switch,
// } from 'react-router-dom';

import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import ToneComponent from './components/ToneComponent/ToneComponent';
// import Dashboard from './components/Dashboard/Dashboard';
// import Info from './components/Info/Info';
// import Typography from 'material-ui/Typography'
// import 'typeface-roboto';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';

// const muiTheme = getMuiTheme({
//   fontFamily: {
//     textColor: cyan500,
//   }

// });

import './styles/main.css';

const App = () => (
  <MuiThemeProvider>
    <div>
      <Header title="Tone Traveler" />
    </div>
    <div>
      <Nav/>
      </div>
      <div>
        <ToneComponent/>
        </div>
  </MuiThemeProvider>
);

export default App;
