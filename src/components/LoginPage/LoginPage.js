import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { triggerLogin, formError, clearError } from '../../redux/actions/loginActions';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { withRouter } from 'react-router';


const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});

class LoginPage extends Component {
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
        <p
          className="alert"
          role="alert"
        >
          {this.props.login.message}
        </p>
      );
    }
    return (<h2>Log in</h2>);
  }

  render() 
  
  {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Login"
        primary={true}

        onClick={this.login}
      />,
    ];

    return (
      <div>
        <RaisedButton label="Login" onClick={this.handleOpen} />
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
      </div >
    );
  }

}

const LoginPageWithRouter = withRouter(LoginPage);
export default connect(mapStateToProps)(LoginPageWithRouter);
