import React from "react";
import TransactionDashbaord from "./transaction_dashboard/TransactionDasboardComponent";
import TransactionAssist from "./transaction_assist/TransactionAssistComponent";
import PaperWork from "./paperwork/PaperWork";
import PaperworkViewer from "./paperwork/PaperworkViewer";
import DummyPage from "./dummy/DummyPage";
import PeopleInvolved from "./people_involved/PeopleInvolved";
import Todo from "./todo/TodoComponent";
import DiscussionsMain from "./discussions/DiscussionsMain/DiscussionsMain";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Auth from "./account/Authenticate";


const PrivateRoute = (
  { component: Component, ...rest } // Component that protects all the routing if the user is not autenticated
) => (
  <Route
    {...rest}
    render={(props) =>
      Auth.getAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/" }} />
      )
    }
  />
);

function Main(props) {
  // All the routes must be configured here

  return (
    <div>
      <Switch>
        <Route path="/dummy" component={DummyPage} />
        <PrivateRoute path="/transaction" component={TransactionDashbaord} />
        <PrivateRoute path="/assist" component={TransactionAssist} />
        <PrivateRoute path="/paperwork/*" component={PaperworkViewer} />
        <PrivateRoute path="/paperwork" component={PaperWork} />
        <PrivateRoute path="/people" component={PeopleInvolved} />
        <PrivateRoute path="/todo" component={Todo} />
        <PrivateRoute path="/discussions" component={DiscussionsMain} />
        <Redirect to="/dummy" />
      </Switch>
    </div>
  );
}

export default withRouter(Main);
