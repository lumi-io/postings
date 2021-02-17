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



const EditListingField = () => {
    const classes = useStyles();
    let { id } = useParams();

    const [listingInfo, setListingInfo] = useState({});
    const [open, setOpen] = React.useState(false);
    const [essayQuestions, setEssayQuestions] = useState([]);


    useEffect(() => {
        getListingInfo();
    }, [])

    // API function that gets info of a listing
    const getListingInfo = () => {
        axios.get("http://127.0.0.1:5000/admin/postings/" + id)
            .then(res => {
                return res.data;
            })
            .then(data => {
                return data.postingInfo;
            })
            .then(postingInfo => {
                let postingInfoToUpdate = postingInfo;
                delete postingInfoToUpdate["_id"];
                setListingInfo(postingInfoToUpdate);
                setEssayQuestions(postingInfoToUpdate.essay);
                return;
            })
            .catch(err => {
                console.log(err);
            })
    }


    // Function that changes the state of the overlay when button is clicked
    const handleClose = () => {
        setOpen(false);
    };

    // Function that changes state of toggle in listingInfo object
    const handleVisibilityToggle = (event) => {
        setListingInfo(prevState => ({
            ...prevState,
            isVisible: !prevState.isVisible
        }));
        return;
    };

    // Function that changes the state of the deadline date
    function deadlineFieldHandleChange(e) {
        setListingInfo(prevState => {
            const val = e.target.value;
            var newObj = {};
            newObj["deadline"] = val;
            return Object.assign({}, prevState, newObj);
        });
    }

    const fields = [
        ["About Us", "aboutUs"],
        ["Who are we looking for", "qualifications"]
    ]


    // Help function to update fields of listingInfo obj with id passed in as a paramter
    const updateField = (e, id) => {
        setListingInfo({
            ...listingInfo,
            [id]: e.target.value
        });
        console.log(listingInfo);
        return;
    }

    const addQuestion = () => {
        setEssayQuestions(prevState => [...prevState, ""])
        return;
    }

    const deleteQuestion = () => {
        if (essayQuestions.length === 0) {
            return;
        }
        setEssayQuestions(prevState => prevState.slice(0, -1))
        return;
    }

    const updateEssayQuestion = (e, idx) => {
        let essayQuestionsCopy = [...essayQuestions]
        essayQuestionsCopy[idx] = e.target.value;
        setEssayQuestions(essayQuestionsCopy)
        console.log(essayQuestions);
        return;
    }


    function updateJobListing() {
        let listingInfoToSubmit = listingInfo;
        if (essayQuestions.length !== 0) {
            listingInfoToSubmit["essay"] = essayQuestions;
        }
        axios.patch(
            "http://127.0.0.1:5000/admin/postings/" + id,
            listingInfo
        )
        .then(() => {
            setOpen(true);
        })
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
                value={listingInfo.title}
                onChange={e => updateField(e, "title")}
                variant="outlined"
            />
            <br></br>
            <br></br>
            {fields.map((field) => (
                <BigTextContainer>
                    <TextField
                        style={{ width: "100%" }}
                        required
                        id="outlined-required"
                        label={field[0]}
                        value={listingInfo[field[1]]}
                        onChange={e => updateField(e, field[1])}
                        variant="outlined"
                        multiline
                        rows={7}
                    />
                </BigTextContainer>
            ))}

            <h3>Essay Questions</h3>
            <Button
                variant="contained"
                color="primary"
                justify="flex-end"
                onClick={addQuestion}>
                Add
            </Button>
            <Button
                variant="contained"
                color="primary"
                justify="flex-end"
                onClick={deleteQuestion}>
                Delete
            </Button>

            <br></br>
            <br></br>

            {essayQuestions.map((field, index) => (
                <EssayQuestionContainer>
                    <TextField
                        style={{ width: "500px" }}
                        required
                        id="outlined-required"
                        label={"Question " + (index + 1)}
                        value={essayQuestions[index]}
                        onChange={e => updateEssayQuestion(e, index)}
                        variant="outlined"
                    />
                </EssayQuestionContainer>

            ))}


            <br></br>
            <br></br>
            <TextField
                id="datetime-local"
                label="Deadline"
                type="datetime-local"
                value={listingInfo["deadline"]}
                className={classes.textField}
                onChange={deadlineFieldHandleChange}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <p>Is Visible</p>
            <Switch
                checked={listingInfo["isVisible"]}
                onChange={handleVisibilityToggle}
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

const BigTextContainer = styled.div`
    padding-bottom: 10px;
    padding-top: 10px;
`;

const EssayQuestionContainer = styled.div`
    padding-bottom: 7.5px;
    padding-top: 7.5px;
`;

export default EditListingField;