import React from 'react';
import TransactionDashbaord from "./transaction_dashboard/TransactionDasboardComponent";
import {Switch, Route, Redirect, WithRouter, withRouter} from 'react-router-dom';

function Main(props){
    // All the routes must be configured here 
    return(
        <div>
            {/* Routing Added*/}
            <Switch>
                <Route path="/transaction" component={TransactionDashbaord} />
                <Redirect to="/transaction"/>
            </Switch>
        </div>
    );
}

export default withRouter(Main);