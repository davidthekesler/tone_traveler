import React, { Component } from 'react';
import { connect } from 'react-redux';

// import ReactDOM from 'react-dom';
import './ToneComponent.css';

import Dashboard from '../../components/Dashboard/Dashboard';
import Info from '../../components/Info/Info';
import Library from '../../components/Library/Library';

// import Slider, { Range } from 'rc-slider';
// import 'rc-slider/assets/index.css';
import RaisedButton from 'material-ui/RaisedButton';


import Tone from 'tone';

Tone.context.latencyHint = 'playback';

let droneSamples = {};

let synth1 = new Tone.Synth({
    "oscillator": {
        "type": "sine"
    },
    "envelope": {
        "attack": .20,
        "decay": 0
    }
}
);

let panVol1 = new Tone.PanVol().toMaster();

let synth2 = new Tone.Synth({
    "oscillator": {
        "type": "sine"
    },
    "envelope": {
        "attack": .20,
        "decay": 0
    }
}
);

let panVol2 = new Tone.PanVol().toMaster();

let player = new Tone.Player();
player.loop = true;

let playerVol = new Tone.Volume().toMaster();


synth1.connect(panVol1);
synth2.connect(panVol2);
player.connect(playerVol);

class ToneComponent extends Component {


    constructor() {
        super();
        this.player = new Tone.Player();
        this.state = {
            router: 'dashboard',

            binauralVal: 1,
            synthFreq: 138.59,
            synthVolume: -60,
            playerVolume: -5,
            balance: 50,
            masterVolume: 0,
            droneId: 1,
            descriptionString: '',
            descriptionGeneralId: 1,
            activeSystemDescription: {},

            // playerBuffer: {},
            // playerVol: {},
            // synth1: {},
            // synth2: {},
            // panVol1: -1,
            // panVol2: 1,
            // player: {},
            isLoaded: false,
            isPlaying: false,
            isPreset: false,
            isChanged: false

        }//end state
    }//end constructor

    componentWillMount() {

    }//end componentWillMount

    componentDidMount() {
        droneSamples = new Tone.Buffers({
            "1": "drones/Int3.mp3",
            "2": "drones/fiveC.mp3",
            "3": "drones/Int3.mp3",

        }, () => {
            // console.log('audio buffers loaded');

            player.buffer = droneSamples.get(this.state.droneId.toString());
            panVol2.pan.value = -1;
            panVol2.volume.value = this.state.synthVolume;
            panVol1.pan.value = 1;
            panVol1.volume.value = this.state.synthVolume;
            Tone.Master.volume.value = this.state.masterVolume;

            this.setState({
                isLoaded: true
            })

        });

        this.props.dispatch({
            type: 'GET_PRESETS'
        });

        this.props.dispatch({
            type: 'GET_DESCRIPTIONS_GENERAL'
        });


    }//end componentDidMount

    handleStart = () => {

        let freq1 = this.state.synthFreq - (this.state.binauralVal / 2);
        let freq2 = this.state.synthFreq + (this.state.binauralVal / 2);
        synth1.triggerAttack(freq1);
        synth2.triggerAttack(freq2);
        player.start();
        this.setState({
            isPlaying: true
        }
        );
    }//end handleStart

    handleStop = () => {
        synth1.triggerRelease();
        synth2.triggerRelease();
        player.stop();
        this.setState({
            isPlaying: false
        }
        );
    }//end handleStop

    handleBinaural = (value) => {
        //stores slider value in state as binauralVal, re-assigns synth 1 and 2 notes to 
        //pitch diverge to a total equaling binauralVal
        this.setState({
            binauralVal: value,
            isChanged: true
        });
        let freq1 = this.state.synthFreq - (this.state.binauralVal / 2);
        let freq2 = this.state.synthFreq + (this.state.binauralVal / 2);
        this.handleDescription();
        synth1.setNote(freq1);
        synth2.setNote(freq2);
    }

    handleDescription = () => {
        let descriptionSpecific = {};

        for (let description of this.props.description.allGeneralDescriptionsReducer) {
            if ((this.state.binauralVal >= description.min) && (this.state.binauralVal <= description.max)) {

                descriptionSpecific =
                    {
                        title: description.title,
                        description: description.description,
                        toomuch: description.tooMuch,
                        toolittle: description.toolittle,
                        optimal: description.optimal
                    };
            }
        }//end for loop
        this.setState({
            activeSystemDescription: descriptionSpecific
        });
        // console.log('in handleDescription, descriptionSpecific', descriptionSpecific);
    }//end handleDescription


    handleVolume = (value) => {
        this.setState({
            masterVolume: value,
            isChanged: true
        });
        Tone.Master.volume.rampTo(this.state.masterVolume, .01);
    }

    handleBalance = (value) => {
        let synthVolume = (-60) - (5 + value);
        this.setState({
            balance: value,
            synthVolume: synthVolume,
            playerVolume: value,
            isChanged: true
        });
        panVol1.volume.rampTo(this.state.synthVolume);
        panVol2.volume.rampTo(this.state.synthVolume);
        playerVol.volume.rampTo(this.state.playerVolume);
    }//end handlebalance

    //TO-DO re-assign pitches based off drone pitch, fix state issue not loading
    handleDrone = (event, index, value) => {

        if (this.state.isPlaying) {
            console.log('this is this.state.droneId upon retrigger:', this.state.droneId);
            this.setState({
                droneId: value,
                isChanged: true
            });
            player.stop();
            player.buffer = droneSamples.get(value.toString());
            // console.log('this is this.state.droneId inside conditional isPlaying:', this.state.droneId);
            player.start();
        } else {
            // console.log('value inside conditional !isPlaying:',value);
            this.setState({
                droneId: value,
                isChanged: true
            });
            player.stop();
            player.buffer = droneSamples.get(value.toString());

            // console.log('this is this.state.droneId inside conditional !isPlaying:', this.state.droneId);
        }
    }//end handledrone


