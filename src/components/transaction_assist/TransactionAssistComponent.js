import React, {Component} from 'react';
import NavBar from '../shared/navbar/navbar';
import Modal from '../shared/modal/Modal';
import {
    Container,
    Box, 
    Grid,
    Button,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails, 
    Divider
} from '@material-ui/core';
import {
    TriangleDownIcon,
    RepoIcon, 
    CheckIcon
} from '@primer/octicons-react';
import './transactionassist.css';
class TransactionAssist extends Component{
    constructor(props){
        super(props);

        this.state = {
            firstTime: true //To check if the user is visting for the first time 
        }

        this.firstTimeModal = this.firstTimeModal.bind(this);
        this.closeFirstTime = this.closeFirstTime.bind(this);
        this.RenderExpansionPanel = this.RenderExpansionPanel.bind(this);
    }

    closeFirstTime(){
        // Make sure that the database is updated with this information
        this.setState({
            firstTime: false
        });
    }

    firstTimeModal(){ // To display the first time modal to people
        return(
            <Modal visible={this.state.firstTime} modalWidth={750} modalHeight={500} dismissCallback={this.closeFirstTime}>
                <Grid container direction="column" alignItems="center" justify="center">
                    <Grid item>
                        <img src={require('../../assets/transaction-assist-first-time.png')} className="first-time-image"/>
                    </Grid>
                    <Grid item>
                        <Box component="h1">Trasaction assist</Box>
                    </Grid>
                    <Grid item>
                        <Box  component="p" m={-2}>Exactly know the progress of your transaction</Box>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" className="continue-button" onClick={this.closeFirstTime}>continue</Button>
                    </Grid>
                </Grid>
            </Modal>
        );
    }

    RenderExpansionPanel(){
        return(
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<TriangleDownIcon />} > 
                            <Grid container direction="row" alignItems="center">
                                <Grid item>
                                    <CheckIcon />
                                </Grid>
                                <Grid item>
                                    <Divider orientation="vertical" />
                                </Grid>
                                <Grid item>
                                    <p>text here</p>
                                </Grid>
                            </Grid>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <p>hey hey hey</p>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </Grid>
                <Grid item>
                    <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<TriangleDownIcon />} > Panel 1 </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <p>hey hey hey</p>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </Grid>
            </Grid> 
        );
    }

    render(){
        return(
            <Box component="div">
                <Container>
                    <NavBar />
                    <this.firstTimeModal />
                    <Box component="div" paddingTop={5} paddingBottom={5}>
                        <Grid container direction="row" alignItems="center" spacing={2}>
                            <Grid item>
                                <RepoIcon size={35} />
                            </Grid>
                            <Grid item>
                                <h2 className="transaction-heading" >Transaction 1</h2>
                            </Grid>
                        </Grid>
                    </Box>
                    <this.RenderExpansionPanel />
                </Container>
            </Box>
        );
    }
}

export default TransactionAssist;