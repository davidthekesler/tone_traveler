import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../../redux/actions/userActions';

import Card from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import { PlayCircleFilled, PauseCircleFilled, VolumeUp } from 'material-ui-icons';
import IconButton from 'material-ui/IconButton';
import InfoHTML from '../../../components/ToneComponent/Info/InfoHTML/InfoHTML';




import '../../../styles/main.css';

const mapStateToProps = state => ({
  user: state.user,
});

class Info extends Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {

  }

  render() {


    return (
      <div id="#dashboardContainer">
        <Card>
          <div id="infoPagePlayStop">
            <div id="playStopButton">
              {this.props.isPlaying ? <IconButton><PauseCircleFilled color="primary" style={{ fontSize: 70 }} onClick={this.props.handleStop} /> </IconButton> : <IconButton><PlayCircleFilled color="primary" style={{ fontSize: 70 }} onClick={this.props.handleStart} /></IconButton>}
            </div>
          </div>
          <InfoHTML />
        </Card>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Info);
