import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Tone from 'tone';
import { USER_ACTIONS } from '../../redux/actions/userActions';

import Dashboard from '../../components/ToneComponent/Dashboard/Dashboard';
import Info from '../../components/ToneComponent/Info/Info';
import Library from '../../components/ToneComponent/Library/Library';
import Button from 'material-ui/Button';
import Card from 'material-ui/Card';
import { Tabs, Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';

import '../../styles/main.css';

Tone.context.latencyHint = 'playback';

const mapStateToProps = state => ({
    user: state.user,
    description: state.description,
    sounds: state.sounds
});


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
        // this.player = new Tone.Player();
        this.state = {
            router: 'dashboard',
            id: 1,
            binauralVal: 2.2,
            synthFreq: 130.81,
            synthVolume: -45,
            playerVolume: -20,
            balance: -20,
            masterVolume: -5,
            droneId: 1,
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.description != this.props.description) {
            console.log('got to Set state in componentWillReceiveProps!');
            this.setState({
                activeSystemDescription: this.props.description.allGeneralDescriptionsReducer[0]
            })
        }
    }

    componentDidMount() {

        this.props.dispatch({
            type: USER_ACTIONS.FETCH_USER
        });

        this.props.dispatch({
            type: 'GET_DESCRIPTIONS_GENERAL'
        });


        axios.get('/api/sounds')
            .then((response) => {
                let dronesForBuffer = {};

                for (let sound of response.data) {
                    let soundToString = sound.id
                    let url = sound.urlstring;
                    // console.log(url);
                    let objectToAppend = { [soundToString]: url };
                    dronesForBuffer = { ...dronesForBuffer, ...objectToAppend }
                }

                droneSamples = new Tone.Buffers(dronesForBuffer, () => {
                    player.buffer = droneSamples.get(this.state.droneId);
                    panVol2.pan.value = -1;
                    panVol2.volume.value = this.state.synthVolume;
                    panVol1.pan.value = 1;
                    panVol1.volume.value = this.state.synthVolume;
                    Tone.Master.volume.value = this.state.masterVolume;

                    this.setState({
                        soundsArray: response.data,
                        isLoaded: true
                    })

                });

            }).catch((err) => {
                console.log(err)
            });


    }//end componentDidMount

    componentWillReceiveProps(nextProps) {
        // if (nextProps.sounds[2].id) {

        //     console.log('!!!!!!!!!!!', this.props.sounds);

        // }
    }

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
                        toomuch: description.toomuch,
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
        Tone.Master.volume.rampTo(value, .01);
        this.setState({
            masterVolume: value,
            isChanged: true
        });

    }

    handleBalance = (value) => {
        let synthVolume = (-60) - (5 + value);
        this.setState({
            balance: value,
            synthVolume: synthVolume,
            playerVolume: value,
            isChanged: true
        });
        panVol1.volume.rampTo(synthVolume);
        panVol2.volume.rampTo(synthVolume);
        playerVol.volume.rampTo(value);
    }//end handlebalance

    handleDrone = (event) => {

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
    }

    sendToLibrary = () => {

        this.props.dispatch({
            type: 'ADD_PRESET',
            payload: this.state
        });
        console.log(this.state.descriptionGeneralId);

    }

    handleSaveChanges = () => {
        console.log('made it to handleSaveChanges');
        this.props.dispatch({
            type: 'PUT_PRESET',
            payload: this.state
        });
    }


    handleDelete = (libraryItem) => {
        this.props.dispatch({
            type: 'DELETE_PRESET',
            payload: libraryItem.id
        });
    }

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
            isPlaying: true,
            isPreset: true,
            isChanged: false,
            drawerOpen: !this.state.drawerOpen
        }, () => {
            player.buffer = droneSamples.get(this.state.droneId);
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

    handleNotesClose = () => {
        this.setState({
            dialogOpen: false,
        })
    }

    handleNotesOpen = () => {
        this.setState({
            dialogOpen: true
        })
    }

    handleInputChangeFor = propertyName => (event) => {
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
    }

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
                        <div id="navInfo" onClick={() => this.handleRouter('info')}><Typography variant="body1">Info</Typography></div>
                        {this.props.user.userName ? this.libraryUserYesRouterRender() : this.libraryUserNoRouterRender()}
                    </div>
                </Card>

                {this.routerRender()}
            </div>
        )
    }//end render

}//end ToneComponent


export default connect(mapStateToProps)(ToneComponent);