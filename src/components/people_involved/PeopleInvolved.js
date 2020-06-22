import React, {Component} from 'react';
import NavBar from '../shared/navbar/navbar';
import MiniDrawer from '../shared/TransactionDrawerComponent';
import {
    Container,
    Grid,
    Box,
    Typography,
    Fab,
    Card,
    Avatar,
    IconButton
} from '@material-ui/core';
import {
    PackageIcon,
    PlusIcon,
    PencilIcon,
    XIcon,
    DotFillIcon
} from '@primer/octicons-react';
import './PeopleInvolved.css';
import {PEOPLE} from './TestData';

class PaperWork extends Component{
    constructor(props){
        super(props);
        this.state={
            data: PEOPLE,
            people:1
        }
        this.RenderPeopleInvolved = this.RenderPeopleInvolved.bind(this);
    }
    RenderPeopleInvolved(){
        const card = this.state.data.map((data) =>{
            return(
                <Grid key={data.id} container paddingLeft={6} direction="column" alignItems="center" justify="center" spacing={1}>
                    <Grid item paddingLeft={6} style={{width:'100%'}}>
                        <Box paddingLeft={6}>
                            <Card elevation={3}>
                                <Grid container direction="row" alignItems="center" spacing={1} style={{color:'#150158'}}>
                                    <Grid item xs={1}>
                                        <Box marginY={1} paddingLeft={2}>
                                            { data.img ? (
                                                <Avatar src={process.env.PUBLIC_URL + data.img}></Avatar>
                                            ) : (
                                            <Avatar style={{backgroundColor: '#150578'}}>{data.name.charAt(0)}</Avatar>
                                            )}
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Box marginY={1}>
                                            <Typography style={{fontWeight:800}}>
                                                {data.name}
                                                <span style={{paddingLeft: 12, fontWeight:200}}><DotFillIcon size={12}/></span>
                                                <span style={{paddingLeft: 12, fontWeight:450, fontSize:15}}>{data.role}</span>
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Box marginY={1}>
                                            {data.status}
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Box marginY={1} paddingRight={2}>
                                            <Typography align="right" style={{fontSize: 15}}>
                                                {data.email}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Box marginY={1}>
                                            <IconButton style={{color:"#565656"}}>
                                                <PencilIcon />
                                            </IconButton>
                                            <IconButton style={{color:"#565656"}}>
                                                <XIcon/>
                                            </IconButton>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Box>
                    </Grid>
                </Grid>
            );
        }
        );
        if(this.state.people === 0)
        {
            return(
                <Grid container direction="column" alignItems="center" justify="center" spacing={2}>
                    <Grid item>
                        <Box marginTop={-4}>
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
                <Grid container direction="column" spacing={1} paddingTop={-1}>
                    <Box paddingLeft={6}>
                        <Grid item>
                            <h3>People Involved</h3>
                        </Grid>
                    </Box>
                    <Box marginTop={-1}>
                        {card}
                    </Box>
                </Grid>
            );
        }
    }

    

    render(){
        return(
            <div>
                <Container>
                    <NavBar/>
                    <MiniDrawer />
                    <Box component="div" paddingTop={3} paddingBottom={-1} paddingLeft={5}>
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