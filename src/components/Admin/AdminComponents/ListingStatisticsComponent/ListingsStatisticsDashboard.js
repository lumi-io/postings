import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { parseCollegeData } from "./functions/helperFunctions";
import CollegeBarChart from "./GraphComponents/CollegeBarChart";

const ListingsStatisticsDashboard = () => {
  const [collegeData, setCollegeData] = useState([]);
  const [gradYearData, setGradYearData] = useState({});
  const [majorData, setMajorData] = useState({});

  function getAndParseApplicantData() {
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
          college: app["college"],
          gradYear: app["gradYear"],
          major: app["major"],
        }));
        return modifiedData;
      })
      .then((applications) => {
        setCollegeData(parseCollegeData(applications));
        setGradYearData(gradYearData);
        setMajorData(majorData);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getAndParseApplicantData();
  }, []);

  let { id } = useParams();

  return (
    <Container>
      <ChartContainer>
        <ChartTitle>BU College Statistics</ChartTitle>
        <ChartSpacing>
          <CollegeBarChart data={collegeData} />
        </ChartSpacing>
      </ChartContainer>
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

const ChartTitle = styled.div`
  font-family: Roboto;
  font-style: normal;
  ${"" /* font-weight: bold; */}
  font-size: 36px;
  line-height: 42px;
  color: #873ca2; /* Accent Purple */
`;

const ChartContainer = styled.div`
  margin-top: 1vw;
  margin-bottom: 1vw;
`;

const ChartSpacing = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

export default ListingsStatisticsDashboard;
