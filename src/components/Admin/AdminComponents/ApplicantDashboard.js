import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import styled from "styled-components";
// import { FixedSizeList as List } from "react-window";
// import { FixedSizeGrid as Grid } from "react-window";
// import AutoSizer from "react-virtualized-auto-sizer";
// import "./ApplicantRow.css";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";

import axios from "axios";
// import { containerSizesSelector } from "@material-ui/data-grid";

const ApplicantDashboard = () => {
  // const classes = useStyles();

  let { id } = useParams();

  const location = useLocation();
  const { jobTitle } = location.state;

  const [applicantData, setApplicantData] = useState([]);
  const [applicantDataExists, setApplicantDataExists] = useState(false);
  const [currentApplicantIndex, setCurrentApplicantIndex] = useState();
  const [currentApplicantData, setCurrentApplicantData] = useState({});

  useEffect(() => {
    getApplicantData();
  }, []);

  const useStyles = makeStyles({
    table: {},
  });

  const classes = useStyles();

  const rows = [_createData("User 1", "imageurl")];

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
        let modifiedData = applications.map((app) => ({
          firstName: app["firstName"],
          lastName: app["lastName"],
          email: app["email"],
          gradYear: app["gradYear"],
          college: app["college"],
          major: app["major"],
          applicantId: app["applicantId"],
        }));
        console.log(modifiedData);
        setApplicantData(modifiedData);
        if (modifiedData.length !== 0) {
          console.log("hit");
          setApplicantDataExists(true);
          setCurrentApplicantData(modifiedData[0]);
          setCurrentApplicantIndex(0);
        }
        return;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const applicantDataRows = applicantData.map(
    (applicant, index) =>
      _createData(
        applicant["firstName"] + " " + applicant["lastName"],
        "testUrl",
        index
      )
    // console.log(applicant["firstName"])
  );

  function _createData(name, image, index) {
    return { name, image, index };
  }

  function _setCurrentApplicantProperties(idx) {
    console.log(applicantData[idx]);
    setCurrentApplicantData(applicantData[idx]);
    setCurrentApplicantIndex(idx);
  }

  // function _applicantOnHover(event) {
  //   event.target.style.background = "#E1DEE1";
  // }

  // function _applicantOnHoverOut(event) {
  //   event.target.style.background = "";
  // }

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
                  <TableRow key={row.name}>
                    <TableCell
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
          {currentApplicantData["firstName"] +
            " " +
            currentApplicantData["lastName"]}
          <br></br>
          {currentApplicantData["email"]}
          <br></br>
          {currentApplicantData["gradYear"]}
        </ApplicantDataBorder>
      </ApplicantDataGrid>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 81px 91px 2px 91px;
  flex-direction: container;
`;

const ApplicantDataGrid = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  margin-bottom: 100px;
`;

const ApplicantDataBorder = styled.div`
  border: 1px solid #61486a;
  width: 100%;
  margin: 10px;
  padding: 20px 30px 20px 30px;
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

export default ApplicantDashboard;
