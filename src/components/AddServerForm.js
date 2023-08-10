//AddServerForm.js
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const AddServerForm = ({ onAddServer }) => {
  const [hostname, setHostname] = useState('');
  const [port, setPort] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddServer({ hostname, port });
    setHostname('');
    setPort('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Hostname"
        value={hostname}
        onChange={(e) => setHostname(e.target.value)}
      />
      <TextField
        label="Port"
        value={port}
        onChange={(e) => setPort(e.target.value)}
      />
      <Button type="submit">Add Server</Button>
    </form>
  );
};

export default AddServerForm;
