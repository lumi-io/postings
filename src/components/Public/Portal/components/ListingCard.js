import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardIcon from "../CardIcon.png"



export default function OutlinedCard(props) {

  // return (
  //   <div>
  //       <CustomText onClick={() =>(window.location.href="/portal/" + props.id)} variant="h5" component="h2">
  //       {props.title}
  //       <p style={{fontSize:"13px", marginTop: "2px"}}>Boston</p>
  //       <Divider style={{marginTop: "10px"}}></Divider>
  //       </CustomText>
  //   </div>
  // );
  return (
    <div>
      <Card sx={{minWidth: 275, borderRadius:5, "textAlign": "center"}}>
        <CardContent>
        <img src={CardIcon} 
             style={{
               display:"block",
               marginLeft:"auto",
               marginRight:"auto",
               paddingBottom:"10%",
               width:"20%", 
               height:"20%"
               }}
        />
          <Title sx={{ fontSize: 20 }}>{props.title}</Title>
          <Typography sx={{ fontSize: 15 }}>Deadline: {props.deadline}</Typography>
          <div style={{"color": "purple","fontSize": "20px",}}>
            <ButtonText onClick={() =>(window.location.href="/portal/" + props.id)}>
              APPLY
            </ButtonText>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const ButtonText = withStyles({
  root: {
      "font-family": "Arial",
      "background-color": "#F9F6F9",
      "color": "#9370DB",
      "margin-right": "15px",
      "margin-top": "2px",
      "font-weight": "bold",
      "&:hover": {
        "cursor": "pointer",
        "margin-right": "5px",
      },
      "transition": "all .5s",
      paddingBottom:"5%", 
  }
})(Typography);

const Title = withStyles({
  root: {
      "font-family": "Roboto",
      "color": "#6A479D",
      "margin-right": "10px",
      "margin-top": "2px",
      "font-weight": "bold",
      paddingBottom:"5%", 
  }
})(Typography);

// const Button = withStyles({
//   root: {
//     "color": "purple",
//     "fontSize": "20px",
//   }
// })(button);
  