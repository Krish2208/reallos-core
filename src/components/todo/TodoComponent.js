import React ,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { addTodo, deleteTodo, editTodo } from '../../actions/todoActions';
import {
    Container,
    Grid,
    Fab,
    FormGroup,
    TextField,
    Button,
    Typography,
    Select,
    MenuItem,
    Card,
    Box,
    IconButton,
    Avatar
} from '@material-ui/core';

import {
    PlusIcon, TagIcon, PencilIcon, CalendarIcon, PeopleIcon, PersonIcon, CheckIcon, XIcon, AlertIcon, ArrowRightIcon
} from '@primer/octicons-react';
import SideDrawer from '../shared/drawer/SideDrawer';
import NavBar from '../shared/navbar/navbar';
import NavRail from '../shared/navigation_rail/TransactionNavRail'; 
import SearchBar from '../shared/searchbar/SearchBarComponent';
import './Todo.css';
import Modal from '../shared/modal/Modal'

const mapStateToProps = (state)=>{ // mapping the state of the store to the props of the component
    return({
        todo: state.todo,
        transaction: state.transaction,
        user: state.user
    });
}

const mapDispatchToProps = (dispatch)=>{ // This is to map the actions to the props of the component
    return bindActionCreators({
        addTodo,
        deleteTodo,
        editTodo
    },dispatch);
}

class Todo extends Component{
    constructor(props){
        super(props);
        this.state={
            isNewTaskFormOpen: false,
            isModalOpen: false, // To make sure the task modal is open or not
            title: '',
            description:'',
            date: '',
            to: null,
            to_Person: null, // js object that contains the person object
            todo: null,
            expandedTask:{
                title: '',
                description: '',
                date: '',
                to: {},
                from: {}
            }
        }
        
        this.RenderToDo = this.RenderToDo.bind(this);
        this.toggleNewTaskForm = this.toggleNewTaskForm.bind(this); // binding it to the particular instance of the class
        this.handleChange = this.handleChange.bind(this);
        this.cancelAddTask = this.cancelAddTask.bind(this);
        this.addNewTask = this.addNewTask.bind(this);
        this.editTask = this.editTask.bind(this);
        this.RenderToDoModal = this.RenderToDoModal.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.expandTask = this.expandTask.bind(this);
    }

    RenderToDo(){
        let transId = this.props.transaction.filter(transaction => transaction.active === true)[0].id; // getting the id of the active transaction
        let todos = this.props.todo.filter(todo=> todo.Transaction_id === transId); // Gettting only those todos that are part of that transaction
        if(todos.length === 0){ // If no todo exists in the server || have to replace this with an image
            return(
                <Box style={{width:'100%'}}>
                    <Box paddingLeft={5}>
                        <h1>Tasks</h1>
                    </Box>
                    <Grid container justify='center'>
                        <Box marginTop={5}>
                            <img src={require('../../assets/no-todo.png')} style={{width: '500px'}}/>
                        </Box>
                    </Grid>
                </Box>
            );
        }
        else{
            return(
                <div>
                    <Box paddingLeft={5}>
                    <h1>Tasks</h1>
                    <SearchBar />
                    {todos.map((todo)=>(
                    <Box component="div" marginTop={2}>
                        <Card elevation={3}>
                            <Grid container direction="row" alignItems="center" justify="space-around" spacing={1}>
                                <div onClick={()=>this.expandTask(todo)} style={{ width: '91.6%', cursor: 'pointer', marginTop: '5px', marginBottom: '5px' }}>
                                    <Grid container direction="row" alignItems="center" justify="space-around" spacing={1}>
                                        <Grid item>
                                            <Box paddingLeft={2}>
                                                <AlertIcon className='alert-color' size={20} />
                                            </Box>
                                        </Grid>
                                        <Grid item>
                                            <Box marginY={2}>
                                             { todo.From.img ? 
                                                (
                                                    <Avatar src={process.env.PUBLIC_URL + todo.From.img}></Avatar>
                                                    ) : (
                                                    <Avatar style={{backgroundColor: '#150578'}}>{todo.From.Name[0]}</Avatar>
                                                )
                                            }
                                            </Box>
                                        </Grid>
                                        <Grid item>
                                            <ArrowRightIcon size={24} />
                                        </Grid>
                                        <Grid item>
                                            <Box marginY={2}>
                                            { todo.To.img ? 
                                                (
                                                    <Avatar src={process.env.PUBLIC_URL + todo.to.img}></Avatar>
                                                    ) : (
                                                    <Avatar style={{backgroundColor: '#150578'}}>{todo.To.Name[0]}</Avatar>
                                                )
                                            }
                                            </Box>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography noWrap align='center' style={{ color: '#150578', fontWeight: 800, fontSize: '20px' }}>
                                                {todo.Title}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={5}>
                                            <Box textOverflow="ellipsis">
                                                <Typography noWrap align='center' style={{ color: '#150578', fontWeight: 500, fontSize: '17px' }}>
                                                    {todo.Description}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Typography align='left' style={{ color: '#150578', fontSize: '16px' }}>
                                                {todo.Date}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </div>
                                <Grid item xs={1}>
                                    { 
                                        todo.From.id === this.props.user.id ? (  // ternary operator used to make sure only the person assiging the task has the right to edit it
                                            <>
                                            <IconButton onClick={()=>this.editTask(todo)}><PencilIcon /></IconButton>
                                            <IconButton onClick={()=>this.props.deleteTodo(todo.id)}><XIcon /></IconButton>
                                            </>
                                        ):(
                                            <>
                                             <IconButton onClick={()=>this.props.deleteTodo(todo.id)}><XIcon /></IconButton>
                                            </>
                                        )
                                    }
                                </Grid>       
                            </Grid> 
                        </Card>
                    </Box>
                    ))}
                    </Box>
                </div>
            );
        }
    }

