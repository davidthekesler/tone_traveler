import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../../redux/actions/userActions';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Select from 'material-ui/Select';
import Card from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Dialog, { DialogActions } from 'material-ui/Dialog';
import TextField from 'material-ui/TextField'
import Menu, { MenuItem } from 'material-ui/Menu';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Knob from 'react-canvas-knob';
import Grid from 'material-ui/Grid';
import Trend from 'react-trend';
import { PlayCircleFilled, PauseCircleFilled, VolumeUp } from 'material-ui-icons';

import '../../../styles/main.css';


const mapStateToProps = state => ({
  user: state.user,
  description: state.description

});

class Dashboard extends Component {

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });

  }

  saveButton = () => {
    if (this.props.isChanged && !this.props.isPreset) {
      return (
        <div class="notesButtonDiv">
          <Button color="secondary" style={{ fontSize: 10 }} variant="raised" onClick={this.props.handleSaveToLibrary}>Save To Library</Button>
        </div>
      )
    } else if (this.props.isChanged && this.props.isPreset) {
      return (
        <div>
          <div class="notesButtonDiv">
            <Button color="secondary" style={{ fontSize: 10 }} variant="raised" onClick={this.props.handleSaveChanges}>Save Changes</Button>
            <Button style={{ fontSize: 10 }} variant="raised" onClick={this.props.handleStartNew}>Start New</Button>
          </div>
        </div>
      )
    } else if (!this.props.isChanged && this.props.isPreset) {
      return (
        <div>
          <div class="notesButtonDiv">
            <Button disabled color="secondary" style={{ fontSize: 10 }} variant="raised" onClick={this.props.handleSaveChanges}>Save Changes</Button>
            <Button style={{ fontSize: 10 }} variant="raised" onClick={this.props.handleStartNew}>Start New</Button>
          </div>
        </div>
      )
    } else if (!this.props.isChanged && !this.props.isPreset) {
      return (
        <div class="notesButtonDiv">
          <Button disabled color="secondary" style={{ fontSize: 10 }} variant="raised">Save To Library</Button>
        </div>
      )

    }
  }

  notesDialog = () => {

    return (
      <div>
        <Button color="secondary" style={{ fontSize: 10 }} variant="raised" onClick={this.props.handleNotesOpen}>Notes</Button>
        <Dialog
          open={this.props.dialogOpen}
        >
          <Card>
            <div id="notesDialogDiv">
              <Typography variant="display1">
                {this.props.activeSystemDescription.title} - {this.props.binauralVal} Hz
              </Typography>
              <br />
              <Typography variant="caption">
                Optimal amounts - {this.props.activeSystemDescription.optimal}
              </Typography>
              <Typography variant="caption">
                Too much - {this.props.activeSystemDescription.toomuch}
              </Typography>
              <Typography variant="caption">
                Too little - {this.props.activeSystemDescription.toolittle}
              </Typography>
              <br />
              <Typography variant="headline">
                Your Notes
            </Typography>
              <TextField
                fullWidth
                multiline
                rowsMax="4"
                margin="normal"
                value={this.props.descriptionString}
                onChange={this.props.handleInputChangeFor('descriptionString')}
              />
              <DialogActions>
                <Button style={{ fontSize: 10 }} variant="raised" onClick={this.props.handleNotesClose}>OK</Button>
              </DialogActions>
            </div>
          </Card>
        </Dialog>
      </div >
    )
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
        <Grid container spacing={8} justify="center" alignItems="center" direction="row">
          <Grid item xs={9}>
            <Card>
              <Grid container spacing={24}>
                <Grid item xs={4}>
                  <div class="notesButtonDiv">
                    {this.props.user.userName ? this.notesDialog() : null}
                  </div>
                </Grid>

                <Grid item xs={4}>
                  <div id="selectSound">
                    <FormControl style={{minWidth: 180}}>
                    <InputLabel htmlFor="selectDrone">Select Soundscape</InputLabel>
                      <Select id="selectDrone"
                        value={this.props.droneId}
                        onChange={this.props.handleDrone}
                      >
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
                    <div id="trendContainer">
                      <Trend
                        smooth
                        autoDraw
                        autoDrawDuration={50}
                        autoDrawEasing="ease-out"
                        data={[this.props.binauralVal + 2, this.props.balance + 25, this.props.binauralVal + 12, this.props.binauralVal + 5, 12, this.props.binauralVal + 5, this.props.balance, this.props.balance + 22  , this.props.binauralVal, this.props.balance, 10, this.props.binauralVal + 2, this.props.balance, this.props.binauralVal - 2,]}
                        gradient={['#b2ebf2', '#FF8E53']}
                        radius={10.2}
                        strokeWidth={5}
                        strokeLinecap={'butt'}
                      />
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
                      min={-25}
                      max={0}
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
                    {this.props.isPlaying ? <IconButton><PauseCircleFilled color="primary" style={{ fontSize: 70 }} onClick={this.props.handleStop} /> </IconButton> : <IconButton><PlayCircleFilled color="primary" style={{ fontSize: 70 }} onClick={this.props.handleStart} /></IconButton>}
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
            </Card>

          </Grid>
        </Grid>


      )
    } else {
      return (
        <div id="#dashboardAndInfoDiv">
          <div class="loader"></div>
        </div>
      )
    }//end return conditionals
  }//end render
}//end Dashboard component

export default connect(mapStateToProps)(Dashboard);

