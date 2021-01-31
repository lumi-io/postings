import React from "react";
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';

const Button = ({
  newListing = "New Listing"
}) => {
  return (
    <ButtonNewListing>
      <Group />
      <NewListingCSS>{newListing}</NewListingCSS>
    </ButtonNewListing>
  );
};

const ButtonNewListing = styled.div`
  background-color: rgba(249, 246, 249, 1);
  border-radius: 7px;
  padding: 10px 116px 10px 14px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  margin: 15px 0px 15px 0px;
  height:20px;
`;
const Group = styled.div`
  width: 10px;
  height: 10px;
  margin-right: 9px;
  background-image: url("https://static.overlay-tech.com/assets/862c2f62-003e-4ac2-8541-60db5154ded3.svg");
`;

const NewListingCSS = styled.p`
  width: 75px;
  font-family: "Roboto";
  font-size: 14px;
  font-weight: 700;
  color: rgba(97, 72, 106, 1);
  text-align: center;
`;

export default Button;

