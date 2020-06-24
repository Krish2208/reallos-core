import React, { Component } from "react";
import Modal from "../shared/modal/Modal";
import SignupFormStep1 from "./SignUpFormStep1";
import SignupFormStep2 from "./SignupFormStep2";
import SignupFormStep3 from "./SignupFormStep3";
import "./SignUpModal.css";
import { Stepper, Step, StepLabel } from "@material-ui/core";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addUser } from '../../actions/userActions';

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const validPhoneRegex = RegExp(/^[0-9]{10}$/);

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};

const mapStateToProps = (state)=>({
  user: state.user
});

const mapDispatchToProps = (dispatch)=>{
  return bindActionCreators({
    addUser
  },dispatch);
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
      role: null,
      state: null,
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
    this.closeSignUpModal = this.closeSignUpModal.bind(this);
    this.addStep = this.addStep.bind(this);
  }

  closeSignUpModal(){ // closing Signup Modal and setting the state to the default value
    this.props.dismissCallback();
    this.setState({
      activeStep: 0,
      firstName: null,
      lastName: null,
      email: null,
      phone: null,
      password: null,
      state:null,
      role:null,
      confirm: null
    });
  }

  submitSignUp(){ // function to submit the values in the signup form and move the form to the next step
    this.props.addUser(this.state.firstName,
      this.state.lastName,
      this.state.email,
      this.state.phone,
      this.state.role,
      this.state.state,
      this.state.password); // Dispatching a function to add the values of the state to the user
    this.addStep(); // moving the sorm to the next step
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
    let errorsStep_1 = { // Setting up an object to check if the fields in the first step have an error
      firstName: this.state.errors.firstName,
      lastName: this.state.errors.lastName,
      email: this.state.errors.email,
      phone: this.state.errors.phone
    }
    let errorsStep_2 = { // Setting up an object to check if the fields in the second step have an error
      password: this.state.errors.password,
      confirm: this.state.errors.confirm
    }
    if(this.state.activeStep === 0 && validateForm(errorsStep_1)){ // if no errors in the first step and the active step is 0
      this.setState({
        activeStep: 1
      })
    }
    if(this.state.activeStep === 1 && validateForm(errorsStep_2)){ // if no errors in the second step and the active step is 1
      this.setState({
        activeStep: 2
      })
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
          <SignupFormStep1
            handleChange={this.handleChange}
            addStep={this.addStep}
            errors={this.state.errors}
            values={values}
          />
        );
      case 1:
        return (
          <SignupFormStep2
            handleChange={this.handleChange}
            addStep={this.addStep}
            subStep={this.subStep}
            errors={this.state.errors}
            values={values}
            submit={()=>this.submitSignUp()}
          />
        );
      case 2:
        return <SignupFormStep3 />;
      default:
    }
  }

  render() {
    //console.log(this.props.user); // Logging purpose to see of the state of the store is changing or not
    return (
      <Modal
        title="Sign Up"
        visible={this.props.visible}
        dismissCallback={this.closeSignUpModal}
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUpModal);
