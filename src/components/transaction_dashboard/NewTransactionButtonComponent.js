import React, {Component} from 'react';
import './Transaction.css';
import Button from '@material-ui/core/Button';
import Modal from '../shared/Modal';
import {Stepper, Step, StepLabel, Grid, FormGroup, TextField, FormControl, Box} from '@material-ui/core';
import { Icon } from '@iconify/react';
import tagIcon from '@iconify/icons-octicon/tag';
import locationIcon from '@iconify/icons-octicon/location';
import pencilIcon from '@iconify/icons-octicon/pencil';





class NewTransactionButton extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalOpen: false, // To store the state of the modal
            activeStep: 0
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.nextSteps = this.nextSteps.bind(this);
        this.prevSteps = this.prevSteps.bind(this);
        this.renderForm = this.renderForm.bind(this);
    }

    toggleModal(){ // To toggle the state of the modal
        if(this.state.isModalOpen == true){
            this.setState({
                isModalOpen: false
            });
        }
        else{
            this.setState({
                isModalOpen: true
            });
        }
        this.setState({
            activeStep: 0
        });
    }

    nextSteps(){
        var step = this.state.activeStep+1;
        if(step>3){
            step=2;
        }
        this.setState({
            activeStep: step
        });
    }

    prevSteps(){
        var step = this.state.activeStep-1;
        if(step<0){
            step=0;
        }
        this.setState({
            activeStep: step
        });
    }


    renderForm(){ //This function is to render the form and the components of the modal with the buttons
        if(this.state.activeStep === 0){
        return(
            <>
            <FormControl>
                <FormGroup row className="form-group">
                    <Icon icon={tagIcon} height={35} className="tag-icon"/>
                    <TextField variant="outlined" placeholder="name" className="input-new-transaction-form"/>
                </FormGroup>
                <FormGroup row className="form-group">
                    <Icon icon={locationIcon} height={35} className="location-icon" />
                    <TextField variant="outlined" placeholder="address" className="input-new-transaction-form"/>
                </FormGroup>
                <FormGroup row className="form-group">
                    <Icon icon={pencilIcon} height={35} className="pencil-icon" />
                    <TextField variant="outlined" placeholder="description" className="input-new-transaction-form"
                    multiline
                    rows={4}
                    />
                </FormGroup>
            </FormControl>
            <div className="button-group">
                <Grid container direction="row" justify="space-between">
                    <Grid item>
                        <Button variant="outlined" onClick={this.toggleModal} className="cancel-back-button">cancel</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" onClick={this.nextSteps} className="next-button">next</Button>
                    </Grid>
                </Grid>
            </div>
            </>
        );
        }
        else if(this.state.activeStep === 1){ // for the second step of the modal
            return(
                <>
                <Grid container direction="column" >
                    <Grid item>
                       <Grid container direction="row" justify="space-evenly" alignItems="center">
                           <Grid item>
                               <h2 className="invite-people-text">Invite people</h2>
                               <Box component="p" marginTop={-2} className="invite-people-text-subheading">Invite people to your transaction using their E-mail ID</Box>
                           </Grid>
                           <Grid item>
                               <Button variant="contained" className="invite-modal-button">Invite a person</Button>
                           </Grid>
                       </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container direction="row" justify="space-evenly" alignItems="center">
                            <Grid item>
                            <img src={require('../../assets/transaction-step-img.png')} alt="" className="transaction-step-img-default"/>
                            </Grid>
                            <Grid item>
                                <h2 className="invite-people-text">It's lonely up here...</h2>
                                <Box component="p" marginTop={-2} className="invite-people-text-subheading">Invite some people to your transaction. <br />You can skip this step for now <br/> and add more people later on.</Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <div className="button-group">
                <Grid container direction="row" justify="space-between">
                    <Grid item>
                        <Button variant="outlined" onClick={this.toggleModal} className="cancel-back-button">cancel</Button>
                    </Grid>
                    <Grid item>
                        <Grid container direction="row" spacing={2}>
                            <Grid item>
                            <Button variant="outlined" onClick={this.prevSteps} className="cancel-back-button">back</Button>
                            </Grid>
                            <Grid item>
                            <Button variant="contained" onClick={this.nextSteps} className="next-button">next</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                </div>
                </>
            );
        }
        else{
            return(
                <>
                <Grid contaainer direction="column" justify="center">
                    <Grid item>
                        <Box component="h2" className="invite-people-text">Are you sure to create the following transaction?</Box>
                    </Grid>
                    <Grid item>
                        <Grid container direction="column">
                            <Grid item>
                                <Grid container direction="row" alignItems="center">
                                    <Grid item><Icon icon={tagIcon} height={25} className="tag-icon"/></Grid>
                                    <Grid item><div className="invite-people-text-subheading">Transaction 1</div></Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container direction="row" alignItems="center">
                                    <Grid item><Icon icon={locationIcon} height={25} className="location-icon"/></Grid>
                                    <Grid item><div className="invite-people-text-subheading">Mountain View, California, United States</div></Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <h2>People involved</h2>
                        {/* Data of all the people invited will be sent here*/}
                    </Grid>
                </Grid>
                <Grid container direction="row" justify="space-between">
                    <Grid item>
                        <Button variant="outlined" onClick={this.toggleModal} className="cancel-back-button">cancel</Button>
                    </Grid>
                    <Grid item>
                        <Grid container direction="row" spacing={2}>
                            <Grid item>
                            <Button variant="outlined" onClick={this.prevSteps} className="cancel-back-button">back</Button>
                            </Grid>
                            <Grid item>
                            <Button variant="contained" onClick={this.toggleModal /*Will change to a fucntion that submits the document to the store*/ } diabled className="next-button">confirm</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                </>
            );
        }
    }

    render(){ 
    return(
        <>
        <Button variant="outlined" className="button-transaction" size="large" onClick={this.toggleModal}>+  New Transaction</Button>
        <Modal title="New Transaction" visible={this.state.isModalOpen} modalWidth={750}>
            <Stepper activeStep={this.state.activeStep}>
                <Step>
                    <StepLabel/>
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
        </>
    );
    }
}
export default NewTransactionButton;