import React from "react";
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
// } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import PropTypes from "prop-types";

// AlertDialog.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   handleClose: PropTypes.func.isRequired,
//   title: PropTypes.string.isRequired,
//   subtitle: PropTypes.string,
//   children: PropTypes.element.isRequired,
// };
 
export const AlertDialog = ({
  isOpen,
  handleOpen,
  handleClose,
  title,
  subtitle,
  children,
}) => {
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {subtitle}
          </DialogContentText>
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            {children}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog