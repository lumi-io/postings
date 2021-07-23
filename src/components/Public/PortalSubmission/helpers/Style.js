import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: container;
  margin: 0 auto;
`;

export const SubmissionContainer = styled.div`
    padding-top: 80px;
    padding-bottom: 80px;
    padding-right: 20%;
    padding-left: 20%;
    background: background: #FEFCFF;
`;

export const Title = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 42px;
  color: #873ca2; /* Accent Purple */
  padding-bottom: 20px;
`;

export const TextFieldStyled = styled.div`
  padding-top: 10px;
  padding-bottom: 20px;
`;

export const FieldText = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  color: #61486a;
  padding-bottom: 10px;
`;

export const CustomTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#61486A",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#8A3DA6",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#BEBEBE",
      },
      "&:hover fieldset": {
        borderColor: "#8A3DA6",
        borderWidth: 1,
      },
      "&.Mui-focused fieldset": {
        borderColor: "#8A3DA6",
      },
    },
  },
})(TextField);