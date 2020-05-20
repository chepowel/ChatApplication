import React from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './Input.css';

const Input = ({ setMessage, sendMessage, message }) => (
    <Form  className="sendInput">
        <Form.Group>
        <Form.Control
            className="input"
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={({ target: { value } }) => setMessage(value)}
            onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
        />
        </Form.Group>
        <Button variant="primary" className="sendButton" onClick={e => sendMessage(e)}>
          Send
        </Button>
    </Form>

);

export default Input;