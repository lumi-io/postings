<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import {
    useParams
} from "react-router-dom";
import { purple } from '@material-ui/core/colors';

import DeleteIcon from '@material-ui/icons/Delete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Divider from '@material-ui/core/Divider';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import styled from 'styled-components';
import axios from 'axios';
=======
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { purple } from "@material-ui/core/colors";

import DeleteIcon from "@material-ui/icons/Delete";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Divider from "@material-ui/core/Divider";

import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import styled from "styled-components";
import axios from "axios";
>>>>>>> main

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const EditListingField = () => {
<<<<<<< HEAD
    const classes = useStyles();
    let { id } = useParams();

    const [listingInfo, setListingInfo] = useState({});
    const [essayQuestions, setEssayQuestions] = useState([]);
    const [visible, setVisible] = React.useState(false);
    const [open, setOpen] = React.useState(false);



    useEffect(() => {
        getListingInfo();
    }, [])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };

    // API function that gets info of a listing
    const getListingInfo = () => {
        axios.get(process.env.REACT_APP_FLASK_SERVER + "admin/postings/" + id)
            .then(res => {
                return res.data;
            })
            .then(data => {
                return data.postingInfo;
            })
            .then(postingInfo => {
                let postingInfoToUpdate = postingInfo;
                if (postingInfoToUpdate !== {}) {
                    delete postingInfoToUpdate["_id"];
                    setListingInfo(postingInfoToUpdate);
                }
                if (postingInfoToUpdate.essay.length !== 0) {
                    setEssayQuestions(postingInfoToUpdate.essay);
                }
                setVisible(postingInfo.isVisible);
                setListingInfo(postingInfoToUpdate);
                return;
            })
            .catch(err => {
                console.log(err);
            })
    }




    // Function that changes state of toggle in listingInfo object
    const handleVisibilityToggle = (event) => {
        setListingInfo(prevState => ({
            ...prevState,
            isVisible: !prevState.isVisible
        }));
        setVisible(!visible);
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
=======
  const classes = useStyles();
  let { id } = useParams();

  const [listingInfo, setListingInfo] = useState({});
  const [open, setOpen] = React.useState(false);
  const [essayQuestions, setEssayQuestions] = useState([]);

  useEffect(() => {
    getListingInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // API function that gets info of a listing
  const getListingInfo = () => {
    axios
      .get(process.env.REACT_APP_FLASK_SERVER + "admin/postings/" + id)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        return data.postingInfo;
      })
      .then((postingInfo) => {
        let postingInfoToUpdate = postingInfo;
        if (postingInfoToUpdate !== {}) {
          delete postingInfoToUpdate["_id"];
          setListingInfo(postingInfoToUpdate);
        }
        if (postingInfoToUpdate.essay.length !== 0) {
          setEssayQuestions(postingInfoToUpdate.essay);
>>>>>>> main
        }
        return;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Function that changes the state of the overlay when button is clicked
  const handleClose = () => {
    setOpen(false);
    window.location.href = process.env.REACT_APP_AUTH0_REDIRECT_URI;
  };

  // Function that changes state of toggle in listingInfo object
  const handleVisibilityToggle = (event) => {
    setListingInfo((prevState) => ({
      ...prevState,
      isVisible: !prevState.isVisible,
    }));
    return;
  };

  // Function that changes the state of the deadline date
  function deadlineFieldHandleChange(e) {
    setListingInfo((prevState) => {
      const val = e.target.value;
      var newObj = {};
      newObj["deadline"] = val;
      return Object.assign({}, prevState, newObj);
    });
  }

  const fields = [
    ["About Us", "aboutUs"],
    ["Who are we looking for", "qualifications"],
  ];

  // Help function to update fields of listingInfo obj with id passed in as a paramter
  const updateField = (e, id) => {
    setListingInfo({
      ...listingInfo,
      [id]: e.target.value,
    });
    return;
  };

  const addQuestion = () => {
    setEssayQuestions((prevState) => [...prevState, ""]);
    return;
  };

  //delete all questions
  const deleteAll = () => {
    setEssayQuestions([]);
    return;
  };

  //delete specific question
  const deleteQuestion = (index) => {
    if (essayQuestions.length === 0) {
      setEssayQuestions([]);
      return;
    }
    setEssayQuestions(() => {
      let essayQuestionsCopy = [];
      for (let i = 0; i < essayQuestions.length; i++) {
        if (i !== index) {
          essayQuestionsCopy.push(essayQuestions[i]);
        }
<<<<<<< HEAD
        axios.patch(
            process.env.REACT_APP_FLASK_SERVER + "admin/postings/" + id,
            listingInfo
        )
        .then(() => {
            setTimeout(setOpen(true), 5000);
            window.location.href = process.env.REACT_APP_AUTH0_REDIRECT_URI;
        })
    }

    return (
        <Container>
            <Title>Listing Information</Title>
            <br></br>
            <FormControlLabel
                control={<PurpleSwitch
                onChange={handleVisibilityToggle}
                checked={(visible)}
                name="checked"
                inputProps={{ 'aria-label': 'secondary checkbox' }} />}
                label="Visible"
            />
            <br></br>
            <br></br>
            <CustmomTextfield
                style={{ width: "500px",}}
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
            <CustomButton style={{marginTop: "20px", marginRight: "20px"}} variant="contained" color="primary" justify="flex-end" onClick={updateJobListing}>
                Update
            </CustomButton>
            <CustomCancel style={{marginTop: "20px"}} variant="contained" color="primary" justify="flex-end" onClick={() =>
                                    (window.location.href =
                                      "/admin/listing")
                                  }>
                Cancel
            </CustomCancel>
            <br></br>
            <br></br>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Listing Updated!
                </Alert>
            </Snackbar>
        </Container>
    )
}
=======
      }
      return essayQuestionsCopy;
    });
  };

  const updateEssayQuestion = (e, idx) => {
    let essayQuestionsCopy = [...essayQuestions];
    essayQuestionsCopy[idx] = e.target.value;
    setEssayQuestions(essayQuestionsCopy);
    return;
  };

  function updateJobListing() {
    var listingInfoToSubmit = listingInfo;
    if (essayQuestions.length !== 0) {
      var essayQuestionsFiltered = essayQuestions.filter((q) => q);
      // After filtering, if length of questions is not zero, add questions to update field
      listingInfoToSubmit["essay"] = essayQuestionsFiltered;
    } else {
      listingInfoToSubmit["essay"] = [];
    }
    axios
      .patch(
        process.env.REACT_APP_FLASK_SERVER + "admin/postings/" + id,
        listingInfoToSubmit
      )
      .then(() => {
        setOpen(true);
      });
  }

  return (
    <Container>
      <Title>Listing Information</Title>
      <br></br>
      <FormControlLabel
        control={
          <PurpleSwitch
            checked={listingInfo["isVisible"]}
            onChange={handleVisibilityToggle}
            name="checked"
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
        }
        label="Visible"
      />
      <br></br>
      <br></br>
      <CustomTextfield
        style={{ width: "500px" }}
        required
        id="outlined-required"
        label="Title"
        value={listingInfo.title || ""}
        onChange={(e) => updateField(e, "title")}
        variant="outlined"
      />
      <br></br>
      <br></br>
      {fields.map((field) => (
        <BigTextContainer>
          <CustomTextfield
            style={{ width: "100%" }}
            required
            id="outlined-required"
            label={field[0]}
            value={listingInfo[field[1]] || ""}
            onChange={(e) => updateField(e, field[1])}
            variant="outlined"
            multiline
            rows={7}
          />
        </BigTextContainer>
      ))}

      <br></br>
      <p>Essay Questions / Additional Questions</p>
      <CustomButton
        style={{ marginRight: "10px", marginBottom: "10px" }}
        variant="contained"
        color="primary"
        justifyContent="flex-end"
        onClick={addQuestion}
      >
        Add
      </CustomButton>
      <CustomButton
        style={{ marginRight: "10px", marginBottom: "10px" }}
        variant="contained"
        color="primary"
        justify="flex-end"
        onClick={deleteAll}
      >
        Delete All
      </CustomButton>

      <br></br>

      {essayQuestions.map((field, index) => (
        <EssayQuestionContainer>
          <CustomTextfield
            style={{ width: "500px" }}
            required
            id="outlined-required"
            label={"Question " + (index + 1)}
            value={essayQuestions[index]}
            onChange={(e) => updateEssayQuestion(e, index)}
            variant="outlined"
          />
          <DeleteIcon
            style={{
              color: purple[300],
              marginTop: "15px",
              paddingLeft: "10px",
            }}
            variant="contained"
            color="primary"
            justify="flex-end"
            onClick={(e) => deleteQuestion(index)}
          >
            Delete
          </DeleteIcon>
        </EssayQuestionContainer>
      ))}
      <br></br>
      <br></br>
      <Divider></Divider>
      <br></br>
      <p>Deadline</p>
      <CustomTextfield
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
      <CustomButton
        style={{ marginTop: "20px", marginRight: "20px" }}
        variant="contained"
        color="primary"
        justify="flex-end"
        onClick={updateJobListing}
      >
        Update
      </CustomButton>
      <CustomCancel
        style={{ marginTop: "20px" }}
        variant="contained"
        color="primary"
        justify="flex-end"
        onClick={() => (window.location.href = "/admin/listing")}
      >
        Cancel
      </CustomCancel>
      <br></br>
      <br></br>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {listingInfo["title"] + " listing updated!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Click outside the box to go back to the main screen.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Container>
  );
};
>>>>>>> main

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 81px 91px 2px 91px;
  flex-direction: container;
  padding-bottom: 10px;
`;

const Title = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 42px;
  color: #873ca2; /* Accent Purple */
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
      "background-color": "#61486A",
    },
  },
})(Button);

const CustomTextfield = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#61486A",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#8A3DA6",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#BEBEBE",
      },
      "&:hover fieldset": {
        borderColor: "#8A3DA6",
        borderWidth: 2,
      },
      "&.Mui-focused fieldset": {
        borderColor: "#8A3DA6",
      },
    },
  },
})(TextField);

const PurpleSwitch = withStyles({
  switchBase: {
    "&$checked": {
      color: purple[500],
    },
    "&$checked + $track": {
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
      "background-color": "#61486A",
    },
  },
})(Button);

export default EditListingField;
