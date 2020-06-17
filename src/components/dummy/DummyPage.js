import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import SignIn from '../account/SignInModal';
import ReallosLogo from '../../assets/reallos-logo.svg';
import './DummyPage.css';

function DummyPage() {
    let [signInModalVisible, setSignInModalVisibility] = useState(false);
    
    return (
        <>
            <div id="dummy-page-container">
                <img src={ReallosLogo} alt="Reallos" />

                <Button variant="contained" onClick={() => setSignInModalVisibility(true)}>
                    Sign In
                </Button>
            </div>

            <SignIn
                visible={signInModalVisible}
                dismissCallback={() => setSignInModalVisibility(false)}
            />
        </>
    );
}

export default DummyPage;