    RenderToDoModal(){ // function to render the modal
        return(
            <Modal title={this.state.expandedTask.title} modalWidth={750} visible={this.state.isModalOpen} dismissCallback={this.toggleModal}> 
                <Grid direction="column" container spacing={1} justify="flex-start">
                    <Grid item>
                        <Box className="alert-color">
                            <table>
                                <tr>
                                    <td><AlertIcon/></td>
                                    <td style={{paddingLeft: '10px', paddingTop: '4px'}}>This Task is going to hit the deadline soon!</td>
                                </tr>
                            </table>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box marginTop={2}>
                            <Typography align="justify">
                                {this.state.expandedTask.description}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box marginTop={1}>
                            <Typography style={{fontWeight:800}}>
                                <table>
                                    <tr>
                                        <td><CalendarIcon/></td>
                                        <td style={{paddingLeft: '10px', paddingTop: '4px'}}>{this.state.expandedTask.date}</td>
                                    </tr>
                                </table>
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box marginTop={2}>
                            <table>
                                <tr>
                                    <td>
                                    { this.state.expandedTask.to.img ? 
                                    (
                                        <Avatar src={process.env.PUBLIC_URL + this.state.expandedTask.to.img}></Avatar>
                                        ) : (
                                        <Avatar style={{backgroundColor: '#150578'}}>{this.state.expandedTask.to.Name ? (this.state.expandedTask.to.Name[0]) : (<></>)}</Avatar>
                                    )}
                                    </td>
                                    <td style={{paddingLeft:'15px'}}>Assigned to <strong>{this.state.expandedTask.to.Name}</strong></td>
                                </tr>
                                <tr>
                                    <td style={{paddingTop:'10px'}}>
                                    { this.state.expandedTask.from.img ? 
                                    (
                                        <Avatar src={process.env.PUBLIC_URL + this.state.expandedTask.from.img}></Avatar>
                                        ) : (
                                        <Avatar style={{backgroundColor: '#150578'}}>{this.state.expandedTask.from.Name ? (this.state.expandedTask.from.Name[0]) : (<></>)}</Avatar>
                                    )}
                                    </td>
                                    <td style={{paddingLeft:'15px',paddingTop:'10px'}}>Assigned by <strong>{this.state.expandedTask.from.Name}</strong></td> {/* This field should be edited with the user's name */}
                                </tr>
                            </table>
                        </Box>
                    </Grid>
                </Grid>
            </Modal>
        );
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    toggleNewTaskForm(){ // to toggle the new task form
        if(this.state.isNewTaskFormOpen === true){
            this.setState({
                isNewTaskFormOpen: false
            });
        }
        else{
            this.setState({
                isNewTaskFormOpen: true
            });
        }
    }

    handleChange(event){
        const {name, value} = event.target;
            this.setState({
                [name]: value
        });
    }

    cancelAddTask(){ // To cancel the task and set the values of the fields to null
        this.setState({
            title:'',
            description:'',
            date:'',
            to: null,
            isNewTaskFormOpen:false,
            todo: null
        });
    }

    addNewTask(){ // Adding new task to the redux store
        if(this.state.todo != null){
            let todo = this.state.todo;
            this.props.editTodo(todo.id, this.state.title, this.state.description, this.state.date,this.state.to);
            this.setState({
                title:'',
                description:'',
                date:'',
                to: null,
                todo: null,
                isNewTaskFormOpen:false
            });
        }
        else{
            let transId = this.props.transaction.filter(transaction => transaction.active === true)[0].id; // Getting the id of the active transaction
            this.props.addTodo(transId,this.state.title, this.state.description, this.state.date,this.state.to,this.props.user); 
            this.setState({
                title:'',
                description:'',
                date:'',
                to: null,
                isNewTaskFormOpen:false
            });
        }
    }

    editTask(todo){ // Editing task that already exist
        this.setState({
            title: todo.Title,
            description: todo.Description,
            date: todo.Date,
            to: todo.To,
            isNewTaskFormOpen:true,
            todo: todo
        });
    }

    expandTask(todo){ // opens the modal for that particular task
        this.setState({
            expandedTask:{
                title: todo.Title,
                description: todo.Description,
                date: todo.Date,
                to: todo.To,
                from: todo.From
            }
        });
        this.toggleModal();
    }

    render(){
        return(
            <Container>
                <NavBar />
                <NavRail />
                <this.RenderToDoModal/>
                <SideDrawer visible={this.state.isNewTaskFormOpen} side="right" dismissCallback={this.toggleNewTaskForm} title="Add a Task">
                    <Typography className="sub-heading-task-form">
                        What is the task about?
                    </Typography>
                    <FormGroup row className="form-group">
                        <TagIcon size={30} className="tag-icon"/>
                        <TextField variant="outlined" label="title" className="form-fields" value={this.state.title} name="title" onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup row className="form-group">
                        <PencilIcon size={30} className="tag-icon"/>
                        <TextField variant="outlined" label="description" className="form-fields"
                        value={this.state.description}
                        multiline
                        name="description"
                        rows={8} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup row className="form-group">
                        <CalendarIcon size={30} className="tag-icon"/>
                        <TextField variant="outlined" type="date" className="form-fields" value={this.state.date} onChange={this.handleChange} name="date"/>
                    </FormGroup>
                    <Typography className="sub-heading-task-form-2">
                        Assign to Someone
                    </Typography>
                    <FormGroup row className="form-group">
                        <PersonIcon size={30} className="tag-icon" />
                        {
                            // Checking to see if the people dropdown should be disabled or not
                            this.props.transaction.filter(transaction=>transaction.active === true)[0].People.length ? (
                                <Select id="person_select" label="Select a person" className="form-fields" onChange={this.handleChange} value={this.state.to} name="to">
                                    {this.props.transaction.filter(transaction=>transaction.active === true)[0].People.map((person)=>(
                                        <MenuItem value={person}>{person.Name}</MenuItem>
                                    ))}
                                </Select>
                            )
                            :
                            (
                                <Select className="form-fields" disabled="true" />
                            )
                        }
                    </FormGroup>
                    <Grid container direction="row" justify="flex-end">
                        <Grid item>
                            <Grid container direction="row" spacing={2}>
                                <Grid item>
                                <Button variant="outlined" onClick={this.cancelAddTask} className="cancel-back-button">cancel</Button>
                                </Grid>
                                <Grid item>
                                <Button variant="contained" onClick={this.addNewTask} diabled className="next-button">
                                    <CheckIcon /> &nbsp;
                                    Add Task
                                </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </SideDrawer>
                <this.RenderToDo />
                <Grid direction="row" justify="flex-end" alignItems="flex-end">
                    <Grid item>
                        <Fab
                            variant="extended"
                            className="reallos-fab"
                            size="large"
                            onClick={this.toggleNewTaskForm}
                        >
                            <PlusIcon className="fab-icon" size={20} /> &nbsp;
                            New Task
                        </Fab>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Todo);