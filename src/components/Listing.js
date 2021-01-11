import React, { useState, useEffect } from 'react'; 
import {Link} from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(4),
  },
  card: {
    maxWidth: '35%',
    margin: 'auto',
  },
}));

export default function Listing() {

  const classes = useStyles();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPostings(posts);
  }, []);

  const getPostings = posts => {
    axios.get(`http://127.0.0.1:5000/admin/postings`)
      .then(res => {
        console.log(res.data);
        return res.data;
      })
      .then(data => {
        console.log(data.allPostings);
        return data.allPostings;
      })
      .then(posts => {
        setPosts(posts);
      })
      .catch(err => {
        console.log("API Error");
      }) 
  }

  return (
    <div className={classes.root}>
        {posts.map(post =>
          <div style={{paddingBottom: '1%', paddingTop: '1%'}}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {post.about}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Link to={`/Form?id=` + post._id}>
                  <Button size="small" color="primary" href={"/" + post._id}>
                    Apply now
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </div>
        )}
    </div>
  )
}