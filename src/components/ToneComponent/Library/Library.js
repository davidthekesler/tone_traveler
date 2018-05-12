import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from 'material-ui/Button';
import Card from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';
import { Delete } from 'material-ui-icons';

import moment from 'moment';

import '../../../styles/main.css';

const mapStateToProps = state => ({
  user: state.user,
  preset: state.preset,
  library: state.library
});

class Library extends Component {

  libraryRender = () => {

    if (this.props.library.length === 0) {
      return (
        <div>
          <div style={{ padding: '10px' }}><Typography variant="body1">Your saved presets will appear here.</Typography></div>
          {this.props.handleStartNew()}
        </div>
      )
    } else {

      let libraryArray = this.props.library.map((libraryItem) => {
        return (
          <Card style={{ padding: '10px', margin: '10px' }} key={libraryItem.id}>
            <div id="libraryCard">
              <div>{moment(libraryItem.createdts).format("MMM Do YYYY")}, {libraryItem.title} - {libraryItem.binauralval} Hz</div>
              <div>{libraryItem.descriptionstring}</div>
              <IconButton><Delete style={{ fontSize: 15 }} onClick={() => this.props.handleDelete(libraryItem)} /></IconButton>
              <Button size="small" color="secondary" style={{ fontSize: 10 }} variant="raised" onClick={() => this.props.handleLoad(libraryItem)}>Load</Button>
            </div>
          </Card>

        )
      });
      return (
        <div>
          <div style={{ padding: '10px' }}><Typography variant="body1">Your saved presets:</Typography></div>
          <div>{libraryArray}</div>
        </div>
      )
    }
  }

  render() {

    // Stringify Example <pre>{JSON.stringify(this.props.preset.allPresetsReducer)}</pre>
    return (
      <Drawer open={this.props.drawerOpen} onClose={this.props.handleDrawerOpen}>
        <div>{this.libraryRender()}</div>
      </Drawer>
    )

  }//end render

}

export default connect(mapStateToProps)(Library);

