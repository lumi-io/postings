import React, { useState } from 'react';
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



const CreateListing = () => {
    const classes = useStyles();
    let { id } = useParams();

    const [listingInfo, setListingInfo] = useState({});
    const [isVisible, setIsVisible] = useState(false);
    const [listingDesc, setListingDesc] = useState("");
    const [deadline, setDeadline] = useState("");
    const [open, setOpen] = React.useState(false);

    // Function that changes the state of the overlay when button is clicked
    const handleClose = () => {
        setOpen(false);
    };

    // Function that changes state of toggle
    const handleChange = (event) => {
        setIsVisible(!isVisible);
    };

    // Function that changes the state of the description text field
    function descFieldHandleChange(e) {
        setListingDesc(e.target.value)
    }

    // Function that changes the state of the deadline date
    function deadlineFieldHandleChange(e) {
        setDeadline(e.target.value)
    }

    const fields = [
        ["About Us", "aboutUs"],
        ["Who are we looking for", "qualifications"]
    ]

    // Function that executes POST request to the backend
    function createJobListing() {
        // if (listingTitle === "" || listingDesc === "" || deadline === "") {
        //     console.log("empty");
        //     return;
        // }
        axios.post(
            "http://127.0.0.1:5000/admin/postings/create",
            {
                // "title": listingTitle,
                "info": listingDesc,
                "deadline": deadline,
                "isVisible": isVisible,
            }
        )
            .then(res => {
                if (res.data.status) setOpen(true);
            });
        return;
    }

    const updateField = (e, id) => {
        console.log(e)
        setListingInfo(prevState => {
            const val = e.target.value;
            var newObj = {};
            newObj[id] = val;
            return Object.assign({}, prevState, newObj);
        });
        console.log(listingInfo);
    }


    return (
        <Container>
            <Title>Create New Listing</Title>
            <br></br>
            <TextField
                style={{ width: "500px" }}
                required
                id="outlined-required"
                label="Title"
                value={listingInfo["title"]}
                onChange={e => updateField(e, "title")}
                variant="outlined"
            />
            <br></br>
            <br></br>
            {fields.map((field) => (
                <TextField
                    style={{ width: "500px" }}
                    required
                    id="outlined-required"
                    label={field[0]}
                    value={listingInfo[field[1]]}
                    onChange={e => updateField(e, field[1])}
                    variant="outlined"
                    multiline
                    rows={10}
                />
            ))}

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
            <Button variant="contained" color="primary" justify="flex-end" onClick={createJobListing}>
                Create
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{listingInfo["title"] + " listing created!"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Click outside the box to go back to the main screen.
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </Container>
    )
}

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

const BigTextBox = styled.div`

`;

export default CreateListing;