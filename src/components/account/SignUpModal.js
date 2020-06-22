import React, { Component } from "react";
import Modal from "../shared/modal/Modal";
import "./SignUpModal.css";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  VerifiedIcon,
} from "@primer/octicons-react";
import {
  FormGroup,
  InputLabel,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Select,
  FormControl,
  Grid,
  Typography,
} from "@material-ui/core";

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validPhoneRegex = RegExp(/^[0-9]{10}$/);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};

class SignUpModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      firstName: null,
      lastName: null,
      email: null,
      phone: null,
      password: null,
      confirm: null,
      errors: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirm: "",
      },
    };

    this.RenderStepsForm = this.RenderStepsForm.bind(this);
    this.addStep = this.addStep.bind(this);
    this.subStep = this.subStep.bind(this);
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "firstName":
        errors.firstName =
          value === "" ? "This field can not be left empty" : "";
        break;
      case "lastName":
        errors.lastName =
          value === "" ? "This field can not be left empty" : "";
        break;
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is invalid";
        break;
      case "phone":
        errors.email = validPhoneRegex.test(value) ? "" : "Number is invalid";
        break;
      case "password":
        errors.password =
          value.length < 8 ? "Password must be 8 characters long!" : "";
        break;
      case "confirm":
        errors.password =
          value === this.state.password ? "Passwords did not match" : "";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm(this.state.errors)) {
      this.addStep();
    }
  };

  addStep() {
    var steps = this.state.activeStep + 1;
    this.setState({
      activeStep: steps,
    });
  }

  subStep() {
    var steps = this.state.activeStep - 1;
    this.setState({
      activeStep: steps,
    });
  }

  RenderStepsForm() {
    if (this.state.activeStep === 0) {
      return (
        <FormGroup>
          <TextField
            className="input-item"
            label="First Name"
            variant="outlined"
            name="firstName"
            onChange={this.handleChange}
            onBlur={this.handleChange}
            helperText={this.state.errors.firstName}
            error={this.state.errors.firstName !== ""}
          />
          <TextField
            className="input-item"
            label="Last Name"
            variant="outlined"
            name="lastName"
            onChange={this.handleChange}
            onBlur={this.handleChange}
            helperText={this.state.errors.lastName}
            error={this.state.errors.lastName !== ""}
          />
          <TextField
            className="input-item"
            label="Email"
            variant="outlined"
            name="email"
            onChange={this.handleChange}
            onBlur={this.handleChange}
            helperText={this.state.errors.email}
            error={this.state.errors.email !== ""}
          />
          <TextField
            className="input-item"
            label="Phone"
            variant="outlined"
            name="phone"
            onChange={this.handleChange}
            onBlur={this.handleChange}
            helperText={this.state.errors.phone}
            error={this.state.errors.phone !== ""}
          />
          <Button
            variant="contained"
            className="big-next-button"
            onClick={this.handleSubmit}
          >
            Next &nbsp;
            <ChevronRightIcon size={30} />
          </Button>
        </FormGroup>
      );
    } else if (this.state.activeStep === 1) {
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
            onChange={this.handleChange}
            onBlur={this.handleChange}
            helperText={this.state.errors.password}
            error={this.state.errors.password !== ""}
          />
          <TextField
            className="input-item"
            label="Confirm Password"
            variant="outlined"
            type="Password"
            name="confirm"
            onChange={this.handleChange}
            onBlur={this.handleChange}
            helperText={this.state.errors.confirm}
            error={this.state.errors.confirm !== ""}
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
                onClick={this.handleSubmit}
              >
                Next &nbsp;
                <ChevronRightIcon />
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                className="small-back-button"
                onClick={this.subStep}
              >
                <ChevronLeftIcon /> &nbsp; Back
              </Button>
            </Grid>
          </Grid>
        </FormGroup>
      );
    } else {
      return (
        <Grid direction="column" justify="center" alignItems="center">
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
                We have sent a link in your mail address, please click the link
                so that we can verify your email address and activate your
                account.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      );
    }
  }

  render() {
    return (
      <Modal
        title="Sign UP"
        visible={this.props.visible}
        dismissCallback={this.props.dismissCallback}
      >
        <Stepper activeStep={this.state.activeStep}>
          <Step>
            <StepLabel />
          </Step>
          <Step>
            <StepLabel />
          </Step>
          <Step>
            <StepLabel />
          </Step>
        </Stepper>
        <this.RenderStepsForm />
      </Modal>
    );
  }
}

export default SignUpModal;
