// app/chatbot.js
'use client';
import { useState } from 'react';
import { TextField, Button, Container, Typography, Box, List, ListItem, ListItemText } from '@mui/material';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (input.trim() === '') return;

    // Add user message to the chat
    setMessages([...messages, { text: input, type: 'user' }]);
    setInput('');

    // Call the API endpoint
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      if (response.ok) {
        // Add bot response to the chat
        setMessages([...messages, { text: input, type: 'user' }, { text: data.reply, type: 'bot' }]);
      } else {
        // Handle errors
        setMessages([...messages, { text: input, type: 'user' }, { text: 'Error: Unable to get a response', type: 'bot' }]);
      }
    } catch (error) {
      // Handle fetch errors
      setMessages([...messages, { text: input, type: 'user' }, { text: 'Error: Unable to connect', type: 'bot' }]);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Chatbot</Typography>
      <Box sx={{ border: '1px solid #ddd', padding: 2, height: 400, overflowY: 'scroll' }}>
        <List>
          {messages.map((msg, index) => (
            <ListItem key={index} sx={{ justifyContent: msg.type === 'bot' ? 'flex-start' : 'flex-end' }}>
              <ListItemText primary={msg.text} sx={{ bgcolor: msg.type === 'bot' ? '#f0f0f0' : '#007bff', color: msg.type === 'bot' ? '#000' : '#fff', borderRadius: 1, p: 1 }} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ display: 'flex', marginTop: 2 }}>
        <TextField
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          variant="outlined"
          label="Type your message"
        />
        <Button onClick={handleSend} variant="contained" sx={{ marginLeft: 2 }}>Send</Button>
      </Box>
    </Container>
  );
};

export default Chatbot;
