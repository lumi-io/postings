import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";

export default function BasicInformationCard(props) {
  const useStyles = makeStyles({});
  const classes = useStyles();

  return (
    <ContentCard className={classes.root} variant="outlined">
      <CardContent>
        <TextBorderBreak>
          <CustomTextBold>Major:&nbsp;</CustomTextBold>
          <CustomText>{props.major}</CustomText>
        </TextBorderBreak>
        <TextBorderBreak>
          <CustomTextBold>Minor:&nbsp;</CustomTextBold>
          <CustomText>{props.minor}</CustomText>
        </TextBorderBreak>
        <TextBorderBreakBottom>
          <CustomTextBold>GPA:&nbsp;</CustomTextBold>
          <CustomText>{props.gpa}</CustomText>
        </TextBorderBreakBottom>
      </CardContent>
    </ContentCard>
  );
}

const ContentCard = withStyles({
  root: {
    "background-color": "white",
    "margin-top": "1vw",
    "margin-bottom": "1vw",
    "margin-right": "1.5vw",
    "margin-left": "1.5vw",
    "padding-right": "0.5vw",
    "padding-left": "0.5vw",
  },
})(Card);

const CustomTextBold = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-size: 14px;
  font-weight: bold;
  color: #61486a;
  display: inline-block;
  flex-direction: column;
`;

const CustomText = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-size: 14px;
  color: #61486a;
  display: inline-block;
  flex-direction: column;
`;

const TextBorderBreak = styled.div`
  margin-bottom: 15px;
  word-break: break-word;
  overflow: wrap;
  white-space: normal;
`;

const TextBorderBreakBottom = styled.div`
  word-break: break-word;
  overflow: wrap;
  white-space: normal;
`;
