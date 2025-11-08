import React, { useState } from 'react'
import type { ChangeEvent } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'

interface Message {
  sender: string
  text: string
}

const CommunityChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'Alex', text: 'Hey everyone! Excited for the taco night 🌮' },
    { sender: 'Sam', text: 'Same! I can bring salsa and chips.' },
  ])
  const [newMessage, setNewMessage] = useState<string>('')

  const handleSend = () => {
    if (newMessage.trim() === '') return
    setMessages((prev) => [...prev, { sender: 'You', text: newMessage }])
    setNewMessage('')
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value)
  }

  return (
    <Box
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 64px)',
        mt: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Community Chat
      </Typography>

      {/* Message List */}
      <Paper
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          mb: 2,
          p: 1,
          backgroundColor: '#f9f9f9',
        }}
      >
        <List>
          {messages.map((msg, index) => (
            <ListItem
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems:
                  msg.sender === 'You' ? 'flex-end' : 'flex-start',
              }}
            >
              <ListItemText
                primary={msg.text}
                secondary={msg.sender}
                sx={{
                  bgcolor:
                    msg.sender === 'You' ? '#d1e7dd' : '#e2e3e5',
                  borderRadius: 2,
                  p: 1,
                  maxWidth: '80%',
                }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Input Field */}
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          placeholder="Type a message..."
          value={newMessage}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" onClick={handleSend}>
          Send
        </Button>
      </Box>
    </Box>
  )
}

export default CommunityChat
