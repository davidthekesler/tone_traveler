import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Tone from 'tone';
import { USER_ACTIONS } from '../../redux/actions/userActions';

import Dashboard from '../../components/ToneComponent/Dashboard/Dashboard';
import Info from '../../components/ToneComponent/Info/Info';
import Library from '../../components/ToneComponent/Library/Library';
import Card from 'material-ui/Card';
import Typography from 'material-ui/Typography';


import '../../styles/main.css';


Tone.context.latencyHint = 'playback';

const mapStateToProps = state => ({
    user: state.user,
    description: state.description,
    sounds: state.sounds
});


//set up initial Tone.js synths and player
let droneSamples = {};

let synth1 = new Tone.Synth({
    "oscillator": {
        "type": "sine"
    },
    "envelope": {
        "attack": .20,
        "sustain": 1
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
        "sustain": 1
    }
}
);

let panVol2 = new Tone.PanVol().toMaster();

let player = new Tone.Player();
player.loop = true;
player.fadeIn = 1;
player.fadeOut = 1;

//routing for synth and player
let playerVol = new Tone.Volume().toMaster();

synth1.connect(panVol1);
synth2.connect(panVol2);
player.connect(playerVol);

class ToneComponent extends Component {

    constructor() {
        super();
        // this.player = new Tone.Player();
        this.state = {
            router: 'dashboard',
            id: 1,
            binauralVal: 2.2,
            synthFreq: 73.42,
            synthVolume: -45,
            playerVolume: -5,
            balance: -5,
            masterVolume: 10,
            droneId: '',
            descriptionString: '',
            descriptionGeneralId: 1,
            activeSystemDescription: {
                title:
                    'Delta',
                description: 'Deep Sleep, Healing',
                toomuch: 'Brain injuries, learning problems, inability to think, severe ADHD',
                toolittle: 'Inability to rejuvenate body, inability to revitalize the brain, poor sleep',
                optimal: 'Immune system, natural healing, restorative deep sleep'
            },
            soundsArray: [],
            isLoaded: false,
            isPlaying: false,
            isPreset: false,
            isChanged: false,
            drawerOpen: false,
            dialogOpen: false
        }//end state
    }//end constructor


    componentDidMount() {

        //get user info
        this.props.dispatch({
            type: USER_ACTIONS.FETCH_USER
        });

        //get descriptions for binaural beat knob
        this.props.dispatch({
            type: 'GET_DESCRIPTIONS_GENERAL'
        });

        //get database of sound sources for load into audio buffer
        axios.get('/api/sounds')
            .then((response) => {
                let dronesForBuffer = {};
                //convert to objects for buffer
                for (let sound of response.data) {
                    let soundToString = sound.id
                    let url = sound.urlstring;
                    let objectToAppend = { [soundToString]: url };
                    dronesForBuffer = { ...dronesForBuffer, ...objectToAppend }
                }
                //set up initial audio player and initial pans and audio levels
                droneSamples = new Tone.Buffers(dronesForBuffer, () => {
                    player.buffer = droneSamples.get(3);
                    panVol2.pan.value = -1;
                    panVol2.volume.value = this.state.synthVolume;
                    panVol1.pan.value = 1;
                    panVol1.volume.value = this.state.synthVolume;
                    playerVol.volume.value = this.state.playerVolume
                    Tone.Master.volume.value = this.state.masterVolume;
                    //buffer is loaded, load page
                    this.setState({
                        soundsArray: response.data,
                        isLoaded: true
                    })
                });
            }).catch((err) => {
                console.log(err)
            });
    }//end componentDidMount


    handleStart = () => {
        console.log('in handleStart, tone buffer:', player.buffer);
        Tone.context.resume().then(() => {
        let freq1 = this.state.synthFreq - (this.state.binauralVal / 2);
        let freq2 = this.state.synthFreq + (this.state.binauralVal / 2);
        synth1.triggerAttack(freq1);
        synth2.triggerAttack(freq2);
        player.start();
        this.setState({
            isPlaying: true
        }
        );
    })

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
    }//end handleBinaural

    handleDescription = () => {
        //get descriptions from database and match to binaural slider value
        let descriptionSpecific = {};
        for (let description of this.props.description.allGeneralDescriptionsReducer) {
            if ((this.state.binauralVal >= description.min) && (this.state.binauralVal <= description.max)) {
                descriptionSpecific =
                    {
                        title: description.title,
                        description: description.description,
                        toomuch: description.toomuch,
                        toolittle: description.toolittle,
                        optimal: description.optimal
                    };
            }
        }//end for loop
        this.setState({
            activeSystemDescription: descriptionSpecific
        });
    }//end handleDescription


