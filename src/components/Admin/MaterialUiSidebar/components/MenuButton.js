import React from "react";
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: 'rgba(254, 252, 255, 1)',
    borderRadius: '7px',
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.15)',
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0px 10px 0px',
    height: '40px',
    width: '225px',
  },
  text: {
    fontFamily: "Roboto",
    fontSize: '14px',
    fontWeight: 700,
    color: 'rgba(97, 72, 106, 1)',
    textTransform: 'none',
    textDecoration: 'none'
  }
}));

function MenuButton(props) {
  const classes = useStyles();
  return (
    <Button className={classes.button}>
        <div className={classes.text}>{props.name}</div>
    </Button>  
  );
};

// const Button = styled.button`
//   background-color: rgba(254, 252, 255, 1);
//   border-radius: 7px;
//   padding: 10px 116px 10px 14px;
//   box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.15);
//   display: flex;
//   align-items: center;
//   margin: 10px 0px 10px 0px;
//   height:20px;
// `;

// const Dashboard = styled.p`
//   font-family: "Roboto";
//   font-size: 14px;
//   font-weight: 700;
//   color: rgba(97, 72, 106, 1);
// `;

export default MenuButton;