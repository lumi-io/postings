import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";

import styled from "styled-components";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import axios from "axios";
// import { containerSizesSelector } from "@material-ui/data-grid";

import ContactCard from "./ApplicantDashboardComponents/ContactCard";

const ApplicantDashboard = () => {
  // const classes = useStyles();

  let { id } = useParams();

  const location = useLocation();
  const { jobTitle } = location.state;

  const [applicantData, setApplicantData] = useState([]);
  const [applicantDataExists, setApplicantDataExists] = useState(false);
  const [selectedApplicantIndex, setSelectedApplicantIndex] = useState(null);
  const [selectedApplicantData, setSelectedApplicantData] = useState({});

  useEffect(() => {
    getApplicantData();
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
        } else {
          console.log("err");
        }
      })
      .then((applications) => {
        console.log(applications);
        let modifiedData = applications.map((app) => ({
          applicantId: app["applicantId"],
          college: app["college"],
          email: app["email"],
          firstName: app["firstName"],
          lastName: app["lastName"],
          gradYear: app["gradYear"],
          major: app["major"],
          phone: app["phone"],
          linkedin: app["linkedin"],
          resume: app["resume"],
          timeApplied: app["timeApplied"]

        }));
        console.log(modifiedData);
        setApplicantData(modifiedData);
        if (modifiedData.length !== 0) {
          setApplicantDataExists(true);
          setSelectedApplicantData(modifiedData[0]);
          setSelectedApplicantIndex(0);
        }
        return;
      })
      .catch((err) => {
        console.log(err);
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

  return (
    <Container>
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
                      {/* <Avatar
                        alt="Cindy Baker"
                        src="/static/images/avatar/3.jpg"
                        style={{width: 35, height: 35, display: 'inline-block', "vertical-align": 'top'  }}
                      /> */}
                      <span>{row.name}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </ApplicantScrollableBorder>

        <ApplicantDataBorder>
          <BaseCard variant="outlined">
            <BaseCardContent>
              <ApplicantTitle>
                {selectedApplicantData["firstName"] +
                  " " +
                  selectedApplicantData["lastName"]}
              </ApplicantTitle>
              <hr></hr>
              <ContactCard 
                mail={selectedApplicantData["email"]}
                phone={selectedApplicantData["phone"]}
                linkedinUrl={selectedApplicantData["linkedin"]}
                resumeUrl={selectedApplicantData["resume"]}
              />
              <ContentCard className={classes.root} variant="outlined">
                <CardContent>
                  <Typography variant="h5" component="h2">
                    test
                  </Typography>
                </CardContent>
              </ContentCard>
            </BaseCardContent>
          </BaseCard>
        </ApplicantDataBorder>
      </ApplicantDataGrid>
    </Container>
  );
};

// Styled Component CSS
const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 81px 4vw 2px 4vw;
  flex-direction: container;
`;

const ApplicantDataGrid = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  margin-bottom: 100px;
`;

const ApplicantDataBorder = styled.div`
  width: 100%;
  margin: 10px;
  overflow-y: scroll;
  white-space: nowrap;
`;

const ApplicantScrollableBorder = styled.div`
  border: 1px solid #71706e;
  width: 50%;
  margin: 10px;
`;

const Title = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 42px;
  color: #873ca2; /* Accent Purple */
`;

// CSS for Name of Applicant
const ApplicantTitle = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 42px;
  margin: 1.5vw;
  color: #873ca2;
`;

const BaseCard = withStyles({
  root: {
    "background-color": "#f8f6f9",
    height: "100%",
  },
})(Card);

const BaseCardContent = withStyles({
  root: {
    padding: "0 0 0 0",
  },
})(CardContent);

const ContentCard = withStyles({
  root: {
    "background-color": "white",
    "margin-top": "1vw",
    "margin-bottom": "1vw",
    "margin-right": "2vw",
    "margin-left": "2vw",
  },
})(Card);

export default ApplicantDashboard;
