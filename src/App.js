import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import Info from './components/Info/Info';
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
      <Router>
        <div>
          <Switch>
            <Redirect exact from="/" to="/dashboard" />
            <Route
              path="/dashboard"
              component={Dashboard}
            />
            <Route
              path="/info"
              component={Info}
            />
            {/* OTHERWISE (no path!) */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
        </div>
      </Router>
    </div>
  </MuiThemeProvider>
);

export default App;
