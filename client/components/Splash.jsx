import React from 'react';
import PropTypes from 'prop-types';

const Splash = (props) => {
  const { handleSubmit } = props;
  return (
    <div className="splash-page">
      <h2>Welcome</h2>
      <div className="name-form-container">
        <form className="name-form" onSubmit={handleSubmit}>
          <input className="name-field" type="text" />
          <button id="name-form-btn" type="submit" value="Submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

Splash.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default Splash;
