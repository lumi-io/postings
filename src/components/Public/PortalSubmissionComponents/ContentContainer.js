import React from 'react';
import styled from "styled-components";

export default function ContentContainer(props) {

  return (
    <ContentContainerBorder>
          <Title>{props.title}</Title>
          <Subtitle>Phi Chi Theta</Subtitle>
          <Subtitle>About Us</Subtitle>
          <ContentText>{props.aboutUs}</ContentText>
          <Subtitle>Who are we looking for</Subtitle>
          <ContentText>{props.qualifications}</ContentText>
        </ContentContainerBorder>
  );
}

const ContentContainerBorder = styled.div`
  padding-top: 80px;
  padding-bottom: 80px;
  padding-right: 20%;
  padding-left: 20%;
  background: #f9f6f9;
`;

const Title = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 42px;
  color: #873ca2; /* Accent Purple */
  padding-bottom: 20px;
`;

const Subtitle = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  color: #61486a;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const ContentText = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  color: #61486a;
  padding-top: 5px;
  padding-bottom: 10px;
`;