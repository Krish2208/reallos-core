import React ,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { addTodo, deleteTodo } from '../../actions/todoActions';

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
            name: ''
        }
        this.RenderToDo = this.RenderToDo.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
                        <button onClick={()=>this.props.deleteTodo(todo.name)}>delete</button>
                        <li>{todo.name}</li>
                        </>
                    ))}
                </div>
            );
        }
    }

    handleChange(event){ // for handling the form
        this.setState({name:event.target.value})
    }

    render(){
        return(
            <div>
                <this.RenderToDo />
                    <input type="text" value={this.state.name} onChange={this.handleChange}/>
                    <button onClick={()=>this.props.addTodo(this.state.name)}>Add</button>
            </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Todo);