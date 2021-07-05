import React from "react";
import styled from "styled-components";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const CollegeBarChart = (props) => {
  return (
    <BarChart width={730} height={250} data={props.data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
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

export default CollegeBarChart;
