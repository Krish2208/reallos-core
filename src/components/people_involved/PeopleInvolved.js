import React, {Component} from 'react';
import NavBar from '../shared/navbar/navbar';
import NavRail from '../shared/navigation_rail/TransactionNavRail';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
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
    CheckIcon,
    VerifiedIcon
} from '@primer/octicons-react';
import Modal from '../shared/modal/Modal';
import './PeopleInvolved.css';
import {PEOPLE} from './TestData';

const mapStateToProps = (state)=>({
    transaction: state.transaction,
    user: state.user
});


class PaperWork extends Component{
    constructor(props){
        super(props);
        this.state={
            people:1,
            isModalOpen: false,
            activeTransaction: this.props.transaction.filter(transaction => transaction.active === true)[0], // Gets the active transaction that is open
            Name: '',
            Email: '',
            Role: '',

        }
        this.RenderPeopleInvolved = this.RenderPeopleInvolved.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    toggleModal(){
        if(this.state.isModalOpen === true){
            this.setState({
                isModalOpen: false,
                Name: '',
                Email: '',
                Role: ''
            })
        }
        else{
            this.setState({isModalOpen: true})
        }
    }

    handleChange(event){
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })    
    }

    RenderPeopleInvolved(){
        if(this.state.activeTransaction.People.length) // If there are people involved in the transaction
        {
            const card = this.state.activeTransaction.People.map((data) =>{
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
                                                <Avatar style={{backgroundColor: '#150578'}}>{data.Name[0]}</Avatar>
                                                )}
                                            </Box>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Box marginY={1}>
                                                <Typography style={{fontWeight:800}}>
                                                    {data.Name}
                                                    <span style={{paddingLeft: 12, fontWeight:200}}><DotFillIcon size={12}/></span>
                                                    <span style={{paddingLeft: 12, fontWeight:450, fontSize:15}}>{data.Role}</span>
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Box marginY={1}>
                                                {()=> (data.Accepted ? 'Invitation accepted' : 'Invitation pending')}
                                            </Box>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Box marginY={1} paddingRight={2}>
                                                <Typography align="right" style={{fontSize: 15}}>
                                                    {data.Email}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Box marginY={1}>
                                                {()=>(data.Accepted ? // The ternary operator is used to only render the cross for people that have not accepted the invitation
                                                (
                                                    <>
                                                    </>
                                                )
                                                :
                                                (
                                                    <IconButton style={{color:"#565656"}} >
                                                        <XIcon/>
                                                    </IconButton>
                                                ))}

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
        else
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
                                    <TextField variant='outlined' className='modal-name-field' size='small' label='Name' name="Name" onChange={this.handleChange} value={this.state.Name} />
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box marginLeft={3} marginTop={3} style={{width:'100%'}}>
                                    <Grid container spacing={0} alignItems="center">
                                        <Grid item xs={1}>
                                            <MailIcon size={17}/>
                                        </Grid>
                                        <Grid xs={11}>
                                            <TextField fullWidth variant="outlined" size="small" className="modal-right-field" label="Email" name="Email" value={this.state.Email} onChange={this.handleChange}></TextField>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={0} alignItems="center">
                                        <Grid item xs={1}>
                                            <VerifiedIcon size={17}/>
                                        </Grid>
                                        <Grid xs={11}>
                                            <Select value={this.state.Role} fullWidth variant="outlined" label="Role" name="Role" onChange={this.handleChange} className="modal-right-field" style={{height: '40px', marginTop: '10px'}}>
                                                <MenuItem value='Buyer'>Buyer</MenuItem>
                                                <MenuItem value='Seller'>Seller</MenuItem>
                                                <MenuItem value='Buyer Agent'>Buyer Agent</MenuItem>
                                                <MenuItem value='Seller Agent'>Seller Agent</MenuItem>
                                                <MenuItem value='Buyer'>Home Inspector</MenuItem>
                                                <MenuItem value='Home Inspector'>Title Agent</MenuItem>
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

export default connect(mapStateToProps)(PaperWork);