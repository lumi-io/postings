import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import axios from "axios";

import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import FileUploadButton from "./components/FileUploadButton";
import ContentContainer from "./components/ContentContainer";

import PopupDisplay from "../../Popups/PopupDisplay";
import CollegesCheckbox from "./components/CollegesCheckbox";
import EmailForm from "./components/EmailForm";
import PhoneForm from "./components/PhoneForm";


import { getPostingData } from "./helpers/Data";

import {
  Container,
  SubmissionContainer,
  Title,
  TextFieldStyled,
  FieldText,
  CustomTextField,
} from "./helpers/Style";

import {
  parseOutColleges,
  requiredFieldsExist,
  handleResumeUpload,
  handleImageUpload
} from "./helpers/Functions";

import { requiredFields, optionalFields } from "./helpers/Constants";

const PortalSubmission = () => {
  const history = useHistory();
  const { id } = useParams();

  const [listingsInfo, setListingsInfo] = useState([]);
  const [appInfo, setAppInfo] = useState({ gradYear: null });
  const [resumeName, setResumeName] = useState("");
  const [imageName, setImageName] = useState("");
  const [submission, setSubmission] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [colleges, setColleges] = useState({
    CAS: false,
    Pardee: false,
    QST: false,
    COM: false,
    ENG: false,
    CFA: false,
    CGS: false,
    Sargent: false,
    SHA: false,
    Wheelock: false,
  });

  const selectFields = [["How did you hear about PCT?", "marketing"]];

  function validateEmail(event) {
    const regexp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setValidEmail(regexp.test(event.target.value));
  }

  // POSTs final user data to backend
  const handleSubmission = async () => {
    // Turns on circular loading
    setSubmission(true);

    // Check if the deadline has passed
    var d = new Date();
    var month = "-0" + (d.getMonth() + 1);
    var date = "-0" + d.getDate();
    if (d.getMonth() > 8) {
      month = "-" + (d.getMonth() + 1);
    }
    if (d.getDate() > 9) {
      date = "-" + d.getDate();
    }
    var formattedDate = d.getFullYear() + month + date;
    const dateTime = (date) => {
      return date.substring(0, 10);
    };
    if (dateTime(listingsInfo["deadline"]) < formattedDate){
      setSubmission(false);
      setErrorMessage(
        "Deadline has passed. Applications are not accpeted anymore."
      );
      setOpenError(true);
      return
    }

    // Parse out colleges for submission and add to object
    const collegesToSubmit = parseOutColleges(colleges);
    let appInfoToSubmit = appInfo;
    appInfoToSubmit["colleges"] = collegesToSubmit;

    // Check if required fields are existing in the applicant's info data
    if (!requiredFieldsExist(appInfoToSubmit)) {
      setSubmission(false);
      setErrorMessage(
        "Failed to send application. Please fill out all necessary fields."
      );
      setOpenError(true);
      return;
    }

    await axios
      .post(
        process.env.REACT_APP_FLASK_SERVER + "user/portal/submit/" + id,
        appInfoToSubmit
      )
      .then(() => {
        appInfoToSubmit = {};
        setAppInfo({
          gradYear: null,
        });
        setColleges({
          CAS: false,
          Pardee: false,
          QST: false,
          COM: false,
          ENG: false,
          CFA: false,
          CGS: false,
          Sargent: false,
          SHA: false,
          Wheelock: false,
        });
      })
      .then(() => {
        setSubmission(false);
        history.push("/thank-you");
      })
      .catch((e) => {
        setSubmission(false);
        setErrorMessage(
          e.toString() + ", please contact the admin or PCT Recruitment Team."
        );
        setOpenError(true);
      });
  };

  // Handles colleges checkbox changes in boolean value
  const handleCollegesCheckboxChange = (event) => {
    setColleges({ ...colleges, [event.target.name]: event.target.checked });
  };

  useEffect(() => {
    getPostingData(
      id,
      setAppInfo,
      setListingsInfo,
      setErrorMessage,
      setOpenError
    );
  }, [id]);

  return (
    listingsInfo && (
      <Container>
        <PopupDisplay
          message={errorMessage}
          open={openError}
          setOpen={setOpenError}
          setErrorMessage={setErrorMessage}
          severity="error"
        />

        {/* Container showing information of listing */}
        <ContentContainer
          title={listingsInfo["title"]}
          aboutUs={listingsInfo["aboutUs"]}
          qualifications={listingsInfo["qualifications"]}
        />

        <SubmissionContainer>
          <Title>Apply for this position</Title>
          {requiredFields.map((text) => (
            <TextFieldStyled>
              <FieldText>{text.label}*</FieldText>
              <CustomTextField
                required
                variant="outlined"
                fullWidth
                name={text.name}
                type={text.type}
                error={appInfo[text.name] === ""}
                helperText={
                  appInfo[text.name] === "" ? "This field cannot be empty." : ""
                }
                onChange={(e) => {
                  setAppInfo((prevState) => {
                    const val = e.target.value;
                    var newObj = {};
                    newObj[text.name] = val;
                    return Object.assign({}, prevState, newObj);
                  });
                }}
              />
            </TextFieldStyled>
          ))}
          <TextFieldStyled>
            <FieldText>Minor</FieldText>
            <CustomTextField
              variant="outlined"
              fullWidth
              id="minor"
              type="text"
              onChange={(e) => {
                setAppInfo((prevState) => {
                  const val = e.target.value;
                  var newObj = {};
                  newObj["minor"] = val;
                  return Object.assign({}, prevState, newObj);
                });
              }}
            />
          </TextFieldStyled>

          <TextFieldStyled>
            <FieldText>GPA* (n/a if Not Applicable)</FieldText>
            <CustomTextField
              variant="outlined"
              id="minor"
              type="text"
              onChange={(e) => {
                setAppInfo((prevState) => {
                  const val = e.target.value;
                  var newObj = {};
                  newObj["gpa"] = val;
                  return Object.assign({}, prevState, newObj);
                });
              }}
            />
          </TextFieldStyled>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <TextFieldStyled>
              <FieldText>Expected Graduation Date*</FieldText>
              <DatePicker
                variant="inline"
                views={["year", "month"]}
                value={appInfo["gradYear"]}
                minDate={new Date()}
                onChange={(e) => {
                  setAppInfo((prevState) => {
                    const val = e;
                    var newObj = {};
                    newObj["gradYear"] = val;
                    return Object.assign({}, prevState, newObj);
                  });
                }}
              />
            </TextFieldStyled>
          </MuiPickersUtilsProvider>
          <FieldText>College(s)*</FieldText>
          <CollegesCheckbox
            colleges={colleges}
            handleCollegesCheckboxChange={handleCollegesCheckboxChange}
          />

          <EmailForm
            appInfo={appInfo}
            validEmail={validEmail}
            setAppInfo={setAppInfo}
            validateEmail={validateEmail}
          />

          <PhoneForm setAppInfo={setAppInfo} />

          {optionalFields.map((text) => (
            <TextFieldStyled>
              <FieldText>{text.label}</FieldText>
              <CustomTextField
                variant="outlined"
                fullWidth
                id={text.name}
                type={text.type}
                onChange={(e) => {
                  setAppInfo((prevState) => {
                    const val = e.target.value;
                    var newObj = {};
                    newObj[text.name] = val;
                    return Object.assign({}, prevState, newObj);
                  });
                }}
              />
            </TextFieldStyled>
          ))}
          <FieldText>Resume/CV*(upload file size LESS than 550KB)</FieldText>
          <FileUploadButton
            function={(event) => handleResumeUpload(event, setResumeName, setAppInfo)}
            textField={resumeName}
          />

          <FieldText>Please attach a picture of yourself*(upload file size LESS than 550KB) </FieldText>
          <FileUploadButton
            function={(event) => handleImageUpload(event, setImageName, setAppInfo)}
            textField={imageName}
          />

          {/* Component for Essay Fields */}
          {listingsInfo.essay &&
            listingsInfo.essay.map((question, idx) => (
              <TextFieldStyled>
                <FieldText>{question + "*"}</FieldText>
                <CustomTextField
                  variant="outlined"
                  fullWidth
                  rows={7}
                  multiline
                  id={question}
                  type="text"
                  onChange={(e) => {
                    setAppInfo((prevState) => {
                      const val = e.target.value;
                      var essayArr = prevState["essay"];
                      essayArr[idx]["answer"] = val;
                      return Object.assign({}, prevState, { essay: essayArr });
                    });
                  }}
                />
              </TextFieldStyled>
            ))}

          {selectFields.map((text) => (
            <TextFieldStyled>
              <FieldText>{text[0]}</FieldText>
              <CustomTextField
                id="outlined-full-width"
                fullWidth
                variant="outlined"
              />
            </TextFieldStyled>
          ))}

          <br></br>
          <Button
            size="large"
            fullWidth="true"
            variant="contained"
            component="label"
            style={{
              "background-color": "#873CA2",
              color: "#F9F6F9",
            }}
            onClick={handleSubmission}
            disabled={!submission ? false : true}
          >
            {!submission ? (
              `Submit Application`
            ) : (
              <CircularProgress color="inherit" size={26} />
            )}
          </Button>
        </SubmissionContainer>
      </Container>
    )
  );
};

export default PortalSubmission;
