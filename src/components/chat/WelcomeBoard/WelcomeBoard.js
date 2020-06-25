import React, { Component } from "react";
import "./WelcomeBoard.css";
import { Grid, Typography } from "@material-ui/core";
import { CommentDiscussionIcon } from "@primer/octicons-react";

export default class WelcomeBoard extends Component {
  render() {
    return (
      <Grid>
        <Grid container direction="row" justify="center" alignItems="center">
          <CommentDiscussionIcon size={200} className="welcomeDiv" />
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center">
          <Typography className="welcomeDiv" variant="h6">
            Start a new chat
          </Typography>
        </Grid>
      </Grid>
    );
  }
}
