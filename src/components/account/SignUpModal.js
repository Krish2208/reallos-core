import React, {Component} from 'react';
import Modal from '../shared/modal/Modal';
import './SignUpModal.css';
import { ChevronRightIcon, ChevronLeftIcon,VerifiedIcon } from '@primer/octicons-react';
import {
    FormGroup,
    FormControlLabel,
    InputLabel,
    TextField,
    Checkbox,
    Button,
    Fab,
    Stepper,
    Step,
    StepLabel,
    Select,
    FormControl,
    Grid,
    Typography
} from '@material-ui/core';

class SignUpModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0
        }

        this.RenderStepsForm = this.RenderStepsForm.bind(this);
        this.addStep = this.addStep.bind(this);
        this.subStep = this.subStep.bind(this);
    }

    addStep() {
        var steps = this.state.activeStep + 1;
        this.setState({
            activeStep: steps
        });
    }

    subStep() {
        var steps = this.state.activeStep - 1;
        this.setState({
            activeStep: steps
        });
    }

    RenderStepsForm() {
        if(this.state.activeStep === 0) {
            return (
                <>
                    <FormGroup>
                        <TextField
                            className="input-item"
                            label="First Name"
                            variant="outlined"
                        />
                        <TextField
                            className="input-item"
                            label="Last Name"
                            variant="outlined"
                        />
                        <TextField
                            className="input-item"
                            label="Email"
                            variant="outlined"
                        />
                        <TextField
                            className="input-item"
                            label="Phone"
                            variant="outlined"
                        />
                        <Button variant="contained" className="signup-contained-button" onClick={this.addStep}>
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

        else if (this.state.activeStep === 1) {
            return (
                <>
                    <FormGroup>
                        <FormControl variant="outlined" className="input-item">
                            <InputLabel id="role">Role</InputLabel>
                            <Select
                                labelId="role"
                                id="role_select"
                                label="Role"
                            ></Select>
                        </FormControl>
                        <FormControl variant="outlined" className="input-item">
                            <InputLabel id="state">State</InputLabel>
                            <Select
                                labelId="sate"
                                id="state_select"
                                label="State"
                            ></Select>
                        </FormControl>
                        <TextField
                            className="input-item"
                            label="Create Password"
                            variant="outlined"
                            type="Password"
                        />
                        <TextField
                            className="input-item"
                            label="Confirm Password"
                            variant="outlined"
                            type="Password"
                        />
                        <Grid container style={{marginTop: 20}} direction="row-reverse" justify="space-between" alignItems="center">
                            <Grid item>
                                <Button variant="contained" className="signup-contained-button small-next-button" onClick={this.addStep}>
                                    Next &nbsp;
                                    <ChevronRightIcon size={25} />
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" className="signup-contained-button small-back-button" onClick={this.subStep}>
                                    <ChevronLeftIcon size={25} />  &nbsp;
                                    Back
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

        else {
            return (
                <Grid
                    className="signup-awaiting-verification-container"
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item>
                        <Grid container direction="row" justify="center">
                            <VerifiedIcon size={100} className="verified-icon"/>
                        </Grid>
                    </Grid>
                    <div className="signup-awaiting-verification-textblock">
                        <Grid item>
                            <Grid container direction="row" justify="center">
                                <Typography className="awaiting-heading">Awaiting Verification</Typography>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="row" justify="center">
                                <Typography align="justify">We have sent a link in your mail address, please click the link so that we can verify your email address and activate your account.</Typography>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            );
        }
    }

    render() {
        return (
            <Modal title="Sign Up" visible={this.props.visible} dismissCallback={this.props.dismissCallback}>
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