import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

export const Title = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 42px;
  color: #873ca2; /* Accent Purple */
`;

export const MenuSubtitle = styled.div`
  /* H7 */
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  color: #a8a6a8; /* Dark Gray */
`;

export const NameText = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  color: #61486a;
  margin-top: 15px;
  margin-bottom: 5px;
`;

export const LogoutText = styled.div`
  position: absolute;
  bottom: 0;
  margin-bottom: 20px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  color: red;
`;

export const Container = styled.div`
  min-width: 225px;
  background-color: #e1dee1;
  height: 100%;
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 80px;
`;

export const LogoutButton = withStyles((theme) => ({
  root: {
    position: "absolute",
    bottom: "0",
    "marginBottom": "20px",
    color: "#61486A"
  },
}))(Button);
