import React from 'react'; 
import { makeStyles } from '@material-ui/core/styles';
// import clsx from 'clsx';
// import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function ListingCard(jobObj) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {jobObj.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {jobObj.about}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Apply now
        </Button>
      </CardActions>
    </Card>
  );
}
