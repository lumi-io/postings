import React, { useState, useEffect, useCallback } from "react";
import { useParams, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Helmet } from "react-helmet";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';

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
  const [displayRowData, setDispalyRowData] = useState([]); //This will be used for sorting and displaying appicant data
  const [applicantDataExists, setApplicantDataExists] = useState(false);
  const [selectedApplicantIndex, setSelectedApplicantIndex] = useState(null);
  const [selectedApplicantData, setSelectedApplicantData] = useState({});
  const [saveData, setSaveData] = useState({});
  const [seenData, setSeenData] = useState({});
  const [fetchedSeen, setFetchedSeen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [starLabel, setStarLabel] = useState("");
  const [seenLabel, setSeenLabel] = useState("");
  
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
    tableRowSeen: {
      backgroundColor: "#EFEBF5",
      "&:hover": {
        backgroundColor: "#EFEBF5",
      },
      "&$selected, &$selected:hover": {
        backgroundColor: "#EFEBF5",
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

    axios.get(process.env.REACT_APP_FLASK_SERVER + `user/data/all/${user_id}/${id}`)  //retrieves user star data for favorites and seen
    .then((res) => {setFetchedSeen(true); setSeenData(prevState => ({ ...prevState, ...res.data?.user_posting_data?.seen })); setSaveData(prevState => ({ ...prevState, ...res.data?.user_posting_data?.star }))});
    
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
        setDispalyRowData(modifiedData.map((applicant, index) =>
          _createData(
            applicant["firstName"] + " " + applicant["lastName"],
            "testUrl",
            index
          )));
        if (modifiedData.length !== 0) {
          setApplicantDataExists(true);
          console.log(modifiedData[0]);
          setSelectedApplicantData(modifiedData[0]);
          setSelectedApplicantIndex(0);
          handleSeen(modifiedData[0].applicantId);
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
      .post(process.env.REACT_APP_FLASK_SERVER + `/user/data/star/${user_id}/${id}`, newSaveData);
    
    setSaveData(newSaveData);
  } 

  //This function will sort the rows by whether they are starred or not
  function handleLabelSort(label, labelState, setLabelState, labelData) {

    if (selectedLabel === label && labelState === "asc") {
      setSelectedLabel("");
      setLabelState("desc");
      setDispalyRowData(applicantDataRows);
      return;
    }

    const trueArr = [];
    const falseArr = [];
    applicantDataRows.map((row) => applicantData[row.index].applicantId in labelData ? trueArr.push(row) : falseArr.push(row));
    const combinedArr = trueArr.concat(falseArr);

    if (selectedLabel !== label) {
      setLabelState("desc");
      setSelectedLabel(label);
      setDispalyRowData(combinedArr);
    }

    else if (labelState === "desc") {
      setLabelState("asc");
      setDispalyRowData(combinedArr.reverse());
    }

  }

  function handleSeen(application_id) {
    setSeenData(prevState => ({ ...prevState, [application_id]: "seen" }))

    if (!fetchedSeen || application_id in seenData)
      return;

    axios
      .post(process.env.REACT_APP_FLASK_SERVER + `/user/data/seen/${user_id}/${id}`, { ...seenData, [application_id]: "seen" });
  };

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

              <TableHead>
                <TableRow>
                  <TableCell padding="small" >Name</TableCell>
                  <TableCell padding="small" align="center" >
                    <TableSortLabel
                      active={selectedLabel === "seen"}
                      direction={seenLabel}
                      onClick={() => handleLabelSort("seen", seenLabel, setSeenLabel, seenData)}
                    >
                      Seen
                    </TableSortLabel>
                  </TableCell>
                  <TableCell padding="small" align="center" >
                    <TableSortLabel
                      active={selectedLabel === "star"}
                      direction={starLabel}
                      onClick={() => handleLabelSort("star", starLabel, setStarLabel, saveData)}
                    >
                      Starred
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {displayRowData.map((row) => (
                  <TableRow
                    hover
                    key={row.name}
                    selected={selectedApplicantIndex === row.index}
                    classes={{
                      hover: classes.hover,
                      selected: classes.selected,
                    }}
                    className={(applicantData[row.index].applicantId in seenData) ? classes.tableRowSeen : classes.tableRowSelected}
                  >
                    <TableCell
                      className={classes.tableCellSelected}
                      component="th"
                      scope="row"
                      colSpan={2}
                      onClick={() => {handleSeen(applicantData[row.index].applicantId); _setCurrentApplicantProperties(row.index)}}
                    >
                      <span>{row.name}</span>
                    </TableCell>
                    <TableCell 
                      padding="checkbox"  
                      align="center"
                    >
                      <SelectApplicationCard applicantId={applicantData[row.index].applicantId} checked={applicantData[row.index].applicantId in saveData} handleChange={handleStar} />
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
