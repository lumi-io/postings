import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

export default function ListingCard(props) {

  const deleteListing = () => {
    // Calls Delete API call to delete posting based on button click
    axios.delete("http://127.0.0.1:5000/admin/postings/" + props.id)
    // Force reloads page in order to re-render the listings
    window.location.reload();
    return;
  };

  return (
    <CardBorder>
      <Card>
        <CustomCardActionArea >
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Viewed: {props.viewCount}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Applied: {props.applyCount}
            </Typography>
          </CardContent>
        </CustomCardActionArea>
        <CustomCardActions>
          <Link to={"/admin/listing/" + props.id} style={{ textDecoration: 'none' }}>
            <Button>
                Edit
            </Button>
          </Link>
          <Link to={"/admin/listing/" + props.id + "/applicant"} style={{ textDecoration: 'none' }}>
          <Button>
            View Applicants
          </Button>
          </Link>
          <Button onClick={deleteListing}>
            Delete
         </Button>
        </CustomCardActions>
      </Card>
    </CardBorder>
  );
}

const CustomCardActionArea = withStyles({
  root: {
    "background-color": "#F9F6F9"
  }
})(CardActionArea);

const CustomCardActions = withStyles({
  root: {
    "background-color": "#F9F6F9",
    "border-top": "1px solid #A8A6A8"
  }
})(CardActions);


const CardBorder = styled.div`
  min-width: 500px;
  max-width: 600px;
  margin-right: 15px;
  margin-bottom: 30px;
`;