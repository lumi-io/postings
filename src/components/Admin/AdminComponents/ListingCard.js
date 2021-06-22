import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import AlertDialog from './AlertDialog';

import styled from 'styled-components';

export default function ListingCard(props) {

  const [isOpen, setIsOpen] = React.useState(false);
  const handleDialogOpen = () => {
    setIsOpen(true)
  }
  const handleDialogClose = () => {
    setIsOpen(false)
    deleteListing()
  }
  const deleteListing = () => {
    if (window.confirm('Are you sure you wish to delete this item?')){
      // Calls Delete API call to delete posting based on button click
      axios.delete(process.env.REACT_APP_FLASK_SERVER + "admin/postings/" + props.id)
      // Force reloads page in order to re-render the listings
      window.location.reload();
    }
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
          <Link to={{
            pathname: "/admin/listing/" + props.id + "/applicant",
            state: {
              jobTitle: props.name
            }
          }} style={{ textDecoration: 'none' }}>
          <Button>
            View Applicants
          </Button>
          </Link>
          <Button onClick={handleDialogOpen}>
            Delete
         </Button>
         <AlertDialog 
          isOpen={isOpen}
          handleClose={handleDialogClose}
          title='Delete this listing?'
          >
            <h1> hello </h1>
          </AlertDialog>
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