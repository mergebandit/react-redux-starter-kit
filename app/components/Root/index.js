import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from 'actions';

class Root extends Component {
  static propTypes = {
    connected: PropTypes.bool,
    checkConnection: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.checkConnection();
  }

  render() {
    return (
      <div>Connected to redux: {this.props.connected.toString()}</div>
    );
  }
}

function mapStateToProps(state) {
  return {
    connected: state,
  };
}

export default connect(
  mapStateToProps,
  actions,
)(Root);
