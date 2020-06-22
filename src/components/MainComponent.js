import React from 'react';
import TransactionDashbaord from "./transaction_dashboard/TransactionDasboardComponent";
import TransactionAssist from './transaction_assist/TransactionAssistComponent';
import PaperWork from './paperwork/PaperWorkComponent';
import DummyPage from "./dummy/DummyPage";
import PeopleInvolved from "./people_involved/PeopleInvolved"
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

function Main(props) {
    // All the routes must be configured here

    return(
        <div>
            <Switch>
                <Route path="/dummy" component={DummyPage} />
                <Route path="/transaction" component={TransactionDashbaord} />
                <Route path="/transaction_assist" component ={TransactionAssist} />
                <Route path="/paperwork" component={PaperWork} />
                <Route path="/people" component={PeopleInvolved} />
                <Redirect to="/dummy" />
            </Switch>
        </div>
    );
}

export default withRouter(Main);
