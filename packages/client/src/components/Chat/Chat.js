import React, { useState, useEffect } from 'react';
import './Chat.css';
import { io } from 'socket.io-client';
const socket = io('http://localhost:3002');

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Set up event listeners for incoming messages
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      console.log('test');
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send message to server
    if (event.target.input.value !== '') {
      socket.emit('message', message);
      setMessage('');
    } else {
      alert('enter a message');
    }
  };

  return (
    <div className='chat'>
      <h1>Chat</h1>
      <div>
        {messages.map((message, index) => (
          <p key={index}>Recieved : {message}</p>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          id='input'
          type='text'
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button type='submit'>Send</button>
      </form>
    </div>
  );
};
export default Chat;
