import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Container} from '@material-ui/core'
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles({
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function OutlinedCard(props) {
  const classes = useStyles();

  return (
    <div>
        <CustomText onClick={() =>(window.location.href="/portal/" + props.id)} variant="h5" component="h2">
        {props.title}
        <p style={{fontSize:"13px"}}>Boston</p>
        <Divider style={{marginTop: "20px"}}></Divider>
        </CustomText>
    </div>
  );
}

const CustomText = withStyles({
  root: {
      "font-family": "Roboto",
      "background-color": "#F9F6F9",
      "color": "#9370DB",
      "margin-right": "5px",
      "margin-top": "2px",
      "&:hover": {
        "cursor": "pointer",
        "margin-right": "5px",
        "font-weight": "bold",
        "font-size": "30px",
      },
      "transition": "all .5s",
  }
})(Typography);