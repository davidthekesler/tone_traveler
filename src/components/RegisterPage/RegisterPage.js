import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginPage from '../../components/LoginPage/LoginPage';
// import { Link } from 'react-router-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
// import { withRouter } from 'react-router';

const mapStateToProps = state => ({
  // user: state.user,
  // login: state.login,
});

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      message: '',
      open: false,
      registered: false
    };
  }


  registerUser = (event) => {
    // event.preventDefault();

    if (this.state.username === '' || this.state.password === '') {
      this.setState({
        message: 'Choose a username and password!',
      });
    } else {
      const request = new Request('api/user/register', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
      });

      // making the request to the server to post the country
      fetch(request)
        .then((response) => {
          if (response.status === 201) {
            // this.props.history.push('/login');
            this.setState({
              registered: true
            });

          } else {
            this.setState({
              message: 'Ooops! That didn\'t work. The username might already be taken. Try again!',
            });
          }
        })
        .catch(() => {
          this.setState({
            message: 'Ooops! Something went wrong! Is the server running?',
          });
        });
    }
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  renderAlert() {
    if (this.state.message !== '') {
      return (
        <p
          className="alert"
          role="alert"
        >
          {this.state.message}
        </p>
      );
    }
    return (<h2>Register</h2>);
  }

  render() {

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Register"
        primary={true}

        onClick={this.registerUser}
      />,
    ];

    if (this.state.registered) {
      return (

        <LoginPage registered={true} />
      )
    }

    return (
      <div>
        <RaisedButton label="Sign Up" onClick={this.handleOpen} />
        <Dialog
          title={this.renderAlert()}
          actions={actions}
          modal={true}
          open={this.state.open}
        >

          <TextField
            hintText="username"
            name="username"
            value={this.state.username}
            onChange={this.handleInputChangeFor('username')}
          />
          <TextField
            hintText="password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChangeFor('password')}
          />
        </Dialog>
      </div>
    );
  }
}


// const RegisterPageWithRouter = withRouter(RegisterPage);

export default connect(mapStateToProps)(RegisterPage);

