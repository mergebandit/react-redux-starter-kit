import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from 'actions';

import RootComponent from 'components/Root';

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
      <RootComponent connected={this.props.connected.toString()} />
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
