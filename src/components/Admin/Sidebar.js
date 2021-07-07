import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MenuButton from './SidebarComponents/MenuButton'
import Button from '@material-ui/core/Button';
import { useAuth0 } from "@auth0/auth0-react";
import { GridLeftEmptyCell } from '@material-ui/data-grid';
import Login from '../Public/Login';


const Sidebar = () => {
  const { logout } = useAuth0();
  return (
    <StickyBox>
      <Title>
        lumi
      </Title>
      <br></br>
      <Link to="/admin/create-listing" style={{ textDecoration: 'none' }}>
        &nbsp;
        <MenuButton name="+ New Listing" />
      </Link>
      &nbsp;

      <MenuSubtitle>
        <font>Menu</font> 
      </MenuSubtitle>
      <Link to="/admin" style={{ textDecoration: 'none' }}>
        <MenuButton name="Dashboard" />
      </Link>
      <Link to="/admin/listing" style={{ textDecoration: 'none' }}>
        <MenuButton name="Listings" />
      </Link>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <MenuButton name="Applications" />
      </Link>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <MenuButton name="Interviews" />
      </Link>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <MenuButton name="Offers" />
      </Link>

      &nbsp;
      <Button
            onClick={() => logout({ returnTo: Login})}
          >
            Logout
          </Button>
    </StickyBox>  

  )
}

const Title = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 42px;
  color: #873CA2;  /* Accent Purple */
`;

const MenuSubtitle = styled.div`
  /* H7 */
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  color: #A8A6A8;  /* Dark Gray */
`;

const StickyBox = styled.div`
  min-width: 225px;
  background-color: #E1DEE1;
  height: 100%;
  padding-left:40px;
  padding-right:40px;
  padding-top: 100px;
`;


export default Sidebar;