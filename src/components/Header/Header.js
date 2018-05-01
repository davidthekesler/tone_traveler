import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  user: state.user,
});

const Header = ({ title }) => (
  <div className="instructions">
    <div>
      <h1 className="lead">{title}</h1>
    </div>
  </div>

);


export default connect(mapStateToProps)(Header);
