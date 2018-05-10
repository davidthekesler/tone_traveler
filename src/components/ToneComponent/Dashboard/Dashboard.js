import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../../redux/actions/userActions';

import Slider, { Range } from 'rc-slider';
// import Slider from 'material-ui/Slider';
import 'rc-slider/assets/index.css';
import Button from 'material-ui/Button';
import Select from 'material-ui/Select';
import Card from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Menu, { MenuItem } from 'material-ui/Menu';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Knob from 'react-canvas-knob';
import Grid from 'material-ui/Grid';
import Trend from 'react-trend';
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

  saveButton = () => {
    if (this.props.isChanged && !this.props.isPreset) {
      return (
        <Button color="secondary" style={{ fontSize: 10 }} variant="raised" onClick={this.props.handleSaveToLibrary}>Save To Library</Button>
      )
    } else if (this.props.isChanged && this.props.isPreset) {
      return (
        <div>
          <Button color="secondary" style={{ fontSize: 10 }} variant="raised" onClick={this.props.handleSaveChanges}>Save Changes</Button>
        </div>
      )
    } else if (!this.props.isChanged && !this.props.isPreset) {
      return (
        <Button disabled color="secondary" style={{ fontSize: 10 }} variant="raised">Save To Library</Button>
      )
    } else if (!this.props.isChanged && this.props.isPreset) {
      return (
        <Button color="secondary" style={{ fontSize: 10 }} variant="raised">Save Changes</Button>
      )
    }
  }

  startNewButton = () => {

    if (this.props.isChanged && this.props.isPreset) {
      return (
        <Button variant="raised" onClick={this.props.handleStartNew}>Start New</Button>
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
        <Card>
          <div id="#dashboardContainer">
            <Grid container spacing={24}>

              <Grid item xs={4}>
                <div class="userButtonDiv">
                  {this.props.user.userName ? this.startNewButton() : null}
                </div>
              </Grid>

              <Grid item xs={4}>
                <div id="selectSound">
                  <FormControl>
                    <Select
                      value={this.props.droneId}
                      onChange={this.props.handleDrone}
                    >
                      <MenuItem value="0">
                        Select Sound
                      </MenuItem>
                      {soundMenu}
                    </Select>
                  </FormControl>
                </div>
              </Grid>

              <Grid item xs={4}>
                <div class="userButtonDiv">
                  {this.props.user.userName ? this.saveButton() : null}
                </div>
              </Grid>

              <Grid item xs={12}>
                <div id="sliderBinauralContainerBig">

                  <div id="sliderBinauralSpecificLabel">
                    <Typography variant="caption">{this.props.activeSystemDescription.optimal}
                    </Typography>
                  </div>

                  <div id="trendContainer">{this.props.isPlaying ? <Trend
                    smooth
                    autoDraw
                    autoDrawDuration={3000}
                    autoDrawEasing="ease-out"
                    data={[this.props.binauralVal, 2, this.props.binauralVal - 2, this.props.binauralVal - 12, this.props.droneId * 5, this.props.binauralVal + 5, 5, 0, this.props.binauralVal, 1, 8, 2, 9, 0]}
                    gradient={['#b2ebf2', '#FF8E53']}
                    radius={10.2}
                    strokeWidth={5}
                    strokeLinecap={'butt'}
                  /> : null}
                  </div>


                  <div id="sliderBinauralContainer">

                    <div id="sliderBinauralLabel">
                      <Typography variant="display1">{this.props.activeSystemDescription.title}</Typography>
                    </div>
                    <div id="sliderBinaural">
                      <Knob
                        min={1}
                        max={19}
                        step={.1}
                        width={250}
                        height={250}
                        bgColor={'#EEE'}
                        fgColor={'#f7a04f'}
                        angleArc={180}
                        angleOffset={270}
                        value={this.props.binauralVal}
                        onChange={this.props.handleBinaural}
                      />
                    </div>
                  </div>
                </div>
              </Grid>

              <Grid item xs={4}>
                <div id="sliderBalanceContainer">
                  <div id="sliderBalance"><Slider
                    min={-60}
                    max={-5}
                    step={1}
                    value={this.props.balance}
                    vertical={false}
                    reverse={false}
                    tooltip={true}
                    onChange={this.props.handleBalance}
                  />
                  </div>
                </div>
              </Grid>

              <Grid item xs={4}>
                <div id="playStopButton">
                  {this.props.isPlaying ? <Stop color="secondary" style={{ fontSize: 50 }} onClick={this.props.handleStop} /> : <PlayCircleFilled color="primary" style={{ fontSize: 50 }} onClick={this.props.handleStart} />}
                </div>
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
                    <VolumeUp color="secondary" />
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </Card>

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