    handleVolume = (value) => {
        Tone.Master.volume.rampTo(value, .01);
        this.setState({
            masterVolume: value,
            isChanged: true
        });
    }//end handleVolume

    handleBalance = (value) => {
        let valueInput = value;
        let synthVolumeToAdjust = (-25 - (valueInput));
        let synthVolume = synthVolumeToAdjust - 25;
        if (value > -5) {
            synthVolume = (synthVolume - ((value + 5) * 5));
            valueInput = (valueInput - (value + 5));
            // console.log('in valueInput adjust over 5', valueInput);
        }
        if (value <= -5 && value > -10) {
            valueInput = (valueInput - (value + 5));
            // console.log('in valueInput adjust between 5 and 10', valueInput);
        }
        if (value <= -10) {
            valueInput = ((valueInput + ((value + 10) * 2) + 5));
            // console.log('in valueInput adjust under 20', valueInput);
        }
        panVol1.volume.rampTo(synthVolume);
        panVol2.volume.rampTo(synthVolume);
        playerVol.volume.rampTo(valueInput);

        this.setState({
            balance: value,
            synthVolume: synthVolume,
            playerVolume: valueInput,
            isChanged: true
        });
    }//end handlebalance

    handleDrone = (event) => {
        //sets audio buffer and maps over sounds to select appropriate pitch selected buffer
        let pitchToMap;
        for (let sound of this.state.soundsArray) {
            if (sound.id == event.target.value) {
                pitchToMap = sound.frequency;
            }
        }

        this.setState({
            synthFreq: pitchToMap,
            droneId: event.target.value,
            isChanged: true
        }, () => {
            let freq1 = this.state.synthFreq - (this.state.binauralVal / 2);
            let freq2 = this.state.synthFreq + (this.state.binauralVal / 2);;
            synth1.setNote(freq1);
            synth2.setNote(freq2);
            if (this.state.isPlaying) {
                player.stop();
                player.buffer = droneSamples.get(event.target.value);
                player.start();
            } else {
                player.stop();
                player.buffer = droneSamples.get(event.target.value);
            }
        }
        );

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
            this.setState({
                isPreset: !this.state.isPreset
            });
        }
        );
    }//end handleSaveToLibrary

    sendToLibrary = () => {
        //sends current state to preset db as new
        this.props.dispatch({
            type: 'ADD_PRESET',
            payload: this.state
        });
    }//end sendToLibrary

    handleSaveChanges = () => {
        //sends current state to db as change
        this.setState({
            isChanged: false
        }, () => {
            console.log('made it to handleSaveChanges, here is state', this.state);
            this.props.dispatch({
                type: 'PUT_PRESET',
                payload: this.state
            });
        }
        );

    }//end handleSaveChanges


    handleDelete = (libraryItem) => {
        this.props.dispatch({
            type: 'DELETE_PRESET',
            payload: libraryItem.id
        });
    }//end handleDelete

    handleLoad = (libraryItem) => {
        player.stop();
        synth1.triggerRelease();
        synth2.triggerRelease();
        this.setState({
            id: libraryItem.id,
            binauralVal: libraryItem.binauralval,
            synthFreq: libraryItem.synthfreq,
            synthVolume: libraryItem.synthvolume,
            playerVolume: libraryItem.playervolume,
            balance: libraryItem.balance,
            masterVolume: libraryItem.mastervolume,
            droneId: libraryItem.drone_id,
            descriptionString: libraryItem.descriptionstring,
            descriptionGeneralId: libraryItem.descriptiongeneral_id,
            isPlaying: true,
            isPreset: true,
            isChanged: false,
        }, () => {
            this.handleDescription();
            Tone.context.resume().then(() => {
            player.buffer = droneSamples.get(this.state.droneId);
            let freq1 = this.state.synthFreq - (this.state.binauralVal / 2);
            let freq2 = this.state.synthFreq + (this.state.binauralVal / 2);
            panVol1.volume.rampTo(this.state.synthVolume);
            panVol2.volume.rampTo(this.state.synthVolume);
            playerVol.volume.rampTo(this.state.playerVolume);
            synth1.setNote(freq1);
            synth2.setNote(freq2);
            Tone.Master.volume.rampTo(this.state.masterVolume);
            let millisecondsToWait = 1000;
            setTimeout(function () {
                synth1.triggerAttack(freq1);
                synth2.triggerAttack(freq2);
                player.start();
            }, millisecondsToWait);

        })//end setState callback
    })
    }//end handleLoad

    handleNotesClose = () => {
        //for notes dialog currently in Dashboard.js
        this.setState({
            dialogOpen: false,
        })
    }

    handleNotesOpen = () => {
        //for notes dialog currently in Dashboard.js
        this.setState({
            dialogOpen: true
        })
    }

    handleInputChangeFor = propertyName => (event) => {
        //for notes dialog currently in Dashboard.js
        this.setState({
            [propertyName]: event.target.value,
            isChanged: true
        });
    }

    handleStartNew = () => {
        this.setState({
            isPreset: false,
            descriptionString: ''
        }, () => {
            //callback here
        })
    };

    handleRouter = (routerString) => {
        this.setState({
            router: routerString
        });
    }

    dashboardRender = () => {
        return (
            <Dashboard
                handleStart={this.handleStart}
                handleStop={this.handleStop}
                handleBalance={this.handleBalance}
                handleVolume={this.handleVolume}
                handleBinaural={this.handleBinaural}
                handleDrone={this.handleDrone}
                handleSaveToLibrary={this.handleSaveToLibrary}
                handleSaveChanges={this.handleSaveChanges}
                handleStartNew={this.handleStartNew}
                handleNotesClose={this.handleNotesClose}
                handleNotesOpen={this.handleNotesOpen}
                handleInputChangeFor={this.handleInputChangeFor}

                synthFreq={this.state.synthFreq}
                binauralVal={this.state.binauralVal}
                masterVolume={this.state.masterVolume}
                synthVolume={this.state.synthVolume}
                playerVolume={this.state.playerVolume}
                balance={this.state.balance}
                droneId={this.state.droneId}
                descriptionString={this.state.descriptionString}
                activeSystemDescription={this.state.activeSystemDescription}
                soundsArray={this.state.soundsArray}

                isLoaded={this.state.isLoaded}
                isPlaying={this.state.isPlaying}
                isPreset={this.state.isPreset}
                isChanged={this.state.isChanged}
                dialogOpen={this.state.dialogOpen}
            />
        )
    }

    libraryRender = () => {

        return (
            <Library handleDelete={this.handleDelete}
                handleUpdate={this.handleUpdate}
                handleStartNew={this.handleStartNew}
                handleLoad={this.handleLoad}
                handleDrawerOpen={this.handleDrawerOpen}
                drawerOpen={this.state.drawerOpen}
            />
        )
    }

    libraryUserYesRouterRender = () => {

        return (
            <div id="navLibrary" onClick={this.handleDrawerOpen}>
                <Typography variant="body1">Library</Typography>
            </div>
        )
    }

    libraryUserNoRouterRender = () => {
        return (
            <div id="navLibrary">
                <Typography variant="caption">Sign up or log in to save presets!</Typography>
            </div>
        )
    }


    handleDrawerOpen = () => {
        console.log('in handleDrawerOpen');
        this.setState({
            drawerOpen: !this.state.drawerOpen
        })
    }//for library.js

    //alternative router to keep audio context active while different pages are loaded
    routerRender = () => {

        if (!this.state.isLoaded) {
            return (
                <div id="spinnerDiv">
                    <div class="loader"></div>
                </div>
            )
        } else {
            switch (this.state.router) {
                case 'dashboard': {
                    return (
                        <div id="mainViewDiv">
                            <div>
                                {this.dashboardRender()}
                            </div>
                            {this.libraryRender()}
                        </div>
                    )
                }
                case 'info': {
                    return (
                        <div id="mainViewDiv">
                            <div>
                                <Info
                                    isPlaying={this.state.isPlaying}
                                    handleStop={this.handleStop}
                                    handleStart={this.handleStart}
                                />
                            </div>
                            {this.libraryRender()}
                        </div>
                    )
                }
                default: {
                    return (
                        <div id="mainViewDiv">
                            <div>
                                {this.dashboardRender()}
                            </div>
                            {this.libraryRender()}
                        </div>
                    )
                }
            }
        }
    }//end routerRender

    render() {

        return (
            <div>
                <Card>
                    <div id="navContainer">
                        <div id="navDashboard" onClick={() => this.handleRouter('dashboard')}><Typography variant="body1">Dashboard</Typography></div>
                        <div id="navInfo" onClick={() => this.handleRouter('info')}><Typography variant="body1">More Info</Typography></div>
                        {this.props.user.userName ? this.libraryUserYesRouterRender() : this.libraryUserNoRouterRender()}
                    </div>
                </Card>

                {this.routerRender()}
            </div>
        )
    }//end render
}//end ToneComponent

export default connect(mapStateToProps)(ToneComponent);