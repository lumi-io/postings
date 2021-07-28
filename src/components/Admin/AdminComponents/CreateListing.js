import React, { useState } from 'react';

import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import { purple } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Divider from '@material-ui/core/Divider';

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

    const [listingInfo, setListingInfo] = useState({ isVisible: false });
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [create, setCreate] = React.useState(false);
    const [essayQuestions, setEssayQuestions] = useState([]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
        setError(false);
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

    // Function that executes POST request to the backend
    const createJobListing = () => {
        if (!('title' in listingInfo) || !('aboutUs' in listingInfo) || !('qualifications' in listingInfo) || !('deadline' in listingInfo)) {
            setOpen(true);
            return;
        }
        let listingInfoToSubmit = listingInfo;
        if (essayQuestions.length !== 0) {
            listingInfoToSubmit["essay"] = essayQuestions;
        }
        axios.post(
            process.env.REACT_APP_FLASK_SERVER + "admin/postings/create",
            listingInfoToSubmit
        )
        .then(res => {
            if (res.data.status) setCreate(true);
            window.location.href = process.env.REACT_APP_AUTH0_REDIRECT_URI;
        })
        .catch((e) => {
            setError(true)
        });
        return;
    }

    // Help function to update fields of listingInfo obj with id passed in as a paramter
    const updateField = (e, id) => {
        setListingInfo(prevState => {
            const val = e.target.value;
            var newObj = {};
            newObj[id] = val;
            return Object.assign({}, prevState, newObj);
        });
        return;
    }

    const addQuestion = () => {
        setEssayQuestions(prevState => [...prevState, ""])
        return;
    }

    //delete all questions
    const deleteAll = () => {
        setEssayQuestions([])
        return;
    }

    //delete specific question
    const deleteQuestion = (index) => {
        if (essayQuestions.length === 0) {
            return;
        }
        setEssayQuestions(() => { 
            let essayQuestionsCopy = []
            for (let i = 0; i<essayQuestions.length; i++){
                if (i !== index){
                    essayQuestionsCopy.push(essayQuestions[i])
                }
            }
            return essayQuestionsCopy})
    }

    const updateEssayQuestion = (e, idx) => {
        let essayQuestionsCopy = [...essayQuestions]
        essayQuestionsCopy[idx] = e.target.value;
        setEssayQuestions(essayQuestionsCopy)
        return;
    }

    return (
        <Container>
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                Please fill out all necessary fields.
                </Alert>
            </Snackbar>
            <Snackbar open={create} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                Posting created!
                </Alert>
            </Snackbar>
            <Snackbar open={error} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                Network/Login Error
                </Alert>
            </Snackbar>
            <Title>Create New Listing</Title>
            <br></br>
            <FormControlLabel
                control={<PurpleSwitch checked={listingInfo["isVisible"]}
                onChange={handleVisibilityToggle}
                name="checked"
                inputProps={{ 'aria-label': 'secondary checkbox' }} />}
                label="Visible"
            />
            <br></br>
            <br></br>
            <CustmomTextfield
                style={{ width: "500px"}}
                required
                id="outlined-required"
                label="Title"
                value={listingInfo.title || ""}
                onChange={e => updateField(e, "title")}
                variant="outlined"
            />
            <br></br>
            <br></br>
            {fields.map((field) => (
                <BigTextContainer>
                    <CustmomTextfield
                        style={{ width: "100%" }}
                        required
                        id="outlined-required"
                        label={field[0]}
                        value={listingInfo[field[1]] || ""}
                        onChange={e => updateField(e, field[1])}
                        variant="outlined"
                        multiline
                        rows={7}
                    />
                </BigTextContainer>
            ))}

            <br></br>
            <p>Essay Questions / Additional Questions</p>
            <CustomButton
                style={{marginRight: "10px", marginBottom: "10px"}}
                variant="contained"
                color="primary"
                justifyContent="flex-end"
                onClick={addQuestion}>
                Add
            </CustomButton>
            <CustomButton
                style={{marginRight: "10px", marginBottom: "10px"}}
                variant="contained"
                color="primary"
                justify="flex-end"
                onClick={deleteAll}>
                Delete All
            </CustomButton>
        
            <br></br>

            {essayQuestions.map((field, index) => (
                <EssayQuestionContainer>
                    <CustmomTextfield
                        style={{ width: "500px" }}
                        required
                        id="outlined-required"
                        label={"Question " + (index + 1)}
                        value={essayQuestions[index]}
                        onChange={e => updateEssayQuestion(e, index)}
                        variant="outlined"
                    />
                    <DeleteIcon style={{color: purple[300], marginTop: "15px", paddingLeft: "10px"}}
                        variant="contained"
                        color="primary"
                        justify="flex-end"
                        onClick={e => deleteQuestion(index)}>
                        Delete
                    </DeleteIcon>
                </EssayQuestionContainer>

            ))}
            <br></br>
            <br></br>
            <Divider></Divider>
            <br></br>
            <p>Deadline</p>
            <CustmomTextfield
                id="datetime-local"
                type="datetime-local"
                value={listingInfo["deadline"]}
                className={classes.textField}
                onChange={deadlineFieldHandleChange}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <br></br>
            <br></br>
            <CustomButton style={{marginTop: "20px", marginRight: "20px"}} variant="contained" color="primary" justify="flex-end" onClick={createJobListing}>
                Create
            </CustomButton>
            <CustomCancel style={{marginTop: "20px"}} variant="contained" color="primary" justify="flex-end" onClick={() =>
                                    (window.location.href =
                                      "/admin/listing")
                                  }>
                Cancel
            </CustomCancel>

            <br></br>
            <br></br>
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

const CustomButton = withStyles({
    root: {
        "background-color": "#8A3DA6",
        "margin-right": "5px",
        "&:hover": {
            "background-color": "#61486A"
        }
    }
})(Button);

const CustmomTextfield = withStyles({
    root: {
      '& label.Mui-focused': {
        color: '#61486A',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#8A3DA6',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#BEBEBE',
        },
        '&:hover fieldset': {
          borderColor: '#8A3DA6',
          borderWidth: 2
        },
        '&.Mui-focused fieldset': {
          borderColor: '#8A3DA6',
        },
      },
    },
  })(TextField);


const PurpleSwitch = withStyles({
    switchBase: {
      '&$checked': {
        color: purple[500],
      },
      '&$checked + $track': {
        backgroundColor: purple[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);

const CustomCancel = withStyles({
    root: {
        "background-color": "#BEBEBE",
        "margin-left": "5px",
        "margin-right": "5px",
        "&:hover": {
            "background-color": "#61486A"
        }
    }
})(Button);

export default CreateListing;