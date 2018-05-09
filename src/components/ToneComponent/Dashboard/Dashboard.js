import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../../redux/actions/userActions';

import Slider, { Range } from 'rc-slider';
// import Slider from 'material-ui/Slider';
import 'rc-slider/assets/index.css';
import Button from 'material-ui/Button';
import Select from 'material-ui/Select';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
// import MenuItem from 'material-ui/MenuItem';
import Menu, { MenuItem } from 'material-ui/Menu';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Knob from 'react-canvas-knob';
import Grid from 'material-ui/Grid';
// import Button from 'material-ui/Button';
import { PlayCircleFilled, Stop, VolumeUp } from 'material-ui-icons';

import ToneComponent from '../../../components/ToneComponent/ToneComponent';



import '../../../styles/main.css';


const mapStateToProps = state => ({
  user: state.user,
});

class Dashboard extends Component {

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });

  }

  userButtons = () => {

    if (this.props.isChanged && !this.props.isPreset) {
      return (
        <div>
          <div>
            <Button variant="raised" onClick={this.props.handleSaveToLibrary}>Save To Library</Button>
          </div>
          <div>
          </div>
        </div>
      )
    }
    else if (this.props.isChanged && this.props.isPreset) {
      return (
        <div>
          <div>
            <Button variant="raised" Button onClick={this.props.handleSaveChanges}>Save Changes</Button>
          </div>
          <div>
            <Button variant="raised" onClick={this.props.handleStartNew}>Make New</Button>
          </div>
        </div>
      )
    }
    else {
      return (
        <div>
          <div>
          </div>
          <div>
          </div>
        </div>
      )
    }
  }


  render() {

    // Stringify Example <pre>{JSON.stringify(this.props.preset.allPresetsReducer)}</pre>

    let soundMenu = this.props.soundsArray.map((sound) => {
      return (
        <MenuItem key={sound.id} value={sound.id}>{sound.dronetitle}</MenuItem>
      )
    });

    if (this.props.isLoaded) {
      return (
        <div>
          <Grid container
            spacing={24}
            direction='row'
            justify='center'>


            <Grid item xs={12}>
              <Card id="selectSoundContainer">
                <FormControl>
                  <div id="selectSound">
                  <InputLabel>Select Sound</InputLabel>
                  <Select 
                    value={this.props.droneId}
                    onChange={this.props.handleDrone}
                  >
                    <MenuItem value="0">
                      Select Sound
              </MenuItem>
                    {soundMenu}
                  </Select>
                  </div>
                </FormControl>
              </Card>
            </Grid>

            <Grid item xs={12} id="sliderBalanceContainer">
              <div id="sliderBalanceSubContainer">
                <div id="sliderBalanceLabel"><Typography>Balance:</Typography>
                </div>
                <div id="sliderBalance"><Slider
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
              </div>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <div id="sliderBinauralContainer">

                  <div id="sliderBalanceSubContainer">

                  <div id="sliderBinauralLabel">
                    {this.props.activeSystemDescription.title}
                  </div>

                  <div id="sliderBinaural">
                    <Knob
                      min={1}
                      max={30}
                      step={.1}
                      width={216}
                      height={216}
                      value={this.props.binauralVal}
                      onChange={this.props.handleBinaural}
                    />
                  </div>

                  <div id="sliderBinauralSpecificLabel">
                    <Typography variant="display1">{this.props.activeSystemDescription.optimal}
                    </Typography>
                  </div>
                  </div>

                </div>
              </Card>
            </Grid>

            <Grid item xs={4}>
              <Typography>Put notes dropdown here:</Typography>
            </Grid>
            <Grid item xs={4}>
              {this.props.isPlaying ? <Stop classname="playStopIcon" onClick={this.props.handleStop} /> : <PlayCircleFilled onClick={this.props.handleStart} />}
            </Grid>
            <Grid item xs={4}>
              <div id="sliderVolumeContainer">
                <div id="sliderVolume">
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
                <div id="sliderVolumeIcon">
                  <VolumeUp />
                </div>
              </div>
            </Grid>

            <Grid item xs={12}>
              {this.props.user.userName ? this.userButtons() : null}
            </Grid>

          </Grid>
        </div>
      )
    } else {
      return (
        <div id="#dashboardAndInfoDiv">
          <div class="loader"></div>
        </div>
      )
    }//end return conditionals
  }//end render
}

export default connect(mapStateToProps)(Dashboard);

