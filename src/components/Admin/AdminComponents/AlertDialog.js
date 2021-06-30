import React from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const AlertDialog = props => {
  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={props.handleOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={props.isOpen}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        {/* <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.subtitle}
          </DialogContentText>
        </DialogContent> */}
        <DialogActions>
          <Button onClick={props.handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={props.handleConfirm} color="primary" autoFocus>
            {props.children}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog