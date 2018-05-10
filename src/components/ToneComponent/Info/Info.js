import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../../redux/actions/userActions';

import Card from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import { PlayCircleFilled, Stop, VolumeUp } from 'material-ui-icons';

import '../../../styles/main.css';

const mapStateToProps = state => ({
  user: state.user,
});

class Info extends Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {

  }

  render() {


    return (
      <Card>
        <div id="#dashboardContainer">
        <div id="infoPagePlayStop">
          <div id="playStopButton">
            {this.props.isPlaying ? <Stop color="secondary" style={{ fontSize: 50 }} onClick={this.props.handleStop} /> : <PlayCircleFilled color="primary" style={{ fontSize: 50 }} onClick={this.props.handleStart} />}
          </div>
        </div>
          <Typography>
            <p>Lorem ipsum dolor sit amet, duo id iisque appareat quaerendum. Vidit lorem sapientem usu ex, no copiosae indoctum sit. In mea sale dignissim tincidunt, sint dicit et pri. An vero commune eum, qui ne quod possim. Tation nostro vivendo no vim. Vel ne reformidans adversarium, his facer aliquip virtute ne, modo malis et pri.
  </p>
            <p>
              Eos numquam eleifend ad. Vim porro nostrum elaboraret in, elitr alterum sed ut, at erat consetetur qui. Legere voluptua torquatos no eum. Ad maiorum atomorum vis, ut eos epicuri propriae appetere.
  </p>
            <p>
              An electram mnesarchum qui, has posse consul ex. Nec eligendi democritum eu. Id quidam dicunt expetendis eum. Vim iisque fierent dolores eu, ei quas vidit mea.
  </p>
            <p>
              No usu voluptua imperdiet, ne nam natum nonumy, vis in dolore reprimique. Enim quaestio sadipscing vix ei. Id cum dicam euismod lucilius, detracto lucilius vix ut, mentitum dignissim te vis. Est an habemus rationibus, te solum tollit interpretaris his. Lorem accusata aliquando an vix, legimus minimum vis te. An purto solum pri, consul offendit posidonium ut vel, posse sapientem percipitur pri no.
  </p>
            <p>
              At pri exerci lucilius quaestio, ea pri iudico primis postea. Nam persequeris suscipiantur ex, an aperiam fabellas omittantur nam, eum fierent voluptatibus ut. Ea gubergren maiestatis his, apeirian repudiare suscipiantur ex vim, an nam mazim impetus. Sed at dico pertinax persecuti, no sale autem vivendo vim. Velit labores pro no, no quis facilis mel.
  </p>
            <p>
              Te labitur euismod postulant mel. Paulo possit feugiat nam ad, ei usu decore insolens, mei purto malorum docendi no. Ea ipsum eloquentiam mel, numquam recusabo no mea. Eam sint omnes munere eu, pri ut veniam graeci nusquam, vis malis ignota imperdiet te. Pri ne cibo prodesset, vel legendos senserit neglegentur an.
  </p>
            <p>
              Adipiscing dissentiet eu per. Nobis tantas everti cu usu, an habemus civibus cum, cum tritani salutatus inciderint ei. Dolores accumsan sea ne, est virtute appareat ex, te eos accusata antiopam eloquentiam. Ius habeo eligendi eu.
  </p>
            <p>
              Atqui scriptorem ne vis, has oratio soluta id. Id his putent aliquip conceptam, ex nominavi suavitate comprehensam qui. Nam an modo contentiones consectetuer, no mei erat probo. Ea his nisl nostrum. At nam veniam liberavisse, eleifend mandamus pri ex, id nam erat principes. Aeterno nusquam neglegentur per id.
  </p>
            <p>
              Te eam scripta partiendo aliquando, pro consul legimus recteque ut. In mea bonorum nusquam, ut usu senserit iracundia accommodare, verear oportere ei eos. Eam ex habeo viderer, oratio dicunt melius vis et. Ad detracto insolens vim. Duo ut vivendum theophrastus, erat nemore eos no, his mucius quidam in.
  </p>
            <p>
              Id eum malorum accommodare. Natum impedit elaboraret cu vis, tamquam assueverit et pro. Sea id aeque soluta, no justo aliquid vim. Ea has persecuti abhorreant. Sea nonumy putent tractatos an, assentior delicatissimi ea qui, cu vim accusam gubergren. Cetero denique definitionem cum et, latine nominati interpretaris ne est, ea laoreet volutpat eam. Ei est blandit oporteat, mel choro dicant sententiae id.
</p>



          </Typography>
        </div>

      </Card>
    );
  }
}

export default connect(mapStateToProps)(Info);
