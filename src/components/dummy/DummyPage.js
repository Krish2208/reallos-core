import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clearErrors } from '../../actions/utilsActions';
import { Button, Checkbox, FormControlLabel, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import SignIn from '../account/SignInModal';
import SignUpModal from '../account/SignUpModal';
import SideDrawer from '../shared/drawer/SideDrawer';
import ReallosLogo from '../../assets/reallos-logo.svg';
import './DummyPage.css';


const mapStateToProps = (state) =>({
    utils: state.utils
});

const mapDispatchToProps = (dispatch) =>{
    return bindActionCreators({
        clearErrors
    },dispatch);
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

function DummyPage(props) {

    let [signInModalVisible, setSignInModalVisibility] = useState(false);
    let [signUpModalVisible, setSignUpModalVisibility] = useState(false);
    let [sideDrawerVisible, setSideDrawerVisibility] = useState(false);
    let [isSideDrawerLeftSide, setSideDrawerLeftSide] = useState(false);

      const handleClose = () => {
          props.clearErrors(); // dispatching an action to clear the errors
      };
    return (
        <>
        {props.utils.Errors === null ? <></> 
        : 
        <Snackbar open={true} autoHideDuration={60000} onClose={handleClose} >
            <Alert severity="warning" onClose={handleClose}> 
                {props.utils.Errors}
            </Alert>
        </Snackbar>
        }
            <div id="dummy-page-container">
                <img src={ReallosLogo} alt="Reallos" />
                {/* Link to transactio dashboard */}
                <Link to="/transaction">Transaction Dashboard link</Link>

                <Button variant="contained" onClick={() => setSignInModalVisibility(true)}>
                    Sign In
                </Button>

                <Button variant="contained" onClick={() => setSignUpModalVisibility(true)}>
                    Sign Up
                </Button>

                <Button variant="contained" onClick={() => setSideDrawerVisibility(true)}>
                    Show Side Drawer
                </Button>

                <FormControlLabel
                    label="Left Side Drawer"
                    control={
                        <Checkbox
                            color="primary"
                            checked={isSideDrawerLeftSide}
                            onClick={() => setSideDrawerLeftSide(!isSideDrawerLeftSide)}
                        />
                    }
                />
            </div>

            <SignIn
                visible={signInModalVisible}
                dismissCallback={() => setSignInModalVisibility(false)}
            />

            <SignUpModal
                visible={signUpModalVisible}
                dismissCallback={() => setSignUpModalVisibility(false)}
            />
            <SideDrawer
                title="Hello"
                visible={sideDrawerVisible}
                dismissCallback={() => setSideDrawerVisibility(false)}
                side={isSideDrawerLeftSide ? "left" : "right"}
            >
                Click outside this drawer to close.

                <div style={{position: "absolute", bottom: 20, left: 20}}>
                    <Button
                        color="primary"
                        onClick={() => setSideDrawerVisibility(false)}
                    >
                        Click me to Close
                    </Button>
                </div>
            </SideDrawer>
        </>
    );
}

export default connect(mapStateToProps,mapDispatchToProps)(DummyPage);
