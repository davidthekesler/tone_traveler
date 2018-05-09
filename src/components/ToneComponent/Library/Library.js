import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../../redux/actions/userActions';

import Slider, { Range } from 'rc-slider';
// import Slider from 'material-ui/Slider';
import 'rc-slider/assets/index.css';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

import Drawer from 'material-ui/Drawer';
import { Delete } from 'material-ui-icons';
import { PlayCircleFilled, Stop } from 'material-ui-icons';

import ToneComponent from '../../../components/ToneComponent/ToneComponent';

import '../../../styles/main.css';


const mapStateToProps = state => ({
  user: state.user,
  preset: state.preset,
  library: state.library
});

class Library extends Component {


  libraryRender = () => {
    if (this.props.user.userName) {
      
      if (this.props.library.length === 0 ) {
          return (
              <div style={{padding: '10px'}}><Typography variant="body1">Your saved presets will appear here.</Typography></div>
          )
      } else {
      let libraryArray = this.props.library.map((libraryItem) => {
        return (
          <div>

            <Card style={{padding: '10px'}} key={libraryItem.id}>
              <div>{libraryItem.descriptionString}</div>
              <div>{libraryItem.title}, {libraryItem.binauralval} Hz</div>
              <div>{libraryItem.description}</div>
              <Delete onClick={() => this.props.handleDelete(libraryItem)} />
              <Button variant="raised" onClick={() => this.props.handleLoad(libraryItem)}>Load</Button>
            </Card>
          </div>
        )
      });


      return (
        
        <div>{libraryArray}</div>
      )//end return
    }
    }


    else {
      return (
              <div style={{padding: '10px'}}><Typography  variant="body1">Sign up to save your presets!</Typography></div>)
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

