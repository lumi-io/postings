import React from "react";
import { Link } from "react-router-dom";
import MenuButton from "./components/MenuButton";
import { useAuth0 } from "@auth0/auth0-react";

import {
  Title,
  MenuSubtitle,
  NameText,
  Container,
  LogoutButton,
} from "./helpers/Style";


const Sidebar = (props) => {
  const { logout } = useAuth0();
  return (
    <Container>
      <Title>whyphi</Title>
      <NameText>Hey, {props.name}!</NameText>
      <br></br>
      <Link to="/admin/create-listing" style={{ textDecoration: "none" }}>
        <MenuButton name="Create New Listing" />
      </Link>
      <MenuSubtitle>Menu</MenuSubtitle>
      <Link to="/admin/listing" style={{ textDecoration: "none" }}>
        <MenuButton name="Dashboard" />
      </Link>
      <Link to="/admin/listing" style={{ textDecoration: "none" }}>
        <MenuButton name="Listings" />
      </Link>
      <Link to="/" style={{ textDecoration: "none" }}>
        <MenuButton name="Not ready..." />
      </Link>
      <Link to="/" style={{ textDecoration: "none" }}>
        <MenuButton name="Also not ready..." />
      </Link>
      <LogoutButton onClick={() => logout({ returnTo: window.location.origin })}>
        Sign out
      </LogoutButton>
    </Container>
  );
};

export default Sidebar;
