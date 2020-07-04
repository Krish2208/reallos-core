import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Auth from './Authenticate';
import { FormGroup, FormControlLabel, TextField, Checkbox, Button, Fab } from '@material-ui/core';
import GoogleLogo from '../../assets/google-logo.svg';
import FacebookLogo from '../../assets/fb-logo.svg';
import Modal from '../shared/modal/Modal';
import './SignInModal.css';
import axios from 'axios';

class SignIn extends Component{
    constructor(props){
        super(props);
        this.state={
            email: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.loginUser = this.loginUser.bind(this);
    }

    handleChange(event){
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }

    loginUser(){
        axios.post('https://us-central1-reallos-test.cloudfunctions.net/api/login',{
            email: this.state.email,
            password: this.state.password
        })
        .then(response =>{
            localStorage.setItem('FBIdToken',response.data.token); // Getting the token and storing it in local storage
        })
        .catch(err =>{
            console.error(err);
        })
    }

    render(){
        return(<Modal title="Sign In" visible={this.props.visible} dismissCallback={this.props.dismissCallback}>
        <FormGroup>
            <div id="signin-modal-content">
                <TextField
                    className="input-item"
                    name="email"
                    label="Email"
                    variant="outlined"
                    onChange={this.handleChange}
                    value={this.state.email}
                />

                <TextField
                    className="input-item"
                    label="Password"
                    name="password"
                    variant="outlined"
                    type="password"
                    onChange={this.handleChange}
                    value ={this.state.password}
                />

                <div className="input-item flex-items">
                    <FormControlLabel
                        color="primary"
                        label="Remember me"
                        control={
                            <Checkbox
                                color="primary"
                                aria-label="Remember me"
                                title="Remember me"
                            />
                        }
                    />
                    <a href="#">Forgot Password?</a>
                </div>

                <Button
                    className="input-item"
                    color="primary"
                    variant="contained"
                    style={{'textTransform': 'none', 'fontSize': '18px'}}
                    onClick= {this.loginUser} >
                    Sign In
                </Button>
            </div>
        </FormGroup>

        <div className="or-separator">
            OR
        </div>

        <div id="social-login-container">
            <div className="social-login-btn">
                <Fab>
                    <img src={GoogleLogo} alt="Sign In with Google"/>
                </Fab>
            </div>
            <div className="social-login-btn">
                <Fab>
                    <img src={FacebookLogo} alt="Sign In with Facebook"/>
                </Fab>
            </div>
        </div>

        <div id="signup-link-footer">
            Don't have an account? &nbsp;
            <a href="#">Sign Up</a>
        </div>
    </Modal>
)
    }
}


export default SignIn;
