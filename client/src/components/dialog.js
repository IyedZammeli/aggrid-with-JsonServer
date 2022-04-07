import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';

export default function FormDialog({open, handleClose, data, onChange, handleFormSubmit}) {
 // const {id,make,model,price}= data 
 const {id,name,email,phone,dob}=data

  return (
    <div>
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{id?"Update User":"Create new User"}
        </DialogTitle>
        <DialogContent>
          <form>
          <TextField id="name" value={name} onChange={e=>onChange(e)} placeholder="Enter name" label="Name" variant="outlined" margin="dense" fullWidth />
             <TextField id="email" value={email} onChange={e=>onChange(e)} placeholder="Enter email" label="Email" variant="outlined" margin="dense" fullWidth />
             <TextField id="phone" value={phone} onChange={e=>onChange(e)} placeholder="Enter phone number" label="Phone Number" variant="outlined" margin="dense" fullWidth />
             <TextField id="dob" value={dob} onChange={e=>onChange(e)} placeholder="Enter Date of birth" label="Date of Birth" variant="outlined" margin="dense" fullWidth />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="outlined" >Cancel</Button>
          <Button onClick={()=>handleFormSubmit()} variant="contained" >
            {id?"Update":"Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
