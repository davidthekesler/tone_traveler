import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { triggerLogin, formError, clearError } from '../../../redux/actions/loginActions';
import Dialog, { DialogTitle, DialogActions } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

import '../../../styles/main.css';

// import { withRouter } from 'react-router';


const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});

class LoginModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      open: false,
      registered: false
    };
  }

  componentWillMount() {
    if (this.props.registered) {
      this.setState({ open: true });
    }
  }

  componentDidMount() {
    this.props.dispatch(clearError());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.userName) {
      this.setState({ open: false });
      this.props.history.push('/player');
    }
  }

  login = (event) => {
    // event.preventDefault();

    if (this.state.username === '' || this.state.password === '') {
      this.props.dispatch(formError());
    } else {
      this.props.dispatch(triggerLogin(this.state.username, this.state.password));
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
    if (this.props.login.message !== '') {
      return (
        <Typography variant="display2"
        >
          {this.props.login.message}
        </Typography>
      );
    }
    return (
      <Typography variant="display2"
      >Log in
        </Typography>
    );
  }

  render() {


    return (
      <div>
        <Button onClick={this.handleOpen}>Log in</Button>
        <Dialog
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
            type="password"
            value={this.state.password}
            onChange={this.handleInputChangeFor('password')}
          />
          <DialogActions>
            <Button
              onClick={this.handleClose}>Cancel</Button>
            <Button
              variant="raised"
              onClick={this.login}>Log In</Button>
          </DialogActions>
        </Dialog>
      </div >
    );
  }

}

export default connect(mapStateToProps)(LoginModal);
