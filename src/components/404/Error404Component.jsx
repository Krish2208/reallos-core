import React from 'react';
import { Button } from '@material-ui/core';
import { ReactComponent as ReallosLogoLight } from '../../assets/reallos-logo-light.svg';
import './Error404Component.css';

class Error404Component extends React.Component {
    render() {
        return (
            <div className="root-404">
                <div className="error-code-404">
                    404
                </div>
                <div className="error-message-404">
                    <div className="error-message-404-sorry">
                        Sorry.
                    </div>

                    <div className="error-message-404-submsg">
                        We didn't get it!
                    </div>

                    <div className="error-message-404-verbose">
                        <div>
                            The page you are looking for is not here. You can try the following though:
                        </div>

                        <ul>
                            <li>Recheck the URL you entered.</li>
                            <li>Go back and try again</li>
                            <li>
                                <a href="#">Contact Us</a>
                            </li>
                        </ul>
                    </div>

                    <div className="error-message-404-prev-page-btn">
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => this.props.history.goBack()}
                        >
                            Jump back to previous page
                        </Button>
                    </div>
                </div>

                <ReallosLogoLight className="reallos-logo-404" />
            </div>
        )
    }
}

export default Error404Component;
