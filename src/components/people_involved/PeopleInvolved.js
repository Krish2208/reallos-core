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
    PackageIcon,
    PlusIcon
} from '@primer/octicons-react';
import './PeopleInvolved.css';

class PaperWork extends Component{
    constructor(props){
        super(props);
        this.state={
            people:1
        }
        this.RenderPeopleInvolved = this.RenderPeopleInvolved.bind(this);
        this.RenderPersonCard = this.RenderPersonCard.bind(this);
    }

    RenderPersonCard(){
        return(
            <Grid container paddingLeft={6} direction="row" alignItems="center" justify="center" spacing={1}>
                <Grid item paddingLeft={6} style={{width:'100%', backgroundColor:'grey'}}>
                    <Box paddingLeft={6}>Hello</Box>
                </Grid>
            </Grid>
        );
    }

    RenderPeopleInvolved(){
        if(this.state.people === 0)
        {
            return(
                <Grid container direction="column" alignItems="center" justify="center" spacing={2}>
                    <Grid item>
                        <Box marginTop={-8}>
                            <img src={require('../../assets/no-people-img.png')} className="no-people-image"/>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box marginTop={-3} marginLeft={4}>
                            <Typography style={{fontWeight:700}} className="people-heading">People</Typography>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box marginTop={-2.5} marginLeft={4}>
                            <Typography className="people-subheading">Invite People to the Transaction</Typography>
                        </Box>
                    </Grid>
                </Grid>
            );
        }
        else
        {
            return(
                <this.RenderPersonCard/>
            );
        }
    }

    

    render(){
        return(
            <div>
                <Container>
                    <NavBar/>
                    <MiniDrawer />
                    <Box component="div" paddingTop={3} paddingBottom={4} paddingLeft={5}>
                        <Grid container direction="row" alignItems="center" spacing={2} >
                            <Grid item>
                                <PackageIcon size={35} />
                            </Grid>
                            <Grid item>
                                <h2>Transaction 1</h2>
                            </Grid>
                        </Grid>
                    </Box>
                    <this.RenderPeopleInvolved />
                    <Grid container direction="row" justify="flex-end" alignItems="flex-end">
                        <Fab
                            variant="extended"
                            className="reallos-fab"
                            size="large"
                            onClick={this.toggleModal}
                        >
                            <PlusIcon className="fab-icon" size={20} /> &nbsp;
                            Add People
                        </Fab>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default PaperWork;