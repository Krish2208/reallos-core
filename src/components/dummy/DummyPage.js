import React, { useState } from 'react';
import { Button, Checkbox, FormControlLabel } from '@material-ui/core';
import SignIn from '../account/SignInModal';
import SignUpModal from '../account/SignUpModal';
import SideDrawer from '../shared/drawer/SideDrawer';
import ReallosLogo from '../../assets/reallos-logo.svg';
import './DummyPage.css';

function DummyPage() {
    let [signInModalVisible, setSignInModalVisibility] = useState(false);
    let [signUpModalVisible, setSignUpModalVisibility] = useState(false);
    let [sideDrawerVisible, setSideDrawerVisibility] = useState(false);
    let [isSideDrawerLeftSide, setSideDrawerLeftSide] = useState(false);

    return (
        <>
            <div id="dummy-page-container">
                <img src={ReallosLogo} alt="Reallos" />

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

export default DummyPage;
