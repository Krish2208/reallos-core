import React, {Component} from 'react';
import NavBar from '../shared/navbar/navbar';
import MiniDrawer from '../shared/TransactionDrawerComponent';
import {
    Container,
    Grid,
    Box,
    Typography,
    Fab
} from '@material-ui/core';
import {
    ArchiveIcon,
    ArrowUpIcon
} from '@primer/octicons-react';
import './PaperWork.css';

class PaperWork extends Component{
    constructor(props){
        super(props);
        this.state={
            paperwork:0
        }
        this.Renderpapers = this.Renderpapers.bind(this);
    }

    Renderpapers(){
        if(this.state.paperwork === 0)
        {
            return(
                <Grid container direction="column" alignItems="center" justify="center" spacing={2}>
                    <Grid item>
                        <img src={require('../../assets/no-paperwork-image.png')} className="no-paperwork-image"/>
                    </Grid>
                    <Grid item>
                        <Box marginTop={-3} marginLeft={4}>
                            <Typography className="paperwork-heading">Paperworks</Typography>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box marginTop={-1} marginLeft={4}>
                            <Typography className="paperwork-subheading">Store and E-sign all your documents</Typography>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box marginTop={-2} marginLeft={4}>
                            <Typography className="paperwork-subheading">hassle free here!</Typography>
                        </Box>
                    </Grid>
                </Grid>
            );
        }
    }

    render(){
        return(
            <div>
                <Container>
                    <NavBar />
                    <MiniDrawer />
                    <Box component="div" paddingTop={5} paddingBottom={5}>
                        <Grid container direction="row" alignItems="center" spacing={2}>
                            <Grid item>
                                <ArchiveIcon size={35} />
                            </Grid>
                            <Grid item>
                                <h2>Transaction 1</h2>
                            </Grid>
                        </Grid>
                    </Box>
                    <this.Renderpapers />
                    <Grid container direction="row" justify="flex-end" alignItems="flex-end">
                        <Fab
                            variant="extended"
                            className="reallos-fab"
                            size="large"
                            onClick={this.toggleModal}
                        >
                            <ArrowUpIcon className="fab-icon" size={20} /> &nbsp;
                            Upload Document
                        </Fab>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default PaperWork;