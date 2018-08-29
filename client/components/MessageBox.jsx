import React from 'react';
import PropTypes from 'prop-types';

const MessageBox = (props) => {
  const { messages, handleSubmit } = props;

  return (
    <div className="message-board-container">
      <div className="message-list">
        <ul>
          {messages.map((message, idx) => (
            <li className="message-li" key={`li-${idx}`}>
              <span>{message.name}</span>
              <span>:</span>
              <span>{message.text}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="form-container">
        <form className="message-form" onSubmit={handleSubmit}>
          <input className="text-field" type="text" />
          <button type="submit" value="Submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

MessageBox.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default MessageBox;
