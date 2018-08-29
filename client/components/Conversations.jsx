import React from 'react';
import PropTypes from 'prop-types';

const Conversations = (props) => {
  const { users, name } = props;
  return (
    <div className="conversations-wrapper">
      <h2>Users</h2>
      <div className="conversation-li">
        {users.map((user) => {
          return (<div key={user.userId}>{user.userName}</div>);
        })}
      </div>
    </div>
  );
};

Conversations.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string.isRequired,
};

Conversations.defaultProps = {
  users: [],
};

export default Conversations;
