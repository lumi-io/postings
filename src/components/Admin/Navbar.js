import React from 'react'
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
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
            <AppBar position="fixed" color="purple">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Hi, {props.name}
                    </Typography>
                    <Button 
                        color="inherit"
                        onClick={() => logout({ returnTo: window.location.origin })}
                    >
                    Logout
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

const Name = styled.div`
  background: #FEFCFF;
  top:0;
  left:0;
  bottom:0;
  right:0;
  display:flex;
  height:100%;
  width:100%;
  position: absolute;
`;

export default Navbar;