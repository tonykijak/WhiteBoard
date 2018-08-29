import React from 'react';
import PropTypes from 'prop-types';

const WhiteBoard = (props) => {
  const { handleMouseDown, handleMouseMove } = props;
  return (
    <div className="canvas-container">
      <h2>Draw Here</h2>
      <canvas id="canvas" height="500" width="500" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} />
    </div>
  );
};

WhiteBoard.propTypes = {
  handleMouseMove: PropTypes.func.isRequired,
  handleMouseDown: PropTypes.func.isRequired,
};

export default WhiteBoard;
