import React, { Component } from "react";
import "./SignUpModal.css";
import { ChevronRightIcon, ChevronLeftIcon } from "@primer/octicons-react";
import {
  FormGroup,
  InputLabel,
  TextField,
  Button,
  Select,
  FormControl,
  Grid,
} from "@material-ui/core";

export class FormStep2 extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.addStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.subStep();
  };

  render() {
    const { errors, handleChange, values } = this.props;
    return (
      <FormGroup>
        <FormControl variant="outlined" className="input-item">
          <InputLabel id="role">Role</InputLabel>
          <Select labelId="role" id="role_select" label="Role"></Select>
        </FormControl>
        <FormControl variant="outlined" className="input-item">
          <InputLabel id="state">State</InputLabel>
          <Select labelId="sate" id="state_select" label="State"></Select>
        </FormControl>
        <TextField
          className="input-item"
          label="Create Password"
          variant="outlined"
          type="Password"
          name="password"
          onChange={handleChange}
          onBlur={handleChange}
          defaultValue={values.password}
          helperText={errors.password}
          error={errors.password !== ""}
        />
        <TextField
          className="input-item"
          label="Confirm Password"
          variant="outlined"
          type="Password"
          name="confirm"
          onChange={handleChange}
          onBlur={handleChange}
          defaultValue={values.confirm}
          helperText={errors.confirm}
          error={errors.confirm !== ""}
        />
        <Grid
          container
          direction="row-reverse"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Button
              variant="contained"
              className="small-next-button"
              onClick={this.continue}
            >
              Next &nbsp;
              <ChevronRightIcon />
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              className="small-back-button"
              onClick={this.back}
            >
              <ChevronLeftIcon /> &nbsp; Back
            </Button>
          </Grid>
        </Grid>
      </FormGroup>
    );
  }
}

export default FormStep2;
