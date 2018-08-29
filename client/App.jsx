import React from 'react';
import PropTypes from 'prop-types';
import Splash from './components/Splash';
import Conversations from './components/Conversations';
import WhiteBoardView from './components/WhiteBoardView';

// establish websocket handshake
// splash screen for name input
// submit name, and get list of users from ws
// can watch one board, by default watching your own
// on click of user, watch that person's whiteboard, send that information to the server
// server then knows who to send information out to
// server must send back information about that user's whiteboard
// on back button, delete user from set of watchers, set watching to own board
// on edit of whiteboard, user submits information
// server sends out that information to all watchers

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ws: props.ws || {},
      name: '',
      users: [],
      watching: {},
      screen: 0,
      messages: [],
      isMouseDown: false,
      path2d: [],
    };
  }

  componentDidMount() {
    this.wsListener();
    window.addEventListener('mouseup', (e) => {
      this.handleMouseUp(e);
    });
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 2;
    const random = Math.floor(Math.random() * (2 ** 24));
    ctx.strokeStyle = '#' + random.toString(16);
    ctx.globalCompositeOperation = 'overlay';
    this.setState({ ctx });
  }

  setScreenVisibility() {
    return;
  }

  handleUserClick(e) {
    e.preventDefault();
    const userId = e.target.getAttribute('user-id');
    const userName = e.target.getAttribute('user-name');
    let { screen } = this.state;
    const { ws } = this.state;
    screen += 1;
    this.setState({ watching: { userId, userName }, screen });
    ws.send(JSON.stringify({ watching: { userId, userName } }));
  }

  handleNameSubmit(e) {
    e.preventDefault();
    const name = e.target.getElementsByClassName('name-field')[0].value;
    this.setState({ name });
    const { ws } = this.state;
    ws.send(JSON.stringify({ type: 'name', name }));
  }

  handleMessageFormSubmit(e) {
    e.preventDefault();
    const text = e.target.getElementsByClassName('text-field')[0].value;
    e.target.getElementsByClassName('text-field')[0].value = '';

    const { messages, name } = this.state;
    messages.push({ name, text });

    this.setState({ messages });
  }

  handleMouseDown(e) {
    e.preventDefault();
    const path2d = new Path2D();
    this.setState({ isMouseDown: true, path2d });
  }

  handleMouseUp(e) {
    e.preventDefault();
    const { ws, ctx } = this.state;
    const imageData = ctx.getImageData(0, 0, 500, 500);
    this.setState({ isMouseDown: false });
    ws.send(imageData.data.buffer);
  }

  handleMouseMove(e) {
    e.preventDefault();
    const rect = e.target.getBoundingClientRect();

    const { isMouseDown, path2d, ctx } = this.state;
    if (isMouseDown) {
      path2d.lineTo(e.clientX - rect.left, e.clientY - rect.top);
      ctx.stroke(path2d);
    }
  }

  // wsBufferListener() {
  //   const { wsBuffer, ctx } = this.state;
  //   wsBuffer.onmessage = function websocketBufferOnMessage(e) {
  //     console.log(e);
  //   };
  // }

  wsListener() {
    const self = this;
    const { ws } = this.state;
    ws.onmessage = function websocketOnMessage(e) {
      if (typeof e.data === 'string') {
        const msg = JSON.parse(e.data);
        switch (msg.type) {
          case 'users':
            self.setState({ users: msg.users });
            break;
          case 'message':
            break;
          default:
            break;
        }
      } else {
        const { ctx } = self.state;
        const arr = new Uint8ClampedArray(e.data);
        ctx.putImageData(new ImageData(arr, 500, 500), 0, 0);
      }
    };
  }
  /*
    getConversations(name) {
      fetch(`/users/${name}`)
        .then(res => res.json())
        .then((conversations) => {
          this.setState({ conversations });
        })
        .catch(err => console.error(err));
    }
  */

  submitMessage(content) {
    escape(content);

    const { ws, conversationId } = this.state;
    const message = {
      name: '',
      text: content,
      conversationId,
    };

    ws.send(JSON.stringify(message));
  }

  render() {
    const { name, messages, users } = this.state;
    const { watching, screen } = this.state;
    const handleNameSubmit = this.handleNameSubmit.bind(this);
    const handleUserClick = this.handleUserClick.bind(this);
    const handleMouseMove = this.handleMouseMove.bind(this);
    const handleMouseDown = this.handleMouseDown.bind(this);

    return (
      <div className="container">
        <Splash handleSubmit={handleNameSubmit} />
        <div className="dynamic-wrapper">
          <WhiteBoardView handleMouseMove={handleMouseMove} handleMouseDown={handleMouseDown} />
          <Conversations users={users} name={name} handleUserClick={handleUserClick} />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  ws: PropTypes.object,
};

export default App;
