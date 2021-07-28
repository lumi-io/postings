import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

import {
  Title,
  MenuSubtitle,
  NameText,
  LogoutButton,
} from "../Sidebar/helpers/Style";

import MenuButton from "./components/MenuButton";

const sidebarWidth = 305;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: sidebarWidth,
      flexShrink: 0,
    },
  },
  menuButton: {
    marginTop: "10px",
    marginLeft: "5px",
    position: "fixed",
  },

  drawerPaper: {
    width: sidebarWidth,
    background: "#e1dee1",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function MaterialUiSidebar(props) {
  const { logout } = useAuth0();
  const { windowBar } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <SidebarContainer>
        <List>
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
          <LogoutButton
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            Sign out
          </LogoutButton>
        </List>
      </SidebarContainer>
    </div>
  );

  const container =
    windowBar !== undefined ? () => windowBar().document.body : undefined;

  return (
    <div>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        className={classes.menuButton}
      >
        <MenuIcon />
      </IconButton>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

const SidebarContainer = styled.div`
  ${"" /* min-width: 225px; */}
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 80px;
  padding-bottom: 80px;
  ${"" /* height: 100%; */}
`;

export default MaterialUiSidebar;
