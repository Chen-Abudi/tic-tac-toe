import React, { useState, useEffect } from 'react';
import './Chat.css';
import socketIO from 'socket.io-client';
import { user } from '@testing-library/user-event';
const socket = socketIO('http://localhost:3002');

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [userName, setUser] = useState('');

  const [connected, setIsConnected] = useState(socket.connected);

  // useEffect(() => {
  //   // Set up event listeners for incoming messages
  //   socket.on('message', (message) => {
  //     setMessages((prevMessages) => [...prevMessages, message]);
  //     console.log('test');
  //     console.log(message);
  //   });
  // }, []);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });
    socket.on('disconnect', () => {
      socket.disconnect(); // clean up and disconnect from the server
      setIsConnected(false);
    });
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    socket.on('username', () => {
      socket.userName = userName;
    });
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('message');
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send message to server
    if (event.target.input.value !== '') {
      socket.emitWithAck('message', message);
      setMessage('');
    } else {
      alert('enter a message');
    }
  };

  return (
    <div className='chat'>
      <p>User name</p>
      <form>
        <input
          id='input'
          type='text'
          value={userName}
          onChange={(event) => setUser(event.target.value)}
        />
        <button type='submit'>Send</button>
      </form>
      <h1>Chat</h1>
      <div>
        {messages.map((message, index) => (
          <p key={index}> {message}</p>
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
