import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import queryString from 'query-string';

import './Chat.css';

import ChatBar from '../ChatBar/ChatBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import OnlineUsers from '../OnlineUsers/OnlineUsers';

import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';


let socket;

const Chat = ({ location }) => {
    const [name, setName]  = useState('');
    const [room, setRoom]  = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, (error) => {
            if(error) {
                alert(error);
            }
        });

        return () => {
            socket.emit('disconnect');

            socket.off();
        }
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        });

        socket.on("roomData", ({ users }) => {
          setUsers(users);
        });
    }, [messages]);

    const sendMessage = (event) => {
        event.preventDefault();

        if(message){
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    };

    return (
        <Container>
            <Jumbotron className="chatJumbo">
                <ChatBar room={room} />
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
                <OnlineUsers users={users} />
            </Jumbotron>
        </Container>
    )
};

export default Chat;