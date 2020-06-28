import React, { Component } from "react";
import "./WelcomeBoard.css";
import { Grid, Typography, Box } from "@material-ui/core";

export default class WelcomeBoard extends Component {
  render() {
    return (
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <Box paddingTop={13}>
            <img
              src={require("../../../assets/chat-empty.png")}
              className="chat-empty-image"
            />
          </Box>
        </Grid>
        <Grid item>
          <Box paddingTop={2}>
            <Typography className="chat-heading">
              Reallos Discussions
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Box paddingTop={1}>
            <Typography className="chat-subheading">
              Start a conversation with anyone
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Box paddingTop={-3}>
            <Typography className="chat-subheading">
              involved in your transaction
            </Typography>
          </Box>
        </Grid>
      </Grid>
    );
  }
}
