import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './ToneComponent.css';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import Tone from 'tone';

Tone.context.latencyHint = 'playback';

class App extends Component {

  constructor() {
    super();
    this.state = {
      freq1: 138.59,
      binauralVal: 1,
      masterVolume: 0,
      synth1volume: -60,
      synth2volume: -60,
      playerVol: {},
      playerVolume: -5,
      balance: 50,
      isLoaded: false,
      playerBuffer: {},
      synth1: {},
      synth2: {},
      panVol1: -1,
      panVol2: 1,
      player: {},
      
    }//end state
  }//end constructor

  componentWillMount() {

  }//end componentWillMount

  componentDidMount() {
    const droneSamples = new Tone.Buffers({
      "Int3": "drones/Int3.mp3",
      "Int4": "drones/Int3.mp3",
      "Int5": "drones/Int3.mp3",

    }, () => {
      // console.log('audio buffers loaded');
      const synth1 = new Tone.Synth({
        "oscillator": {
          "type": "sine"
        },
        "envelope": {
          "attack": .20,
          "decay": 0
        }
      }
      );

      const panVol1 = new Tone.PanVol(-1, this.state.synth1volume).toMaster();

      const synth2 = new Tone.Synth({
        "oscillator": {
          "type": "sine"
        },
        "envelope": {
          "attack": .20,
          "decay": 0
        }
      }
      );

      const panVol2 = new Tone.PanVol(1, this.state.synth2volume).toMaster();

      // synth2.pan.value = 1;
      // synth2.volume.value = this.state.synth2volume;

      const player = new Tone.Player();
      player.loop = true;
      
      const playerVol = new Tone.Volume(this.state.playerVolume).toMaster();
      //end player setup.

      this.setState({
        isLoaded: true,
        playerBuffer: droneSamples,
        synth1: synth1,
        panVol1: panVol1,
        synth2: synth2,
        panVol2: panVol2,
        player: player,
        playerVol: playerVol
      })

      this.state.synth1.connect(this.state.panVol1);
      this.state.synth2.connect(this.state.panVol2);
      this.state.player.connect(this.state.playerVol);
      // console.log('droneSamples: ', droneSamples);
      // console.log('state playerBuffer:', this.state.playerBuffer);
    });
  }//end componentDidMount

  handleStart = () => {

    let freq1 = this.state.freq1 - (this.state.binauralVal / 2);
    let freq2 = this.state.freq1 + (this.state.binauralVal / 2);
    this.state.synth1.triggerAttack(freq1);
    this.state.synth2.triggerAttack(freq2);
    this.state.player.buffer = this.state.playerBuffer.get("Int3");
    this.state.player.start();

  }//end handleStart

  handleStop = () => {

    this.state.synth1.triggerRelease();
    this.state.synth2.triggerRelease();
    this.state.player.stop();

  }//end handleStop

  handleBinaural = (value) => {
    //stores slider value in state as binauralVal, re-assigns synth 1 and 2 notes to 
    //pitch diverge to a total equaling binauralVal
    this.setState({
      binauralVal: value
    });
    let freq1 = this.state.freq1 - (this.state.binauralVal / 2);
    let freq2 = this.state.freq1 + (this.state.binauralVal / 2);
    this.state.synth1.setNote(freq1);
    this.state.synth2.setNote(freq2);
  }

  handleVolume = (value) => {
    this.setState({
      masterVolume: value
    });
    Tone.Master.volume.rampTo(this.state.masterVolume, .01);
    console.log(this.state.masterVolume);
  }

  handleBalance = (value) => {

    let synthVolume = (-60) - (5 + value);

    console.log(synthVolume);

      this.setState({
        balance: value,
        synth1volume: synthVolume,
        synth2volume: synthVolume,
        playerVolume: value
      });

    this.state.panVol1.volume.rampTo(this.state.synth1volume);
    this.state.panVol2.volume.rampTo(this.state.synth2volume);
    this.state.playerVol.volume.rampTo(this.state.playerVolume);
  }

  render() {

    if (this.state.isLoaded) {
      return (
        <div className="App">
          <div id="sliderBalance"> Balance Slider:
      <Slider
              min={-60}
              max={-5}
              step={1}
              value={this.state.balance}
              vertical={true}
              reverse={false}
              tooltip={true}
              onChange={this.handleBalance}
            />
          </div>
          <button onClick={this.handleStart}>Play</button>
          <button onClick={this.handleStop}>Stop</button>
          <div id="sliderBinaural">Binaural Slider:
      <Slider
              min={1}
              max={40}
              step={1}
              value={this.state.binauralVal}
              reverse={false}
              tooltip={true}
              onChange={this.handleBinaural}
            />
          </div>
          <div>Slider Value: {this.state.binauralVal}</div>
          <div>BinauralVal: {this.state.binauralVal}</div>
          <div id="sliderVolume"> Volume Slider:
      <Slider
              min={-60}
              max={0}
              step={1}
              value={this.state.masterVolume}
              reverse={false}
              tooltip={true}
              onChange={this.handleVolume}
            />
          </div>

        </div>)
    } else {
      return <div>Loading...</div>
    }//end return conditionals

  }//end render

}//end App component

export default App;