import React, {Component} from 'react';
import './Transaction.css';
import Button from '@material-ui/core/Button';
import Modal from '../shared/Modal';
import {Stepper, Step, StepLabel, Grid, FormGroup, TextField, FormControl, Box} from '@material-ui/core';
import { Icon, InlineIcon } from '@iconify/react';
import tagIcon from '@iconify/icons-octicon/tag';



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
        this.renderButton = this.renderButton.bind(this);
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


    renderButton(){
        if(this.state.activeStep === 0){
            return(
                <>
                <Grid container direction="row" justify="space-between">
                    <Grid item>
                        <Button variant="outlined" onClick={this.toggleModal} className="cancel-back-button">cancel</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" onClick={this.nextSteps} className="next-button">next</Button>
                    </Grid>
                </Grid>
                </>
            );
        }
        else if(this.state.activeStep === 1){
            return(
                <>
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
                </>
            );
        }
        else{
            return(
                <>
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
                            <Button variant="contained" onClick={this.nextSteps} diabled className="next-button">confirm</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                </>
            );
        }
    }

    renderForm(){
        if(this.state.activeStep === 0){
        return(
            <FormControl fullWidth>
            </FormControl>
        );
        }
        else{
            return(<></>);
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
            <this.renderButton />
        </Modal>
        </>
    );
    }
}
export default NewTransactionButton;