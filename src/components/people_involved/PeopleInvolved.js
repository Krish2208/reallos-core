import React, {Component} from 'react';
import NavBar from '../shared/navbar/navbar';
import NavRail from '../shared/navigation_rail/TransactionNavRail';
import {
    Container,
    Grid,
    Box,
    Typography,
    Fab,
    Card,
    Avatar,
    IconButton,
    FormGroup,
    TextField,
    Select,
    MenuItem,
    Button
} from '@material-ui/core';
import {
    PackageIcon,
    PlusIcon,
    PencilIcon,
    XIcon,
    DotFillIcon,
    PersonIcon,
    MailIcon,
    CheckIcon
} from '@primer/octicons-react';
import Modal from '../shared/modal/Modal';
import './PeopleInvolved.css';
import {PEOPLE} from './TestData';

class PaperWork extends Component{
    constructor(props){
        super(props);
        this.state={
            data: PEOPLE,
            people:1,
            isModalOpen: false
        }
        this.RenderPeopleInvolved = this.RenderPeopleInvolved.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal(){
        if(this.state.isModalOpen === true){
            this.setState({isModalOpen: false})
        }
        else{
            this.setState({isModalOpen: true})
        }
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
                    <NavRail />
                    <Modal title="Invite people" modalWidth={600} visible={this.state.isModalOpen} dismissCallback={this.toggleModal}>
                        <Box marginTop={-3}>
                            <Typography style={{fontSize: 15}}>
                                Invite Someone to your transaction using thier E-mail ID
                            </Typography>
                        </Box>
                        <Grid container direction="row">
                            <Grid item>
                                <Box marginLeft={7} marginTop={3}>
                                    <PersonIcon size={90} />
                                </Box>
                                <Box marginLeft={0} marginTop={2}>
                                    <TextField variant='outlined' className='modal-name-field' size='small' label='Name'></TextField>
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box marginLeft={3} marginTop={3} style={{width:'100%'}}>
                                    <Grid container spacing={0} alignItems="center">
                                        <Grid item xs={1}>
                                            <MailIcon size={17}/>
                                        </Grid>
                                        <Grid xs={11}>
                                            <TextField fullWidth variant="outlined" size="small" className="modal-right-field" label="E-mail ID"></TextField>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={0} alignItems="center">
                                        <Grid item xs={1}>
                                            <MailIcon size={17}/>
                                        </Grid>
                                        <Grid xs={11}>
                                            <Select value='buyer' fullWidth variant="outlined" className="modal-right-field" style={{height: '40px', marginTop: '10px'}}>
                                                <MenuItem value='buyer'>Buyer</MenuItem>
                                            </Select>
                                        </Grid>
                                    </Grid>
                                    <Grid container justify="flex-end">
                                        <Box marginTop={2}>
                                            <Button variant='contained' style={{backgroundColor:'#150578', color:'white'}} startIcon={
                                                <CheckIcon size={20}/>}
                                            >Invite</Button>
                                        </Box>
                                    </Grid>
                                </Box>
                            </Grid>
                        </Grid>
                    </Modal>
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