import React, { Component } from "react";
import "./SignUpModal.css";
import { VerifiedIcon } from "@primer/octicons-react";
import { Grid, Typography } from "@material-ui/core";

export class FormStep3 extends Component {
  render() {
    return (
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <Grid container direction="row" justify="center">
            <VerifiedIcon size={100} className="verified-icon" />
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="row" justify="center">
            <Typography className="awaiting-heading">
              Awaiting Verification
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="row" justify="center">
            <Typography align="justify">
              We have sent a link in your mail address, please click the link so
              that we can verify your email address and activate your account.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default FormStep3;
