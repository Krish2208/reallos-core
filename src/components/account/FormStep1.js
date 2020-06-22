import React, { Component } from "react";
import "./SignUpModal.css";
import { ChevronRightIcon } from "@primer/octicons-react";
import { FormGroup, TextField, Button } from "@material-ui/core";

export class FormStep1 extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.addStep();
  };

  render() {
    const { errors, handleChange, values } = this.props;
    return (
      <FormGroup>
        <TextField
          className="input-item"
          label="First Name"
          variant="outlined"
          name="firstName"
          onChange={handleChange}
          onBlur={handleChange}
          defaultValue={values.firstName}
          helperText={errors.firstName}
          error={errors.firstName !== ""}
        />
        <TextField
          className="input-item"
          label="Last Name"
          variant="outlined"
          name="lastName"
          onChange={handleChange}
          onBlur={handleChange}
          defaultValue={values.lastName}
          helperText={errors.lastName}
          error={errors.lastName !== ""}
        />
        <TextField
          className="input-item"
          label="Email"
          variant="outlined"
          name="email"
          onChange={handleChange}
          onBlur={handleChange}
          defaultValue={values.email}
          helperText={errors.email}
          error={errors.email !== ""}
        />
        <TextField
          className="input-item"
          label="Phone"
          variant="outlined"
          name="phone"
          onChange={handleChange}
          onBlur={handleChange}
          defaultValue={values.phone}
          helperText={errors.phone}
          error={errors.phone !== ""}
        />
        <Button
          variant="contained"
          className="big-next-button"
          onClick={this.continue}
        >
          Next &nbsp;
          <ChevronRightIcon size={30} />
        </Button>
      </FormGroup>
    );
  }
}

export default FormStep1;
