//ServerStatus.js
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  CardActions,
  IconButton,
} from '@mui/material';
import { red, green } from '@mui/material/colors';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import axios from 'axios';

const ServerStatus = ({ hostname, port, onDelete }) => {
  const [status, setStatus] = useState({
    online: false,
    players: { online: 0, max: 0 },
    motd: '',
  });
  useEffect(() => {
    axios.get(`https://api.mcsrvstat.us/2/${hostname}:${port}`)
      .then(response => {
        setStatus(response.data);
      })
      .catch(error => {
        console.error('Error loading status:', error);
      });
  }, [hostname, port]);

  const getStatusColor = () => (status.online ? green[500] : red[500]);
  const getStatusIcon = () => (status.online ? <CheckCircleIcon /> : <OfflineBoltIcon />);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const handleConfirmDelete = () => {
    onDelete(hostname, port);
    setConfirmDialogOpen(false);
  };
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: getStatusColor() }}>{getStatusIcon()}</Avatar>
        }
        title={hostname.toUpperCase()} 
      />
        <CardContent>
          <Typography variant="body2">
            {status?.motd?.clean || 'MOTD not available'}
          </Typography>
          <Typography variant="body2">
            {status?.players?.online !== undefined ? `${status.players.online} players online!` : 'Player count not available'}
          </Typography>
        </CardContent>
      <CardActions>
        <IconButton
          aria-label="Delete"
          onClick={() => setConfirmDialogOpen(true)}
          sx={{
            color: 'gray',
            '&:hover': {
              color: 'red',
            },
          }}
        >
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
      </CardActions>
      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the server "{hostname}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default ServerStatus;