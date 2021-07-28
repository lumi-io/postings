import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";

import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

export const DashboardContainer = styled.div`
  width: 100%;
  padding: 81px 4vw 2px 4vw;
  flex-direction: row;
  height: 75vw;
`;

export const ApplicantDataGrid = styled.div`
  display: flex;
  flex-direction: row;
  height: 90%;
  margin-bottom: -100px;
`;

export const ApplicantDataBorder = styled.div`
  width: 100%;
  margin: 10px;
  overflow-y: scroll;
  white-space: normal;
`;

export const ApplicantScrollableBorder = styled.div`
  border: 1px solid #71706e;
  width: 50%;
  margin: 10px;
`;

export const Title = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 42px;
  color: #873ca2; /* Accent Purple */
`;

export const ApplicantHeaderBox = styled.div`
  margin: 1.5vw;
  flex-direction: row;
  display: flex;
`;

export const AvatarBorder = styled.div`
  margin-right: 1vw;
  align-self: center;
`;

// CSS for Name of Applicant
export const ApplicantTitle = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 42px;
  color: #873ca2;
`;

export const ApplicantSubtitle = styled.div`
  margin-top: 0.5vw;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  color: #61486a;
`;

export const NonExistingMessage = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 42px;
  line-height: 16px;
  color: #61486a;
  padding: 4vw 4vw 4vw 4vw;
  text-align: center;
`;

export const AvatarImage = withStyles({
  root: {
    height: "70px",
    width: "70px",
  },
})(Avatar);

export const BaseCard = withStyles({
  root: {
    "background-color": "#f8f6f9",
    height: "100%",
    overflow: "scroll",
  },
})(Card);

export const BaseCardContent = withStyles({
  root: {
    padding: "0 0 0 0",
  },
})(CardContent);
