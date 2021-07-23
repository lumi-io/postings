import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";

import EssayCardPrompts from "./EssayCardPrompts";

export default function EssayCard(props) {
  const useStyles = makeStyles({});
  const classes = useStyles();
  const prompts = props.prompts;

  return (
    <ContentCard className={classes.root} variant="outlined">
      <CardContent>
        {prompts && (prompts.map((prompt) => (
          <EssayCardPrompts question={prompt["question"]} answer={prompt["answer"]} />
        )))}
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