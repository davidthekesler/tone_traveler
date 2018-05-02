import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

import LoginPage from '../../components/LoginPage/LoginPage';
import RegisterPage from '../../components/RegisterPage/RegisterPage';

// import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';


const mapStateToProps = state => ({
  user: state.user,
});


class Nav extends Component {

  logout = () => {
    this.props.dispatch(triggerLogout());
    // this.props.history.push('home');
  }

  renderLoginItems() {

    if (!this.props.user.userName) {
      return (
        <span><RegisterPage/><LoginPage/></span>
      )
    }
    return (
      <span><RaisedButton onClick={this.logout}>Log Out</RaisedButton></span>
    )
  }

  render() {


    return (

        <div>{this.renderLoginItems()}</div>
 
);

  }

}
export default connect(mapStateToProps)(Nav);
