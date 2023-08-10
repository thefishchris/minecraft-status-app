//App.js
import React, { useState, useEffect } from 'react';
import { CssBaseline, Container, Paper, Dialog, DialogContent, Button, Grid } from '@mui/material';
import ServerStatus from './components/ServerStatus';
import AddServerForm from './components/AddServerForm';

function App() {
  const [servers, setServers] = useState([]);
  const [openAddForm, setOpenAddForm] = useState(false);

  const handleAddServer = (newServer) => {
    const updatedServers = [...servers, newServer];
    setServers(updatedServers);
    localStorage.setItem('servers', JSON.stringify(updatedServers));
    setOpenAddForm(false);
  };
  const handleDeleteServer = (hostname, port) => {
    const updatedServers = servers.filter(server => !(server.hostname === hostname && server.port === port));
    setServers(updatedServers);
    localStorage.setItem('servers', JSON.stringify(updatedServers));
  };
  
  useEffect(() => {
    const savedServers = JSON.parse(localStorage.getItem('servers')) || [];
    setServers(savedServers);
  }, []);

  return (
    <CssBaseline>
      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
          <Button onClick={() => setOpenAddForm(true)}>Add Minecraft Server</Button>
          <Grid container spacing={2}>
            {servers.map((server, index) => (
              <Grid item xs={12} md={6} key={index}>
                <ServerStatus
                  key={index}
                  hostname={server.hostname}
                  port={server.port}
                  onDelete={(hostname, port) => handleDeleteServer(hostname, port)}
                />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
      <Dialog open={openAddForm} onClose={() => setOpenAddForm(false)}>
        <DialogContent>
          <AddServerForm onAddServer={handleAddServer} />
        </DialogContent>
      </Dialog>
    </CssBaseline>
  );
}

export default App;
