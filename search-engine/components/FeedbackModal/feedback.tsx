"use client"
import React, { useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';

const FeedbackModal = ({ isOpen, onClose }) => {
  const [label, setLabel] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('http://lspt-data-eval.cs.rpi.edu:8080/v0/SubmitFeedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ label, title, text }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      alert('Feedback submitted successfully!');
      setLabel('');
      setTitle('');
      setText('');
      onClose();
    } catch (error) {
      console.error(error);
      alert('There was an error submitting your feedback. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose} aria-labelledby="feedback-modal-title">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: '8px',
        }}
      >
        <h2 id="feedback-modal-title">Submit Feedback</h2>
        <TextField
          fullWidth
          margin="normal"
          label="Label"
          variant="outlined"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Text"
          variant="outlined"
          multiline
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={isSubmitting}
          sx={{ mt: 2 }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </Button>
      </Box>
    </Modal>
  );
};

export default FeedbackModal;