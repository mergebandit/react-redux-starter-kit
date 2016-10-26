import React, { PropTypes } from 'react';

function Root({ connected }) {
  return (
    <div>Connected to redux: <span>{connected}</span></div>
  );
}

Root.propTypes = {
  connected: PropTypes.string,
};

export default Root;

