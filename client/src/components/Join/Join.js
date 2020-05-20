import React, { useState } from 'react';
import  { Link } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';

import './Join.css';

const Join = () => {
    const [name, setName]  = useState('');
    const [room, setRoom]  = useState('');

    return (
        <div>
            <Container className="p-3 joinContainer">
                <Jumbotron>
                    <h3 className="joinHeader">Join a Chat Room</h3>
                    <Form>
                        <Form.Group>
                        <Form.Control placeholder="Name" type="text" onChange={(event) => setName(event.target.value)} />
                        </Form.Group>
                        <Form.Group>
                        <Form.Control placeholder="Room" className="JoinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
                        </Form.Group>
                        <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                        <Button variant="primary" type="submit">
                          Sign in
                        </Button>
                        </Link>
                    </Form>
                </Jumbotron>
            </Container>
        </div>
    )
};

export default Join;