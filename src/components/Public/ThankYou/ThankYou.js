import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";

const ThankYou = () => {
  return (
    <div>
      <Helmet>
        <style>{"body { background-color: #F9F6F9; height: 100%; }"}</style>
      </Helmet>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Title>Thank you for your application!</Title>
				<NoteTitle>You may now leave the page. If you have any questions/concerns, please reach out to PCT Zeta Chapter.</NoteTitle>
      </div>
    </div>
  );
};


const Title = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 42px;
  color: #873ca2; /* Accent Purple */
  padding-bottom: 20px;
	text-align: center;
`;

const NoteTitle = styled.div`
	text-align: center;
  font-family: Roboto;
  font-style: normal;
  font-size: 14px;
  line-height: 28px;
  color: #61486a;
  padding-top: 10px;
  padding-bottom: 10px;
`;

export default ThankYou;
