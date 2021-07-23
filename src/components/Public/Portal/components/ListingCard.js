import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

export default function OutlinedCard(props) {

  return (
    <div>
        <CustomText onClick={() =>(window.location.href="/portal/" + props.id)} variant="h5" component="h2">
        {props.title}
        <p style={{fontSize:"13px", marginTop: "2px"}}>Boston</p>
        <Divider style={{marginTop: "10px"}}></Divider>
        </CustomText>
    </div>
  );
}

const CustomText = withStyles({
  root: {
      "font-family": "Arial",
      "background-color": "#F9F6F9",
      "color": "#9370DB",
      "margin-right": "10px",
      "margin-top": "2px",
      "&:hover": {
        "cursor": "pointer",
        "margin-right": "5px",
        "font-weight": "bold",
        "font-size": "25px",
      },
      "transition": "all .5s",
  }
})(Typography);