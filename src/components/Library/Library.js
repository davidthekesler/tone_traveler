import React, { Component } from 'react';
import { connect } from 'react-redux';

import ToneComponent from '../../components/ToneComponent/ToneComponent';

import { USER_ACTIONS } from '../../redux/actions/userActions';

import Slider, { Range } from 'rc-slider';
// import Slider from 'material-ui/Slider';
import 'rc-slider/assets/index.css';


import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import { Delete } from 'material-ui-icons';
import MenuItem from 'material-ui/MenuItem';
import { PlayCircleFilled, Stop } from 'material-ui-icons';

import '../../styles/main.css';


const mapStateToProps = state => ({
  user: state.user,
  preset: state.preset
});

class Library extends Component {

  componentDidMount() {
    // this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    // console.log('here is props', this.props);
  }

  libraryRender = () => {
    if (this.props.user.userName) {
      let libraryArray = this.props.preset.allPresetsReducer.map((libraryItem) => {
        return (
          <Card key={libraryItem.id}>
              <div>{libraryItem.descriptionString}</div>
              <Delete onClick={() => this.props.handleDelete(libraryItem)} />
              <RaisedButton onClick={() => this.props.handleUpdate(libraryItem)}>Update</RaisedButton>
          </Card>
        )
      });
  
      return (
  
        <div>{libraryArray}</div>
      )//end return

  }//end conditional
  else {
    return (
    <div>Sign up to save your presets!</div>)
  }
}

  render() {

    // Stringify Example <pre>{JSON.stringify(this.props.preset.allPresetsReducer)}</pre>
    return (
      <div>{this.libraryRender()}</div>
    )

  }//end render

}

export default connect(mapStateToProps)(Library);

