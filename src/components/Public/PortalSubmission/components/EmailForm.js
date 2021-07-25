import React from "react";
import {
    TextFieldStyled,
    FieldText,
    CustomTextField,
  } from "../helpers/Style";

export default function EmailForm(props) {
  return (
    <TextFieldStyled>
      <FieldText>Email address*</FieldText>
      <CustomTextField
        required
        variant="outlined"
        fullWidth
        name="email"
        type="email"
        error={props.appInfo["email"] === "" || !props.validEmail}
        helperText={
          props.appInfo["email"] === "" || !props.validEmail
            ? "This field is empty or email is not valid."
            : ""
        }
        onChange={(e) => {
          props.setAppInfo((prevState) => {
            props.validateEmail(e);
            const val = e.target.value;
            var newObj = {};
            newObj["email"] = val;
            return Object.assign({}, prevState, newObj);
          });
        }}
      />
    </TextFieldStyled>
  );
}
