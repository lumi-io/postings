import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import { FixedSizeList as List } from "react-window";
import "./ApplicantRow.css";

import axios from "axios";

const ApplicantDashboard = () => {
  // const classes = useStyles();

  let { id } = useParams();

  const location = useLocation();
  const { jobTitle } = location.state;

  const [applicantData, setApplicantData] = useState([]);

  useEffect(() => {
    getApplicantData();
  }, []);

  function getApplicantData() {
    axios
      .get("http://127.0.0.1:5000/admin/postings/" + id + "/applications")
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
        return;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const Row = ({ index, style }) => (
    <div className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} style={style} onClick={() => (console.log(applicantData[index]))}>
      {applicantData[index]["firstName"] + " " + applicantData[index]["lastName"]}
    </div>
  );

  return (
    <Container>
      <Title>Applicants for {jobTitle}</Title>
      <br></br>
      <List className="List" height={500} itemCount={applicantData.length} itemSize={75} width={400}>
        {Row}
      </List>
    </Container>
  );
};


const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 81px 91px 2px 91px;
  flex-direction: container;
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
