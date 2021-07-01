import React from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from "@material-ui/core/styles";

const AlertDialog = props => {
  return (
    <div>
      <Dialog
        open={props.isOpen}
        onClose={props.handleClose}
        aria-labelledby="max-width-dialog-title"
        aria-describedby="max-width-dialog-description"
      >
        <DialogTitle id="max-width-dialog-title">{props.title}</DialogTitle>
        <DialogActions>
          <Button onClick={props.handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={props.handleConfirm} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const CustomDialog = withStyles({
  paperWidthSm: {
    "width": '500px'
  }
})

export default AlertDialog;