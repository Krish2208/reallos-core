import React, { Component } from "react";
import Modal from "../shared/modal/Modal";
import FormStep1 from "./FormStep1";
import FormStep2 from "./FormStep2";
import FormStep3 from "./FormStep3";
import "./SignUpModal.css";
import { Stepper, Step, StepLabel } from "@material-ui/core";

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
        errors.phone = validPhoneRegex.test(value) ? "" : "Number is invalid";
        break;
      case "password":
        errors.password =
          value.length < 8 ? "Password must be 8 characters long!" : "";
        break;
      case "confirm":
        errors.confirm =
          value !== this.state.password ? "Passwords did not match" : "";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  addStep() {
    var steps = this.state.activeStep + 1;
    if (validateForm(this.state.errors)) {
      this.setState({
        activeStep: steps,
      });
    }
  }

  subStep() {
    var steps = this.state.activeStep - 1;
    this.setState({
      activeStep: steps,
    });
  }

  RenderStepsForm() {
    const { firstName, lastName, email, phone, password, confirm } = this.state;
    const values = { firstName, lastName, email, phone, password, confirm };
    switch (this.state.activeStep) {
      case 0:
        return (
          <FormStep1
            handleChange={this.handleChange}
            addStep={this.addStep}
            errors={this.state.errors}
            values={values}
          />
        );
      case 1:
        return (
          <FormStep2
            handleChange={this.handleChange}
            addStep={this.addStep}
            subStep={this.subStep}
            errors={this.state.errors}
            values={values}
          />
        );
      case 2:
        return <FormStep3 />;
      default:
    }
  }

  render() {
    return (
      <Modal
        title="Sign Up"
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
