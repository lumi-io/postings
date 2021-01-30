import React from "react";
import styled from "styled-components";

function MenuButton(props) {
    return (
        <MenuDashboard>
            <Dashboard>{props.name}</Dashboard>
        </MenuDashboard>
    );
};

const MenuDashboard = styled.div`
  background-color: rgba(254, 252, 255, 1);
  border-radius: 7px;
  padding: 10px 116px 10px 14px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  margin: 10px 0px 10px 0px;
  height:20px;
`;
const Dashboard = styled.p`
  font-family: "Roboto";
  font-size: 14px;
  font-weight: 700;
  color: rgba(97, 72, 106, 1);
`;

export default MenuButton;