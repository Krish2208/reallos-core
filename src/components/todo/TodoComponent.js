import React ,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { addTodo, deleteTodo } from '../../actions/todoActions';
import {
    Container,
    Grid,
    Fab,
    FormGroup,
    TextField,
    Button,
    Typography,
    Select,
    MenuItem
} from '@material-ui/core';

import {
    PlusIcon, TagIcon, PencilIcon, CalendarIcon, PeopleIcon, PersonIcon, CheckIcon
} from '@primer/octicons-react';
import SideDrawer from '../shared/drawer/SideDrawer';
import NavBar from '../shared/navbar/navbar';
import MiniDrawer from '../shared/TransactionDrawerComponent'; 
import './Todo.css';

const mapStateToProps = (state)=>{ // mapping the state of the store to the props of the component
    return({
        todo: state.todo
    });
}

const mapDispatchToProps = (dispatch)=>{ // This is to map the actions to the props of the component
    return bindActionCreators({
        addTodo,
        deleteTodo
    },dispatch);
}

class Todo extends Component{
    constructor(props){
        super(props);
        this.state={
            isNewTaskFormOpen: false,
            title: '',
            description:'',
            date: '',
            to: ''
        }
        this.RenderToDo = this.RenderToDo.bind(this);
        this.toggleNewTaskForm = this.toggleNewTaskForm.bind(this); // binding it to the particular instance of the class
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handlleDescriptionChange = this.handlleDescriptionChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleAssignChange = this.handleAssignChange.bind(this);
        this.cancelAddTask = this.cancelAddTask.bind(this);
        this.addNewTask = this.addNewTask.bind(this);
    }

    RenderToDo(){
        if(this.props.todo === null){ // If no todo exists in the server
            return(
                <p>No todo found</p>
            );
        }
        else{
            return(
                <div>
                    <h1>Tasks</h1>
                    {this.props.todo.map((todo)=>(
                        <>
                        <p>{todo.title} {todo.description} {todo.date} {todo.to}</p>
                        <button onClick={()=>this.props.deleteTodo(todo.title)}>delete</button>
                        </>
                    ))}
                </div>
            );
        }
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

    handleTitleChange(event){ // for handling the change in the title 
        this.setState({title:event.target.value})
    }
    handlleDescriptionChange(event){ // for handling the change in the description
        this.setState({description:event.target.value})
    }
    handleDateChange(event){ // for handling the change in the date
        this.setState({date: event.target.value})
    }
    handleAssignChange(event){ // for handling the change in the Assigned Person
        this.setState({to:event.target.value})
    }

    cancelAddTask(){ // To cancel the task and set the values of the fields to null
        this.setState({
            title:'',
            description:'',
            date:'',
            to:'',
            isNewTaskFormOpen:false
        });
    }

    addNewTask(){ // Adding new task to the redux store
        this.props.addTodo(this.state.title,this.state.description,this.state.date,this.state.to);
        this.setState({
            title:'',
            description:'',
            date:'',
            to:'',
            isNewTaskFormOpen:false
        });
    }

    render(){
        return(
            <Container>
                <NavBar />
                <MiniDrawer />

                <SideDrawer visible={this.state.isNewTaskFormOpen} side="right" dismissCallback={this.toggleNewTaskForm} title="Add a Task">
                    <Typography className="sub-heading-task-form">
                        What is the task about?
                    </Typography>
                    <FormGroup row className="form-group">
                        <TagIcon size={30} className="tag-icon"/>
                        <TextField variant="outlined" label="title" className="form-fields" value={this.state.title} onChange={this.handleTitleChange}/>
                    </FormGroup>
                    <FormGroup row className="form-group">
                        <PencilIcon size={30} className="tag-icon"/>
                        <TextField variant="outlined" label="description" className="form-fields"
                        value={this.state.description}
                        multiline
                        rows={8} onChange={this.handlleDescriptionChange}/>
                    </FormGroup>
                    <FormGroup row className="form-group">
                        <CalendarIcon size={30} className="tag-icon"/>
                        <TextField variant="outlined" type="date" className="form-fields" value={this.state.date} onChange={this.handleDateChange}/>
                    </FormGroup>
                    <Typography className="sub-heading-task-form-2">
                        Assign to Someone
                    </Typography>
                    <FormGroup row className="form-group">
                        <PersonIcon size={30} className="tag-icon" />
                        <Select id="person_select" label="Select a person" className="form-fields" onChange={this.handleAssignChange} value={this.state.to}>
                            <MenuItem value="person_1">Person 1</MenuItem>
                            <MenuItem value="person_2">Person 2</MenuItem>
                        </Select>
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