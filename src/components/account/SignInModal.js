import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import Auth from './Authenticate';
import { FormGroup, FormControlLabel, TextField, Checkbox, Button, Fab } from '@material-ui/core';
import GoogleLogo from '../../assets/google-logo.svg';
import FacebookLogo from '../../assets/fb-logo.svg';
import Modal from '../shared/modal/Modal';
import './SignInModal.css';

function SignIn({ visible, dismissCallback }) {
    const [authenticated, authenticate] = useState(Auth.getAuth());
    if(authenticated === true){
        return(
            <Redirect to="/transaction" />
        )
    }
    else{
        return (
            <Modal title="Sign In" visible={visible} dismissCallback={dismissCallback}>
                <FormGroup>
                    <div id="signin-modal-content">
                        <TextField
                            className="input-item"
                            label="Email"
                            variant="outlined"
                        />

                        <TextField
                            className="input-item"
                            label="Password"
                            variant="outlined"
                            type="password"
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
                            onClick = {()=>
                                    setTimeout(()=>{
                                        Auth.authenticate(); authenticate(Auth.getAuth())
                                    },200)
                                }
                        >
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
        );
    }
}

export default SignIn;
