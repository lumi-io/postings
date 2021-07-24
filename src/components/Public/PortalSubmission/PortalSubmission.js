import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import axios from "axios";

import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import FileUploadButton from "./components/FileUploadButton";
import ContentContainer from "./components/ContentContainer";
import ErrorPopup from "./components/ErrorPopup";

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
  convertBase64,
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

  function emailForm() {
    return (
      <TextFieldStyled>
        <FieldText>Email address*</FieldText>
        <CustomTextField
          required
          variant="outlined"
          fullWidth
          name="email"
          type="email"
          error={appInfo["email"] === "" || !validEmail}
          helperText={
            appInfo["email"] === "" || !validEmail
              ? "This field is empty or email is not valid."
              : ""
          }
          onChange={(e) => {
            setAppInfo((prevState) => {
              validateEmail(e);
              const val = e.target.value;
              var newObj = {};
              newObj["email"] = val;
              return Object.assign({}, prevState, newObj);
            });
          }}
        />
      </TextFieldStyled>
    );
  }

  function phoneForm() {
    return (
      <TextFieldStyled>
        <FieldText>Phone number*</FieldText>
        <CustomTextField
          required
          variant="outlined"
          fullWidth
          name="phone"
          type="tel"
          onChange={(e) => {
            setAppInfo((prevState) => {
              const val = e.target.value;
              var newObj = {};
              newObj["phone"] = val;
              return Object.assign({}, prevState, newObj);
            });
          }}
        />
      </TextFieldStyled>
    );
  }

  // Resume uploader helper function
  const handleResumeUpload = async (event) => {
    const file = event.target.files[0];
    setResumeName(file["name"]);
    const base64 = await convertBase64(file);
    setAppInfo((prevState) => {
      const val = base64;
      var newObj = {};
      newObj["resume"] = val;
      return Object.assign({}, prevState, newObj);
    });
  };

  // Image uploader helper function
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    setImageName(file["name"]);
    const base64 = await convertBase64(file);
    setAppInfo((prevState) => {
      const val = base64;
      var newObj = {};
      newObj["image"] = val;
      return Object.assign({}, prevState, newObj);
    });
  };

  // POSTs final user data to backend
  const handleSubmission = async () => {
    // Turns on circular loading
    setSubmission(true);

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

  const CollegesCheckbox = () => {
    return (
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={colleges["CAS"]}
              onChange={handleCollegesCheckboxChange}
              name="CAS"
            />
          }
          label="CAS"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={colleges["QST"]}
              onChange={handleCollegesCheckboxChange}
              name="QST"
            />
          }
          label="QST"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={colleges["COM"]}
              onChange={handleCollegesCheckboxChange}
              name="COM"
            />
          }
          label="COM"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={colleges["ENG"]}
              onChange={handleCollegesCheckboxChange}
              name="ENG"
            />
          }
          label="ENG"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={colleges["CFA"]}
              onChange={handleCollegesCheckboxChange}
              name="CFA"
            />
          }
          label="CFA"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={colleges["CGS"]}
              onChange={handleCollegesCheckboxChange}
              name="CGS"
            />
          }
          label="CGS"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={colleges["SHA"]}
              onChange={handleCollegesCheckboxChange}
              name="SHA"
            />
          }
          label="SHA"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={colleges["Pardee"]}
              onChange={handleCollegesCheckboxChange}
              name="Pardee"
            />
          }
          label="Pardee"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={colleges["Sargent"]}
              onChange={handleCollegesCheckboxChange}
              name="Sargent"
            />
          }
          label="Sargent"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={colleges["Wheelock"]}
              onChange={handleCollegesCheckboxChange}
              name="Wheelock"
            />
          }
          label="Wheelock"
        />
      </FormGroup>
    );
  };

  // Handles colleges checkbox changes in boolean value
  const handleCollegesCheckboxChange = (event) => {
    setColleges({ ...colleges, [event.target.name]: event.target.checked });
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_FLASK_SERVER + "admin/postings/" + id)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        if (data.postingInfo["essay"].length !== 0) {
          setAppInfo((prevState) => {
            var newObj = {};
            let essayObjects = data.postingInfo["essay"].map((question) => ({
              question: question,
              answer: "",
            }));
            newObj["essay"] = essayObjects;
            return Object.assign({}, prevState, newObj);
          });
        }
        setListingsInfo(data.postingInfo);
        return;
      })
      .catch((err) => {
        setErrorMessage(
          err.toString() + ", please contact the admin or PCT Recruitment Team."
        );
        setOpenError(true);
      });
  }, [id]);

  return (
    listingsInfo && (
      <Container>
        <ErrorPopup
          message={errorMessage}
          open={openError}
          closeOpen={setOpenError}
          setErrorMessage={setErrorMessage}
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
          <CollegesCheckbox />
          {emailForm()}
          {phoneForm()}
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
          <FieldText>Resume/CV*</FieldText>
          <FileUploadButton
            function={handleResumeUpload}
            textField={resumeName}
          />

          <FieldText>Please attach a picture of yourself*</FieldText>
          <FileUploadButton
            function={handleImageUpload}
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
