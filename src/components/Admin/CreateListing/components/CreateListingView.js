import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { purple } from "@material-ui/core/colors";
import DeleteIcon from "@material-ui/icons/Delete";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Divider from "@material-ui/core/Divider";

import axios from "axios";

import {
  Container,
  Title,
  BigTextContainer,
  EssayQuestionContainer,
  CustomButton,
  CustomTextField,
  PurpleSwitch,
  CustomCancel,
} from "../helpers/Style";

import { fields } from "../helpers/Constants";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const CreateListingView = () => {
  const classes = useStyles();

  const [listingInfo, setListingInfo] = useState({ isVisible: false });
  const [open, setOpen] = React.useState(false);
  const [essayQuestions, setEssayQuestions] = useState([]);

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

  // Function that executes POST request to the backend
  const createJobListing = () => {
    if (
      !("title" in listingInfo) ||
      !("aboutUs" in listingInfo) ||
      !("qualifications" in listingInfo)
    ) {
      console.log("Please fill out all necessary fields.");
      return;
    }
    let listingInfoToSubmit = listingInfo;
    if (essayQuestions.length !== 0) {
      listingInfoToSubmit["essay"] = essayQuestions;
    }
    axios
      .post(
        process.env.REACT_APP_FLASK_SERVER + "admin/postings/create",
        listingInfoToSubmit
      )
      .then((res) => {
        console.log(res);
        if (res.data.status) setOpen(true);
      });
    return;
  };

  // Help function to update fields of listingInfo obj with id passed in as a paramter
  const updateField = (e, id) => {
    setListingInfo((prevState) => {
      const val = e.target.value;
      var newObj = {};
      newObj[id] = val;
      return Object.assign({}, prevState, newObj);
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
      return;
    }
    setEssayQuestions(() => {
      let essayQuestionsCopy = [];
      for (let i = 0; i < essayQuestions.length; i++) {
        if (i !== index) {
          essayQuestionsCopy.push(essayQuestions[i]);
        }
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

  return (
    <Container>
      <Title>Create New Listing</Title>
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
      <CustomTextField
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
          <CustomTextField
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
          <CustomTextField
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
      <CustomTextField
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
        onClick={createJobListing}
      >
        Create
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
          {listingInfo["title"] + " listing created!"}
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

export default CreateListingView;
