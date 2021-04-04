import React from 'react'
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import { useAuth0 } from "@auth0/auth0-react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = (props) => {
  const { logout } = useAuth0();
  const classes = useStyles();
  return (
    <div>
      <CustomNavbar>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Title>Hi, {props.name}</Title>
          </Typography>
          <Button
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            Logout
          </Button>
        </Toolbar>
      </CustomNavbar>
    </div>
  )
}

const Title = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 42px;
  color: #873CA2;  /* Accent Purple */
`;

const CustomNavbar = withStyles({
  root: {
    "background-color": "#E1DEE1",
    "border-bottom": "20px"
  }
})(AppBar);

export default Navbar;