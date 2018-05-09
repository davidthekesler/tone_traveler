import React, { Component } from 'react';
import { connect } from 'react-redux';
import { triggerLogout } from '../../redux/actions/loginActions';

import LoginModal from './LoginModal/LoginModal';
import RegisterModal from './RegisterModal/RegisterModal';

import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';

import '../../styles/main.css';

const mapStateToProps = state => ({
  user: state.user,
});

class Header extends Component {

  logout = () => {
    this.props.dispatch(triggerLogout());
  }

  renderLoginItems() {

    if (!this.props.user.userName) {
      return (
        <div>
          <div id="loginOut">
            <LoginModal />
          </div>
          <div id="register">
            <RegisterModal />
          </div>
        </div>
      )
    }
    return (
      <div>
        <div id="loginOut">
          <Button onClick={this.logout}>Log Out</Button>
        </div>
        <div id="register">
        </div>
      </div>
    )
  }

  render() {
    return (
      <div id="header">
        <AppBar position="static" color="default">
          <Toolbar>
          <Typography variant="display3" gutterBottom>Tone Traveler</Typography>
          <div id="loginButtons">{this.renderLoginItems()}</div>
          </Toolbar>
        </AppBar>
      </div >


    )
  }

}//end Header Class


export default connect(mapStateToProps)(Header);
