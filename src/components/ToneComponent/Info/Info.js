import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../../redux/actions/userActions';

import '../../../styles/main.css';

const mapStateToProps = state => ({
  user: state.user,
});

class Info extends Component {
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  }

  componentDidUpdate() {

  }

  render() {
    let content = 'Info Page - unauthenticated';

    if (this.props.user.userName) {
      content = (
        <div>
          <p>
            Info Page - authenticated
          </p>
        </div>
      );
    }

    return (
      <div>
        { content }
      </div>
    );
  }
}

export default connect(mapStateToProps)(Info);
