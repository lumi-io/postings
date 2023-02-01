import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Helmet } from "react-helmet";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";

import axios from "axios";

import ContactCard from "./ContactCard";
import EssayCard from "./EssayCard";
import BasicInformationCard from "./BasicInformationCard";
import CriticalCard from "./CriticalCard";
import SelectApplicationCard from "./SelectApplicationCard";

import {
  DashboardContainer,
  ApplicantDataGrid,
  ApplicantDataBorder,
  ApplicantScrollableBorder,
  Title,
  ApplicantHeaderBox,
  AvatarBorder,
  ApplicantTitle,
  ApplicantSubtitle,
  NonExistingMessage,
  AvatarImage,
  BaseCard,
  BaseCardContent,
} from "../helpers/Style";

import { parseAndConvertCollegesArr } from "../helpers/Functions";

const Dashboard = ({ user_id }) => {
  let { id } = useParams();

  const location = useLocation();
  const { jobTitle } = location.state;

  const [applicantData, setApplicantData] = useState([]);
  const [applicantDataExists, setApplicantDataExists] = useState(false);
  const [selectedApplicantIndex, setSelectedApplicantIndex] = useState(null);
  const [selectedApplicantData, setSelectedApplicantData] = useState({});
  const [saveData, setSaveData] = useState({});
  
  useEffect(() => {
    getApplicantData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const useStyles = makeStyles({
    tableRowSelected: {
      backgroundColor: "white",
      "&:hover": {
        backgroundColor: "#fefcff",
      },
      "&$selected, &$selected:hover": {
        backgroundColor: "#fefcff",
      },
    },
    tableCellSelected: {
      "&:hover": {
        color: "#873ca2",
        "font-weight": "bold",
      },
      "$selected &": {
        color: "#873ca2",
        "font-weight": "bold",
        "border-left": "5px solid #873ca2",
      },
    },
    // Removes default CSS in Material UI Table Component
    selected: {},
    hover: {},
  });
  const classes = useStyles();

  // Function that retrieves Applicant Data
  function getApplicantData() {
    axios.get(process.env.REACT_APP_FLASK_SERVER + `user/data/${user_id}/${id}`)  //retrieves user save data for favorites and seen
    .then((res) => setSaveData({ ...res.data?.user_posting_data }));
    
    axios
      .get(
        process.env.REACT_APP_FLASK_SERVER +
          "/admin/postings/" +
          id +
          "/applications"
      )
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        if (data["status"]) {
          return data["application"]["applications"];
        }
      })
      .then((applications) => {
        let modifiedData = applications.map((app) => ({
          applicantId: app["applicantId"],
          colleges: app["colleges"],
          email: app["email"],
          firstName: app["firstName"],
          lastName: app["lastName"],
          gradYear: app["gradYear"],
          major: app["major"],
          minor: app["minor"],
          phone: app["phone"],
          linkedin: app["linkedin"],
          resume: app["resume"],
          timeApplied: app["timeApplied"],
          prompts: app["essay"],
          image: app["image"],
          gpa: app["gpa"]
        }));
        setApplicantData(modifiedData);
        if (modifiedData.length !== 0) {
          setApplicantDataExists(true);
          console.log(modifiedData[0]);
          setSelectedApplicantData(modifiedData[0]);
          setSelectedApplicantIndex(0);
        } else {
          setApplicantDataExists(false);
        }
        return;
      })
      .catch((err) => {
        console.log("Error: please check ApplicantDashboard.");
      });
  }

  // Mapping of all the applicants with needed data to be rendered on table rows
  const applicantDataRows = applicantData.map((applicant, index) =>
    _createData(
      applicant["firstName"] + " " + applicant["lastName"],
      "testUrl",
      index
    )
  );

  // Helper function to create data for rows in table
  function _createData(name, image, index) {
    return { name, image, index };
  }

  // Helper function to set applicant properties to be rendered
  function _setCurrentApplicantProperties(idx) {
    setSelectedApplicantData(applicantData[idx]);
    setSelectedApplicantIndex(idx);
  }

  //This function will handle starring and unstarring applications
  function handleStar(application_id, starred) {
    let newSaveData = {...saveData};

    if(starred)
      newSaveData[application_id]= "starred";
    
    else
        delete newSaveData[application_id];

    axios
      .post(process.env.REACT_APP_FLASK_SERVER + `/user/data/${user_id}/${id}`, newSaveData);
    
    setSaveData(newSaveData);
  } 

  return (
    <DashboardContainer>
      <Helmet>
        <style>{"body { background-color: #FEFCFF; }"}</style>
      </Helmet>
      <Title>Applicants for {jobTitle}</Title>
      <br></br>
      <ApplicantDataGrid>
        <ApplicantScrollableBorder>
          <TableContainer style={{ maxHeight: "100%" }}>
            <Table
              stickyHeader
              className={classes.table}
              aria-label="Table for List of Applicants"
            >
              <TableBody>
                {applicantDataRows.map((row) => (
                  <TableRow
                    hover
                    key={row.name}
                    selected={selectedApplicantIndex === row.index}
                    classes={{
                      hover: classes.hover,
                      selected: classes.selected,
                    }}
                    className={classes.tableRowSelected}
                  >
                    <TableCell
                      className={classes.tableCellSelected}
                      component="th"
                      scope="row"
                      onClick={() => _setCurrentApplicantProperties(row.index)}
                    >
                      <SelectApplicationCard ApplicantName={row.name} applicantId={applicantData[row.index].applicantId} checked={applicantData[row.index].applicantId in saveData} handleChange={handleStar} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </ApplicantScrollableBorder>

        <ApplicantDataBorder>
          {applicantDataExists ? (
            <BaseCard variant="outlined">
              <BaseCardContent>
                <ApplicantHeaderBox>
                  <AvatarBorder>
                    <AvatarImage
                      alt={
                        selectedApplicantData["firstName"] +
                        " " +
                        selectedApplicantData["lastName"]
                      }
                      src={selectedApplicantData["image"]}
                      onClick={() =>
                        window.open(selectedApplicantData["image"])
                      }
                    />
                  </AvatarBorder>
                  <div>
                    <ApplicantTitle>
                      {selectedApplicantData["firstName"] +
                        " " +
                        selectedApplicantData["lastName"]}
                    </ApplicantTitle>
                    <ApplicantSubtitle>
                      {selectedApplicantData["colleges"] &&
                        parseAndConvertCollegesArr(
                          selectedApplicantData["colleges"]
                        ) +
                          ", Class of " +
                          selectedApplicantData["gradYear"]}
                    </ApplicantSubtitle>
                  </div>
                </ApplicantHeaderBox>
                <hr></hr>
                <CriticalCard timeApplied={selectedApplicantData["timeApplied"]} />
                <ContactCard
                  mail={selectedApplicantData["email"]}
                  phone={selectedApplicantData["phone"]}
                  linkedinUrl={selectedApplicantData["linkedin"]}
                  resumeUrl={selectedApplicantData["resume"]}
                />
                <BasicInformationCard
                  major={selectedApplicantData["major"]}
                  minor={selectedApplicantData["minor"]}
                  gpa={selectedApplicantData["gpa"]}
                />
                <EssayCard prompts={selectedApplicantData["prompts"]} />
              </BaseCardContent>
            </BaseCard>
          ) : (
            <NonExistingMessage>No Applicants :(</NonExistingMessage>
          )}
        </ApplicantDataBorder>
      </ApplicantDataGrid>
    </DashboardContainer>
  );
};

export default Dashboard;
