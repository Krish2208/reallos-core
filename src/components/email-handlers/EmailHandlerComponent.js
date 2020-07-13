import React from "react";
import {
  Box,
  Grid,
  Typography,
  FormControl,
  TextField,
  Card,
  Button
} from "@material-ui/core";
import "./EmailHandlerComponent.css";
import { useLocation } from "react-router-dom";

function RenderEmailHandler() {
  return (
    <div className="maingrid">
      <img src={require('../../assets/reallos-logo.svg')} className="logo"/>
      <Grid style={{ height: "97vh" }}>
        <Grid container direction="row" style={{ height: "100%" }}>
          <Grid container alignItems="center" md={6} style={{ height: "100%" }} justify="center">
            <Box ml={1} mt={-10}>
              <img
                src={require("../../assets/emailhandler.png")}
                className="right-image"
              />
            </Box>
          </Grid>
          <Grid
            container
            md={6}
            alignItems="center"
            justify="center"
            style={{ backgroundColor: "#150578" }}
          >
            <Card elevation={3} style={{ padding: "30px"}} className="right-card">
              <RenderRightColumn />
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

function RenderRightColumn(props) {
  let query = new URLSearchParams(useLocation().search);
  const mode = query.get("mode");

  if (mode === "verifyEmail") {
    return <Typography variant="h6" align="center" style={{color: "#150578"}}>Thank You, Your Email has been verified</Typography>;
  }
  if (mode === "resetPassword") {
    return (
      <div>
        <Typography variant="h6" style={{ width: "150%", marginBottom: "8px" }}>
          Reset Password
        </Typography>
        <FormControl>
          <TextField
            className="input-item"
            label="New Password"
            name="password"
            variant="outlined"
            type="password"
            style={{ marginBottom: "8px" }}
            className="form"
          />
          <TextField
            className="input-item"
            label="Confirm New Password"
            name="password"
            variant="outlined"
            type="password"
            style={{ marginBottom: "8px" }}
            className="form"
          />
          <Button
            className="input-item"
            color="primary"
            variant="contained"
            style={{ textTransform: "none", fontSize: "16px"}}
            className="form"
          >
            Confirm
          </Button>
        </FormControl>
      </div>
    );
  }
}
export default RenderEmailHandler;