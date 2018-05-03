import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import ToneComponent from '../../components/ToneComponent/ToneComponent';

import { USER_ACTIONS } from '../../redux/actions/userActions';
// import { triggerLogout } from '../../redux/actions/loginActions';

import Slider, { Range } from 'rc-slider';
// import Slider from 'material-ui/Slider';
import 'rc-slider/assets/index.css';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { PlayCircleFilled, Stop } from 'material-ui-icons';

import '../../styles/main.css';


const mapStateToProps = state => ({
  user: state.user,
  description: state.description
});

class Dashboard extends Component {

  constructor () {
    super();

    this.state = {
      descriptionGeneral: '',
      tooMuch: '',
      tooLittle: '',
      optimal: ''
    }

  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    // console.log('here is props', this.props);
  }

  //TO-DO need to create conditional for isLoaded && user and isLoaded && no user and !isLoaded
  userButtons = () => {
    return (
      <div>
        <div>
          {!this.props.isPreset ?
            <RaisedButton onClick={this.props.handleSaveToLibrary}>Save To Library</RaisedButton> :
            <RaisedButton onClick={this.props.handleSaveChanges}>Save Changes</RaisedButton>}
        </div>
        <div>
          <RaisedButton onClick={this.props.handleStartNew}>Start New</RaisedButton>
        </div>
      </div>
    )
  };

  render() {

    // Stringify Example <pre>{JSON.stringify(this.props.preset.allPresetsReducer)}</pre>


    // let descriptionSpecific = () => {

    //     for (let description of this.props.description.allGeneralDescriptionsReducer) {
    //       if ((this.props.binauralVal >= description.min) && (this.props.binauralVal <= description.max)) {

    //         return (
    //             { title: description.title,
    //               description: description.description,
    //               toomuch: description.tooMuch,
    //               toolittle: description.toolittle,
    //               optimal: description.optimal
    //             }
    //         )
    //       }
    //     }
    // }
    // descriptionSpecific();
    // let descriptionMapped = this.props.description.allGeneralDescriptionsReducer.map((description) => {

    //     if ((this.props.binauralVal >= description.min) && (this.props.binauralVal <= description.max)) {

    //   return (
    //       description
    //   )
    // }
    // })


    if (this.props.isLoaded) {
      return (
        <div className="App">
          <SelectField
            floatingLabelText="Select Sound"
            value={this.props.droneId}
            onChange={this.props.handleDrone}
          >
            <MenuItem value={1} primaryText="Drone 1" />
            <MenuItem value={2} primaryText="Drone 2" />
            <MenuItem value={3} primaryText="Drone 3" />

          </SelectField>


          <div id="sliderBalance"> Balance Slider:
      <Slider
              min={-60}
              max={-5}
              step={1}
              value={this.props.balance}
              vertical={true}
              reverse={false}
              tooltip={true}
              onChange={this.props.handleBalance}
            />
          </div>

          {this.props.isPlaying ? <Stop onClick={this.props.handleStop} /> : <PlayCircleFilled onClick={this.props.handleStart} />}

          <div></div>

          <div id="sliderBinaural">Binaural Slider:
      <Slider
              min={1}
              max={30}
              step={.01}
              value={this.props.binauralVal}
              reverse={false}
              tooltip={true}
              onChange={this.props.handleBinaural}
            />
          </div>
          <div>Slider Value: {this.props.binauralVal}</div>
          <div>BinauralVal: {this.props.binauralVal}</div>
          <div id="sliderVolume"> Volume Slider:
      <Slider
              min={-60}
              max={0}
              step={1}
              value={this.props.masterVolume}
              reverse={false}
              tooltip={true}
              onChange={this.props.handleVolume}
            />
          </div>

          {this.props.user.userName ? this.userButtons() : null}

        

        </div>)
    } else {
      return <div class="loader"></div>
    }//end return conditionals
  }//end render
}

export default connect(mapStateToProps)(Dashboard);

