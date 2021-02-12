import React from 'react'
import { BrowserRouter as Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from './SidebarComponents/Button'
import MenuButton from './SidebarComponents/MenuButton'

const Sidebar = () => {
  return (
    <Container>
      <Title>
        lumi
          </Title>
      <Button onClick='test()' />
      <MenuSubtitle>
        Menu
      </MenuSubtitle>
      <Link to="/admin">
        <MenuButton name="Dashboard" />
      </Link>
      <Link to="/admin/listing">
        <MenuButton name="Listings" />
      </Link>
      <Link to="/">
        <MenuButton name="Applications" />
      </Link>
      <Link to="/">
        <MenuButton name="Interviews" />
      </Link>
    </Container>
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

const Container = styled.div`
  min-width: 225px;
  background-color: #E1DEE1;
  height: 100%;
  padding-left:40px;
  padding-right:40px;
  padding-top: 100px;
`;

export default Sidebar;