    handleSaveToLibrary = () => {

        let descriptionId = 1;
        if ((this.state.binauralVal >= .5) && (this.state.binauralVal <= 3.99)) {
            descriptionId = 1;
        } else if ((this.state.binauralVal >= 4) && (this.state.binauralVal <= 7.99)) {
            descriptionId = 2;
        } else if ((this.state.binauralVal >= 8) && (this.state.binauralVal <= 13.99)) {
            descriptionId = 3;
        } else if ((this.state.binauralVal > 13.99)) {
            descriptionId = 4;
        }
        this.setState({
            descriptionGeneralId: descriptionId
        }, () => {
            this.sendToLibrary();
        }
        );
    }

    sendToLibrary = () => {

        this.props.dispatch({
            type: 'ADD_PRESET',
            payload: this.state
        });
        console.log(this.state.descriptionGeneralId);

    }


    handleSaveChanges = () => {
        //TO-DO PUT FOLLOWED BY GET SAGA
    }

    handleDelete = (libraryItem) => {
        console.log('got to handleDelete', libraryItem.id)
        //TO-DO
    }

    handleLoad = (libraryItem) => {
        player.stop();
        synth1.triggerRelease();
        synth2.triggerRelease();
        this.setState({
            binauralVal: libraryItem.binauralval,
            synthFreq: libraryItem.synthfreq,
            synthVolume: libraryItem.synthvolume,
            playerVolume: libraryItem.playervolume,
            balance: libraryItem.balance,
            masterVolume: libraryItem.mastervolume,
            droneId: libraryItem.drone_id,
            descriptionString: libraryItem.descriptionstring,
            isPlaying: true,
            isPreset: true, 
        }, () => {
            player.buffer = droneSamples.get(this.state.droneId.toString());
            let freq1 = this.state.synthFreq - (this.state.binauralVal / 2);
            let freq2 = this.state.synthFreq + (this.state.binauralVal / 2);

            let synthVolume = (-60) - (5 + this.state.masterVolume);
            panVol1.volume.rampTo(this.state.synthVolume);
            panVol2.volume.rampTo(this.state.synthVolume);
            playerVol.volume.rampTo(this.state.playerVolume);
            synth1.setNote(freq1);
            synth2.setNote(freq2);
            Tone.Master.volume.rampTo(this.state.masterVolume, .01);

            synth1.triggerAttack(freq1);
            synth2.triggerAttack(freq2);
            player.start();
        })//end setState callback
    }


    handleUpdate = (libraryItem) => {
        console.log('got to handleUpdate', libraryItem.id)
        //TO-DO
    }

    handleStartNew = () => {
        this.setState({
            isPreset: false
        })
    };

    handleRouter = (routerString) => {
        this.setState({
            router: routerString
        });
    }


    dashboardRender = () => {
        return (
            <Dashboard isLoaded={this.state.isLoaded}
                handleStart={this.handleStart}
                handleStop={this.handleStop}
                handleBalance={this.handleBalance}
                handleVolume={this.handleVolume}
                handleBinaural={this.handleBinaural}
                handleDrone={this.handleDrone}
                handleSaveToLibrary={this.handleSaveToLibrary}
                handleSaveChanges={this.handleSaveChanges}
                handleStartNew={this.handleStartNew}

                synthFreq={this.state.synthFreq}
                binauralVal={this.state.binauralVal}
                masterVolume={this.state.masterVolume}
                synthVolume={this.state.synthVolume}
                playerVolume={this.state.playerVolume}
                balance={this.state.balance}
                droneId={this.state.droneId}
                descriptionString={this.state.descriptionString}
                activeSystemDescription={this.state.activeSystemDescription}

                isLoaded={this.state.isLoaded}
                isPlaying={this.state.isPlaying}
                isPreset={this.state.isPreset}
                isChanged={this.state.isChanged}
            />

        )
    }

    libraryRender = () => {

        return (
            <Library handleDelete={this.handleDelete} 
            handleUpdate={this.handleUpdate} 
            handleLoad={this.handleLoad}
            />
        )
    }

    //alternative router to keep audio context active while different pages are loaded
    routerRender = () => {

        switch (this.state.router) {
            case 'dashboard': {
                return (
                    <div>
                        <div>{this.dashboardRender()}</div>
                        <div>{this.libraryRender()}</div>
                    </div>
                )
            }
            case 'info': {
                return (
                    <div>
                        <div><Info /></div>
                        <div>{this.libraryRender()}</div>
                    </div>
                )
            }
            default: {
                return (
                    <div>
                        <div>{this.dashboardRender()}</div>
                        <div>{this.libraryRender()}</div>
                    </div>
                )
            }
        }
    }//end routerRender

    render() {

        return (
            <div>
                <div><RaisedButton onClick={() => this.handleRouter('dashboard')}>Dashboard</RaisedButton>
                    <RaisedButton onClick={() => this.handleRouter('info')}>Info</RaisedButton>
                </div>
                {this.routerRender()}
            </div>
        )
    }//end render

}//end ToneComponent

const mapStateToProps = state => ({
    description: state.description
});

export default connect(mapStateToProps)(ToneComponent);

// export default ToneComponent;