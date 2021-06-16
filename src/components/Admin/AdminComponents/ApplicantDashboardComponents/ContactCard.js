import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
// const feather = require('feather-icons')

import { Mail, Phone, Linkedin, FileText } from "react-feather";

import styled from "styled-components";

export default function ContactCard(props) {
  const useStyles = makeStyles({});
  const classes = useStyles();

  return (
    <ContentCard className={classes.root} variant="outlined">
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs>
            <IconInline>
              <Mail color="#61486a" style={{ flexDirection: "row" }} />
              <ContactText>{props.mail}</ContactText>
            </IconInline>
          </Grid>
          <Grid item xs>
            <IconInline>
              <Phone color="#61486a" style={{ flexDirection: "row" }} />
              <ContactText>{props.phone}</ContactText>
            </IconInline>
          </Grid>
        </Grid>
        <hr></hr>
        <IconInline>
          <LinkText>Links</LinkText>
          <Linkedin color="#61486a" style={{ flexDirection: "row" }} />
          <FileText color="#61486a" style={{ flexDirection: "row" }} />
        </IconInline>
      </CardContent>
    </ContentCard>
  );
}

const ContentCard = withStyles({
  root: {
    "background-color": "white",
    "margin-top": "1vw",
    "margin-bottom": "1vw",
    "margin-right": "1.5vw",
    "margin-left": "1.5vw",
    "padding-right": "0.5vw",
    "padding-left": "0.5vw",
  },
})(Card);

const IconInline = styled.div`
  flex-direction: row;
  display: flex;
  align-items: center;
  margin-top: 0.8vw;
  margin-bottom: 0.5vw;
`;

// CSS for Email and Phone No Text
const ContactText = styled.div`
  margin-left: 0.7vw;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  color: #61486a;
`;

// CSS for Links Text

const LinkText = styled.div`
  margin-right: 0.7vw;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  color: #61486a;
`;
