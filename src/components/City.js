import React, { PropTypes } from 'react';

const City = ({ visible, text }) => (
  <button
    className="btn"
    style={{display: visible ? 'visible' : 'none'}}>
    {text}
  </button>
)

City.propTypes = {
  visible: PropTypes.bool.isRequired,
  text: PropTypes.string
}

export default City
