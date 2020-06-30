import React, { Component } from "react";
import Modal from "../shared/modal/Modal";
import "./Transaction.css";
import TransactionNoPeople from "../../assets/transaction-no-people.png";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addTransaction } from "../../actions/transactionActions";
import { addTransactionUser } from "../../actions/userActions";
import { validateFormField } from "../../global_func_lib";
import {
  PlusIcon,
  TagIcon,
  LocationIcon,
  PencilIcon,
  PersonIcon,
  MailIcon,
  QuestionIcon,
  CheckIcon,
  XIcon,
} from "@primer/octicons-react";

import {
  Stepper,
  Step,
  StepLabel,
  Grid,
  FormGroup,
  TextField,
  FormControl,
  Box,
  Fab,
  Button,
  Select,
  MenuItem,
  Card,
  CardContent,
  Chip,
  InputLabel,
} from "@material-ui/core";

const mapStateToProps = (state) => ({
  transaction: state.transaction,
  user: state.user,
});
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addTransaction,
      addTransactionUser,
    },
    dispatch
  );
};

class NewTransactionButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false, // To store the state of the modal
      activeStep: 0,
      isInsideModalOpen: false,
      Name: null,
      Address: null,
      Description: null,
      Invite: {
        // Holding the temprorary state of the invites
        Name: null,
        Email: null,
        Role: null,
        Accepted: false,
      },
      errors: {
        Name: null,
        Address: null,
        Description: null,
        Email: null,
        Role: null,
      },
      validatedForm: false,
      validatedInvite: false,
      Invites: [], // Holding the array of the invites
    };

    this.validForm = this.validForm.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.validStep = this.validStep.bind(this);
    this.nextSteps = this.nextSteps.bind(this);
    this.prevSteps = this.prevSteps.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.toggleInsideModal = this.toggleInsideModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleInviteChange = this.handleInviteChange.bind(this);
    this.addInvite = this.addInvite.bind(this);
    this.editInvite = this.editInvite.bind(this);
    this.deleteInvite = this.deleteInvite.bind(this);
    this.createTransaction = this.createTransaction.bind(this);
  }

  validForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val !== null && (valid = false));
    return valid;
  };

  componentDidUpdate() {
    // whenever the component is updated
    if (
      this.props.transaction.length &&
      this.props.transaction.length > this.props.user.transactionID.length
    ) {
      // If the number of transactions are greater than the ones stored for the user
      let transId = this.props.transaction.map((transaction) => transaction.id); // getting all the ids of the transactions that were created
      this.props.addTransactionUser(transId);
    }
  }

  /**
   * Toggle the state of modal
   */
  toggleModal() {
    this.setState({
      activeStep: 0,
      isModalOpen: !this.state.isModalOpen,
      Name: null,
      Address: null,
      Description: null,
      Invites: [],
    });
  }

  /**
   * Validate step 1 form and then continue to next step
   */
  validStep() {
    let errors = {
      Name: this.state.errors.Name,
      Address: this.state.errors.Address,
      Description: this.state.errors.Description,
    };

    if (this.state.validatedForm === true && this.validForm(errors)) {
      this.nextSteps();
    }
  }

  /**
   * Advance to next step
   */
  nextSteps() {
    let step = this.state.activeStep + 1;

    if (step > 3) {
      step = 3;
    }

    this.setState({
      activeStep: step,
    });
  }

  /**
   * Get back one step
   */
  prevSteps() {
    let step = this.state.activeStep - 1;

    if (step < 0) {
      step = 0;
    }

    this.setState({
      activeStep: step,
    });
  }

  /**
   * Toggle Inside Modal
   */
  toggleInsideModal() {
    this.setState({
      isInsideModalOpen: !this.state.isInsideModalOpen,
      Invite: {
        Name: "",
        Email: "",
        Role: "",
      },
    });
  }

  handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    let formFieldError = {
      hasError: false,
      errorText: null,
    };
    formFieldError = validateFormField(value, name);
    switch (name) {
      case "name":
        errors.Name = formFieldError.errorText;
        this.setState({ Name: value });
        break;
      case "address":
        errors.Address = formFieldError.errorText;
        this.setState({ Address: value });
        break;
      case "description":
        errors.Description = formFieldError.errorText;
        this.setState({ Description: value });
        break;
      default:
    }

    this.setState({ errors });
    if (
      this.state.Name != null &&
      this.state.Address != null &&
      this.state.Description != null
    ) {
      this.setState({ validatedForm: true });
    } else {
      this.setState({ validatedForm: false });
    }
  }

  handleInviteChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    let formFieldError = {
      hasError: false,
      errorText: null,
    };
    formFieldError = validateFormField(value, name);
    switch (name) {
      case "name":
        errors.Name = formFieldError.errorText;
        break;
      case "email":
        errors.Email = formFieldError.errorText;
        break;
      case "role":
        errors.Role = formFieldError.errorText;
        break;
      default:
    }

    this.setState({ errors });

    let Invite = this.state.Invite; // Intitalizing Invite with the state Invite
    Invite.Accepted = false; // Always setting the accepted value to false
    if (name === "name") {
      Invite.Name = value;
    }
    if (name === "email") {
      Invite.Email = value;
    }
    if (name === "role") {
      Invite.Role = value;
    }
    this.setState({ Invite: Invite }); // Setting the state of the invite

    if (
      this.state.Invite.Name != null &&
      this.state.Invite.Email != null &&
      this.state.Invite.Role != null
    ) {
      this.setState({ validatedInvite: true });
    } else {
      this.setState({ validatedInvite: false });
    }
  }

  addInvite() {
    let errors = {
      Name: this.state.errors.Name,
      Email: this.state.errors.Email,
      Description: this.state.errors.Role,
    };

    if (this.state.validatedInvite === true && this.validForm(errors)) {
      // Function to add the person's invite to the state array
      let Invites = this.state.Invites;
      Invites.push(this.state.Invite);
      this.setState({ Invites });
      this.toggleInsideModal(); //Closing the inside modal
    }
  }

  editInvite(invite) {
    // function to edit the invites
    this.toggleInsideModal();
    let Invite = this.state.Invite;
    Invite.Name = invite.Name;
    Invite.Email = invite.Email;
    Invite.Role = invite.Role;
    this.setState({ Invite });
  }

  deleteInvite(email) {
    let Invites = this.state.Invites;
    Invites = Invites.filter((Invite) => Invite.Email != email);
    this.setState({ Invites });
  }

  createTransaction() {
    this.toggleModal(); // Closing the modal
    this.props.addTransaction(
      this.state.Name,
      this.state.Address,
      this.state.Description,
      this.state.Invites
    ); // dispatching an action with the appropriate payload
  }

  /**
   * Renders the form and the components of the modal with the buttons.
   */
  renderForm() {
    if (this.state.activeStep === 0) {
      return (
        <>
          <FormControl>
            <FormGroup row className="form-group">
              <TagIcon size={25} className="location-icon" />
              <TextField
                variant="outlined"
                label="Name"
                className="input-new-transaction-form"
                name="name"
                onChange={this.handleChange}
                value={this.state.Name}
                onBlur={this.handleChange}
                helperText={this.state.errors.Name}
                error={this.state.errors.Name !== null}
              />
            </FormGroup>
            <FormGroup row className="form-group">
              <LocationIcon size={25} className="location-icon" />
              <TextField
                variant="outlined"
                label="Address"
                className="input-new-transaction-form"
                name="address"
                onChange={this.handleChange}
                value={this.state.Address}
                onBlur={this.handleChange}
                helperText={this.state.errors.Address}
                error={this.state.errors.Address !== null}
              />
            </FormGroup>
            <FormGroup row className="form-group">
              <PencilIcon size={25} className="pencil-icon" />
              <TextField
                variant="outlined"
                label="Description"
                className="input-new-transaction-form"
                multiline
                rows={4}
                name="description"
                value={this.state.Description}
                onChange={this.handleChange}
                onBlur={this.handleChange}
                helperText={this.state.errors.Description}
                error={this.state.errors.Description !== null}
              />
            </FormGroup>
          </FormControl>
          <div className="button-group">
            <Grid container direction="row" justify="space-between">
              <Grid item>
                <Button
                  variant="outlined"
                  onClick={this.toggleModal}
                  className="cancel-back-button"
                >
                  cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={this.validStep}
                  className="next-button"
                >
                  next
                </Button>
              </Grid>
            </Grid>
          </div>
        </>
      );
    } else if (this.state.activeStep === 1 && this.state.Invites.length === 0) {
      // for the second step of the modal and no one has been invited yet
      return (
        <>
          <Grid container direction="column">
            <Grid item>
              <Grid
                container
                direction="row"
                justify="space-evenly"
                alignItems="center"
              >
                <Grid item>
                  <h2 className="invite-people-text">Invite people</h2>
                  <Box
                    component="p"
                    marginTop={-2}
                    className="invite-people-text-subheading"
                  >
                    Invite people to your transaction using their E-mail ID
                  </Box>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    className="invite-modal-button reallos-button"
                    onClick={this.toggleInsideModal}
                  >
                    <PersonIcon /> &nbsp; Invite a person
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid
                container
                direction="row"
                justify="space-evenly"
                alignItems="center"
              >
                <Grid item>
                  <img
                    src={TransactionNoPeople}
                    alt=""
                    className="transaction-step-img-default"
                  />
                </Grid>
                <Grid item>
                  <h2 className="invite-people-text">It's lonely up here...</h2>
                  <Box
                    component="p"
                    marginTop={-2}
                    className="invite-people-text-subheading"
                  >
                    Invite some people to your transaction. <br />
                    You can skip this step for now <br /> and add more people
                    later on.
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <div className="button-group">
            <Grid container direction="row" justify="space-between">
              <Grid item>
                <Button
                  variant="outlined"
                  onClick={this.toggleModal}
                  className="cancel-back-button"
                >
                  cancel
                </Button>
              </Grid>
              <Grid item>
                <Grid container direction="row" spacing={2}>
                  <Grid item>
                    <Button
                      variant="outlined"
                      onClick={this.prevSteps}
                      className="cancel-back-button"
                    >
                      back
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      onClick={this.nextSteps}
                      className="next-button"
                    >
                      next
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </>
      );
    } else if (this.state.activeStep === 1 && this.state.Invites.length !== 0) {
      // For the second step and someone has already been invited
      return (
        <>
          <Grid container direction="column">
            <Grid item>
              <Grid
                container
                direction="row"
                justify="space-evenly"
                alignItems="center"
              >
                <Grid item>
                  <h2 className="invite-people-text">Invite people</h2>
                  <Box
                    component="p"
                    marginTop={-2}
                    className="invite-people-text-subheading"
                  >
                    Invite people to your transaction using their E-mail ID
                  </Box>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    className="invite-modal-button reallos-button"
                    onClick={this.toggleInsideModal}
                  >
                    <PersonIcon /> &nbsp; Invite a person
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item className="invited-person-card">
              <Box marginX={4}>
                {this.state.Invites.map((Invite) => (
                  <Card variant="outlined">
                    <CardContent>
                      <Grid
                        container
                        spacing={1}
                        direction="row"
                        justify="center"
                        alignItems="center"
                        style={{ color: "#150578" }}
                      >
                        <Grid
                          item
                          xs={2}
                          style={{
                            fontWeight: 500,
                            paddingTop: 0,
                            paddingBottom: 0,
                          }}
                        >
                          {Invite.Name}
                        </Grid>
                        <Grid item xs={2}>
                          {Invite.Role}
                        </Grid>
                        <Grid item xs={6} alignContent="right">
                          {Invite.Email}
                        </Grid>
                        <Grid item xs={1}>
                          <Button onClick={() => this.editInvite(Invite)}>
                            <PencilIcon size={16} />
                          </Button>
                        </Grid>
                        <Grid item xs={1}>
                          <Button
                            onClick={() => this.deleteInvite(Invite.Email)}
                          >
                            <XIcon size={16} />
                          </Button>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Grid>
          </Grid>
          <div className="button-group">
            <Grid container direction="row" justify="space-between">
              <Grid item>
                <Button
                  variant="outlined"
                  onClick={this.toggleModal}
                  className="cancel-back-button"
                >
                  cancel
                </Button>
              </Grid>
              <Grid item>
                <Grid container direction="row" spacing={2}>
                  <Grid item>
                    <Button
                      variant="outlined"
                      onClick={this.prevSteps}
                      className="cancel-back-button"
                    >
                      back
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      onClick={this.nextSteps}
                      className="next-button"
                    >
                      next
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </>
      );
    } else {
      return (
        <>
          <Grid container direction="column" justify="center">
            <Grid item>
              <Box component="h2" className="invite-people-text">
                Are you sure to create the following transaction?
              </Box>
            </Grid>
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <Grid container direction="row" alignItems="center">
                    <Grid item>
                      <TagIcon size={25} className="location-icon" />
                    </Grid>
                    <Grid item>
                      <div className="invite-people-text-subheading">
                        {this.state.Name}
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                <div style={{ marginBottom: 10 }}></div>
                <Grid item>
                  <Grid container direction="row" alignItems="center">
                    <Grid item>
                      <LocationIcon size={25} className="location-icon" />
                    </Grid>
                    <Grid item>
                      <div className="invite-people-text-subheading">
                        {this.state.Address}
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              {this.state.Invites.length !== 0 ? (
                <h2>People involved</h2>
              ) : (
                <h4>To add People go to step 2</h4>
              )}{" "}
              {/* Still have to perform the styling when no one is involved */}
              <Grid item className="people-involved-grid">
                <Grid direction="row">
                  {this.state.Invites.map((Invite) => (
                    <Chip
                      onDelete={() => this.deleteInvite(Invite.Email)}
                      className="third-step-person-chip"
                      color="primary"
                      variant="outlined"
                      label={Invite.Name}
                    />
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container direction="row" justify="space-between">
            <Grid item>
              <Button
                variant="outlined"
                onClick={this.toggleModal}
                className="cancel-back-button"
              >
                cancel
              </Button>
            </Grid>
            <Grid item>
              <Grid container direction="row" spacing={2}>
                <Grid item>
                  <Button
                    variant="outlined"
                    onClick={this.prevSteps}
                    className="cancel-back-button"
                  >
                    back
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={this.createTransaction}
                    diabled
                    className="next-button"
                  >
                    confirm
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
      );
    }
  }

  render() {
    return (
      <>
        <Fab
          variant="extended"
          className="reallos-fab"
          size="large"
          onClick={this.toggleModal}
        >
          <PlusIcon className="fab-icon" size={20} /> &nbsp; New Transaction
        </Fab>

        <Modal
          title="New Transaction"
          visible={this.state.isModalOpen}
          modalWidth={750}
          dismissCallback={this.toggleModal}
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
          <this.renderForm />
        </Modal>

        <Modal
          title="Invite People"
          visible={this.state.isInsideModalOpen}
          modalWidth={750}
          dismissCallback={this.toggleInsideModal}
        >
          <FormGroup row className="form-group">
            <PersonIcon size={25} className="location-icon" />
            <TextField
              variant="outlined"
              label="Name"
              className="input-new-transaction-form"
              name="name"
              value={this.state.Invite.Name}
              onChange={this.handleInviteChange}
              onBlur={this.handleInviteChange}
              helperText={this.state.errors.Name}
              error={this.state.errors.Name !== null}
            />
          </FormGroup>
          <FormGroup row className="form-group">
            <MailIcon size={25} className="location-icon" />
            <TextField
              variant="outlined"
              label="E-mail"
              className="input-new-transaction-form"
              name="email"
              value={this.state.Invite.Email}
              onChange={this.handleInviteChange}
              onBlur={this.handleInviteChange}
              helperText={this.state.errors.Email}
              error={this.state.errors.Email !== null}
            />
          </FormGroup>
          <FormGroup row className="form-group">
            <QuestionIcon size={25} className="location-icon" />
            <FormControl variant="outlined">
              <InputLabel id="role">Role</InputLabel>
              <Select
                labelId="role"
                label="Role"
                variant="outlined"
                id="select"
                className="input-new-transaction-form"
                name="role"
                value={this.state.Invite.Role}
                onChange={this.handleInviteChange}
                onBlur={this.handleInviteChange}
                helperText={this.state.errors.Role}
                error={this.state.errors.Role !== null}
              >
                <MenuItem value="Buyer">Buyer</MenuItem>
                <MenuItem value="Seller">Seller</MenuItem>
                <MenuItem value="Buyer Agent">Buyer Agent</MenuItem>
                <MenuItem value="Seller Agent">Seller Agent</MenuItem>
                <MenuItem value="Title Agent">Title Agent</MenuItem>
                <MenuItem value="Escrow Agent">Escrow Agent</MenuItem>
                <MenuItem value="Home Inspector">Home Inspector</MenuItem>
              </Select>
            </FormControl>
          </FormGroup>

          <div className="button-group">
            <Grid container direction="row" spacing={2} justify="flex-end">
              <Grid item>
                <Button
                  variant="outlined"
                  onClick={this.toggleInsideModal}
                  className="cancel-back-button"
                >
                  cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={this.addInvite}
                  className="next-button"
                >
                  <CheckIcon /> &nbsp; Invite
                </Button>
              </Grid>
            </Grid>
          </div>
        </Modal>
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewTransactionButton);
