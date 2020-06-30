import React, { Component } from "react";
import "./SignUpModal.css";
import { ChevronRightIcon } from "@primer/octicons-react";
import { FormGroup, TextField, Button } from "@material-ui/core";
import { validateFormField } from "../../global_func_lib";

export class FormStep1 extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.addStep();
  };

  render() {
    const { errors, handleChange, values } = this.props;
    return (
      <>
        <FormGroup>
          <TextField
            className="input-item"
            label="First Name"
            variant="outlined"
            name="firstName"
            onChange={handleChange}
            onBlur={handleChange}
            value={values.firstName}
            helperText={errors.firstName}
            error={errors.firstName !== null}
          />
          <TextField
            className="input-item"
            label="Last Name"
            variant="outlined"
            name="lastName"
            onChange={handleChange}
            onBlur={handleChange}
            value={values.lastName}
            helperText={errors.lastName}
            error={errors.lastName !== null}
          />
          <TextField
            className="input-item"
            label="Email"
            variant="outlined"
            name="email"
            onChange={handleChange}
            onBlur={handleChange}
            value={values.email}
            helperText={errors.email}
            error={errors.email !== null}
          />
          <TextField
            className="input-item"
            label="Phone"
            variant="outlined"
            name="phone"
            onChange={handleChange}
            onBlur={handleChange}
            value={values.phone}
            helperText={errors.phone}
            error={errors.phone !== null}
          />
          <Button
            variant="contained"
            className="signup-contained-button"
            onClick={this.continue}
            disabled={!values.validatedForm1}
          >
            Next &nbsp;
            <ChevronRightIcon size={25} />
          </Button>
        </FormGroup>

        <div id="signin-link-footer">
          Already have an account? &nbsp;
          <a href="#">Sign In</a>
        </div>
      </>
    );
  }
}

export default FormStep1;
