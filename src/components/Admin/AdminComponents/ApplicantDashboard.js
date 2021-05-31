import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
// import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import { FixedSizeList as List } from "react-window";
import { FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import "./ApplicantRow.css";

import axios from "axios";
import { containerSizesSelector } from "@material-ui/data-grid";

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

  function getApplicantData() {
    axios
      .get(process.env.REACT_APP_FLASK_SERVER + "/admin/postings/" + id + "/applications")
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
        setApplicantData(modifiedData);
        if (modifiedData.length !== 0) {
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

  const Row = ({ index, style }) => (
    <div
      className={index % 2 ? "ListItemOdd" : "ListItemEven"}
      style={style}
      onClick={(event) => _setCurrentApplicantProperties(event, index)}
      onMouseOver={_applicantOnHover}
      onMouseOut={_applicantOnHoverOut}
    >
      {applicantData[index]["firstName"] +
        " " +
        applicantData[index]["lastName"]}
    </div>
  );

  function _setCurrentApplicantProperties(event, idx) {
    console.log(applicantData[idx]);
    event.target.style.background = "red";
    setCurrentApplicantData(applicantData[idx]);
    setCurrentApplicantIndex(idx);
  }

  function _applicantOnHover(event) {
    event.target.style.background = "#E1DEE1";
  }

  function _applicantOnHoverOut(event) {
    event.target.style.background = "";
  }

  return (
    <Container>
      <Title>Applicants for {jobTitle}</Title>
      <br></br>
      <ApplicantDataGrid>
        <ApplicantScrollableField>
          {applicantDataExists ? (
            <List
              className="List"
              height={600}
              itemCount={applicantData.length}
              itemSize={75}
              width={500}
            >
              {Row}
            </List>
          ) : (
            "No Applicants"
          )}
        </ApplicantScrollableField>

        <ApplicantDataBorder>
        {applicantDataExists ? (
          <ApplicantDataField>
            <ApplicantDataTitle>
              {currentApplicantData["firstName"] +
                " " +
                currentApplicantData["lastName"]}
            </ApplicantDataTitle>
            <hr></hr>
            <ApplicantDataInfoText>
              Email: {currentApplicantData["email"] + "\n"}
              <br></br>
              Major: {currentApplicantData["major"]}
            </ApplicantDataInfoText>
          </ApplicantDataField>
        ) : (
          "Invalid"
        )}
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
  height: 80%;
`;

const ApplicantScrollableField = styled.div`
  height: 80%;
  margin: 10px;
`;
const ApplicantDataBorder = styled.div`
  border: 1px solid #61486a;
  width: 100%;
  margin: 10px;
  padding: 20px 30px 20px 30px;
`;

const ApplicantDataField = styled.div``;

const ApplicantDataTitle = styled.div`
  color: #873ca2;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
`;

const ApplicantDataInfoText = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  color: #61486a;
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
