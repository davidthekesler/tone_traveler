import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginModal from '../LoginModal/LoginModal';
// import { Link } from 'react-router-dom';
import Dialog, { DialogTitle, DialogActions } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
// import { withRouter } from 'react-router';

const mapStateToProps = state => ({
  // user: state.user,
  // login: state.login,
});

class RegisterModal extends Component {
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
        <div>{this.state.message}</div>
      );
    }
    return (
      <div>Register</div>
    );
  }

  render() {

    if (this.state.registered) {
      return (
        <LoginModal registered={true} />
      )
    }

    return (
      <div>
        <Button variant="raised" onClick={this.handleOpen}>Sign Up</Button>
        <Dialog style={{ padding: '10px', margin: '10px' }}
          open={this.state.open}
        >
          <DialogTitle>{this.renderAlert()}</DialogTitle>

          <TextField
            required
            label="username"
            margin="normal"
            value={this.state.username}
            onChange={this.handleInputChangeFor('username')}
          />
          <TextField
            required
            label="password"
            margin="normal"
            value={this.state.password}
            onChange={this.handleInputChangeFor('password')}
          />
          <DialogActions>
            <Button
              onClick={this.handleClose}>Cancel</Button>
            <Button
              variant="raised"
              onClick={this.registerUser}>Register</Button>
          </DialogActions>
        </Dialog>
      </div >
    );
  }
}


export default connect(mapStateToProps)(RegisterModal);

