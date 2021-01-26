import React, { useState, useEffect } from 'react';
import {
    useParams
} from "react-router-dom";

import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import styled from 'styled-components';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));



const ListingInfo = () => {
    const classes = useStyles();
    let { id } = useParams();

    const [listingInfo, setListingInfo] = useState({});
    const [isVisible, setIsVisible] = useState(false);
    const [listingTitle, setListingTitle] = useState("");
    const [listingDesc, setListingDesc] = useState("");
    const [deadline, setDeadline] = useState("");
    const [open, setOpen] = React.useState(false);


    useEffect(() => {
        getListingInfo();
    }, [])


    const handleClose = () => {
        setOpen(false);
    };
    // Function that changes state of toggle
    const handleChange = (event) => {
        // changeVisibility();
        setIsVisible(!isVisible);
    };

    // Function that changes state of text
    function textFieldHandleChange(e) {
        setListingTitle(e.target.value)
    }

    function descFieldHandleChange(e) {
        setListingDesc(e.target.value)
    }

    function deadlineFieldHandleChange(e) {
        setDeadline(e.target.value)
    }

    // API function that gets info of a listing
    function getListingInfo() {
        axios.get("http://127.0.0.1:5000/admin/postings/" + id)
            .then(res => {
                return res.data;
            })
            .then(data => {
                console.log(data.postingInfo);
                return data.postingInfo;
            })
            .then(postingInfo => {
                setListingInfo(postingInfo);
                setIsVisible(postingInfo["isVisible"])
                setListingTitle(postingInfo["title"])
                setListingDesc(postingInfo["info"])
                setDeadline(postingInfo["deadline"])
                return;
            })
            .catch(err => {
                console.log(err);
            })
    }

    function updateJobListing() {
        setOpen(true);
        axios.patch(
            "http://127.0.0.1:5000/admin/postings/" + id,
            {
                "title": listingTitle,
                "info": listingDesc,
                "deadline": deadline,
                "isVisible": isVisible,
            });
    }


    return (
        <Container>
            <Title>Listing Information</Title>
            <br></br>
            <TextField
                style={{ width: "500px" }}
                required
                id="outlined-required"
                label="Title"
                value={listingTitle}
                onChange={textFieldHandleChange}
                variant="outlined"
            />
            <br></br>
            <br></br>
            <TextField
                style={{ width: "500px" }}
                required
                id="outlined-required"
                label="Description"
                value={listingDesc}
                onChange={descFieldHandleChange}
                variant="outlined"
                multiline
                rows={10}
            />
            <br></br>
            <br></br>
            <TextField
                id="datetime-local"
                label="Deadline"
                type="datetime-local"
                value={deadline}
                className={classes.textField}
                onChange={deadlineFieldHandleChange}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <p>Is Visible</p>
            <Switch
                checked={isVisible}
                onChange={handleChange}
                name="checked"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
            <br></br>
            <Button variant="contained" color="primary" justify="flex-end" onClick={updateJobListing}>
                Update
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{listingTitle + " information saved!"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Click outside the box to go back to the main screen.
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </Container>
    )
}

const CustomButton = styled(Button)({
    color: "red",
    backgroundColor: "#873CA2"
});

const Container = styled.div`
    width:100%;
    height:100%;
    padding: 81px 91px 2px 91px;
    flex-direction:container;
`;

const Title = styled.div`
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 36px;
    line-height: 42px;
    color: #873CA2; /* Accent Purple */
`;

export default ListingInfo;