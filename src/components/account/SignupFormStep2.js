import React, { Component } from "react";
import "./SignUpModal.css";
import { ChevronLeftIcon, CheckIcon } from "@primer/octicons-react";
import {
  FormGroup,
  InputLabel,
  TextField,
  Button,
  Select,
  FormControl,
  Grid,
  MenuItem,
} from "@material-ui/core";

export class FormStep2 extends Component {
  back = (e) => {
    e.preventDefault();
    this.props.subStep();
  };

  render() {
    const { errors, handleChange, values } = this.props;
    return (
      <>
        <FormGroup>
          <FormControl variant="outlined" className="input-item">
            <InputLabel id="role">Role</InputLabel>
            <Select
              labelId="role"
              id="role_select"
              name="role"
              label="Role"
              value={values.role}
              onChange={handleChange}
              helperText={errors.role}
              error={errors.role !== null}
            >
              <MenuItem value="buyer">Buyer</MenuItem>
              <MenuItem value="seller">Seller</MenuItem>
              <MenuItem value="buyer-agent">Buyer Agent</MenuItem>
              <MenuItem value="seller-agent">Seller Agent</MenuItem>
              <MenuItem value="title-agent">Title Agent</MenuItem>
              <MenuItem value="Escrow-agent">Escrow Agent</MenuItem>
              <MenuItem value="Home Inspector">Home Inspector</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" className="input-item">
            <InputLabel id="state">State</InputLabel>
            <Select
              labelId="sate"
              id="state_select"
              label="State"
              name="state"
              value={values.state}
              onChange={handleChange}
              helperText={errors.state}
              error={errors.state !== null}
            >
              <MenuItem value="TX">Texas</MenuItem>
            </Select>
          </FormControl>
          <TextField
            className="input-item"
            label="Create Password"
            variant="outlined"
            type="Password"
            name="password"
            onChange={handleChange}
            onBlur={handleChange}
            value={values.password}
            helperText={errors.password}
            error={errors.password !== null}
          />
          <TextField
            className="input-item"
            label="Confirm Password"
            variant="outlined"
            type="Password"
            name="confirm"
            onChange={handleChange}
            onBlur={handleChange}
            value={values.confirm}
            helperText={errors.confirm}
            error={errors.confirm !== null}
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
                className="signup-contained-button small-next-button"
                onClick={this.props.submit}
                disabled={!values.validatedForm2}
              >
                Confirm &nbsp;
                <CheckIcon sixe={25} />
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                className="signup-contained-button small-back-button"
                onClick={this.back}
              >
                <ChevronLeftIcon sixe={25} /> &nbsp; Back
              </Button>
            </Grid>
          </Grid>
        </FormGroup>

        <div id="signin-link-footer">
          Already have an account? &nbsp;
          <a href="#">Sign In</a>
        </div>
      </>
    );
  }
}

export default FormStep2;
