import React from "react";
import { TextFieldStyled, FieldText, CustomTextField } from "../helpers/Style";

export default function PhoneForm(props) {
  return (
    <TextFieldStyled>
      <FieldText>Phone number*</FieldText>
      <CustomTextField
        required
        variant="outlined"
        fullWidth
        name="phone"
        type="tel"
        onChange={(e) => {
          props.setAppInfo((prevState) => {
            const val = e.target.value;
            var newObj = {};
            newObj["phone"] = val;
            return Object.assign({}, prevState, newObj);
          });
        }}
      />
    </TextFieldStyled>
  );
}
