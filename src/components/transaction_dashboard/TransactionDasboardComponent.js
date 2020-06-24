import React, {Component} from "react";
import "./Transaction.css";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import NewTransactionButton from "./NewTransactionButtonComponent";
import NavBar from "../shared/navbar/navbar";
import SearchBar from "../shared/searchbar/SearchBarComponent";
import TransactionCardGroup from "./TransactionCardGroup";
import {connect} from 'react-redux';
import {fetchTransaction} from '../../actions/transactionActions';
import {bindActionCreators} from 'redux';

const mapStateToProps = (state)=>({
  user: state.user,
  transaction: state.transaction
});

const mapDispatchToProps = (dispatch)=>{
  return bindActionCreators({
    fetchTransaction
  },dispatch);
}

class TransactionDasboard extends Component{

  constructor(props){
    super(props);
    this.RenderTransactionBody = this.RenderTransactionBody.bind(this);
  }

  componentDidMount(){ // Component did mount is used to fetch the transactions of the user form the redux store
    if(this.props.user.id != null) // if the user id is not null
    this.props.fetchTransaction(this.props.user.id); // dispatching the action to fetch the transactions that belong to the user from the store
  }


  RenderTransactionBody({transaction}) { // Function to render the various transactions that belong to the user
    if (transaction && transaction.length) {
      //If transactions exist
      return (
        <>
          <Grid container direction="row" justify="center" alignItems="center">
            <SearchBar />
          </Grid>
          <TransactionCardGroup transaction={transaction}/>
        </>
      );
    } else {
      //If no transactions exist
      return (
        <>
          <Grid container direction="row" justify="center" alignItems="center">
            <img
              src={require("../../assets/transaction-empty.png")}
              alt=""
              className="no-transasction-default-img"
            />
          </Grid>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
          >
            <Grid item>
              <Box
                component="h2"
                className="header-transaction"
                style={{ marginBottom: "50px" }}
              >
                Feels empty here...
              </Box>
            </Grid>
            <Grid item>
              <Box component="p" m={-2} className="body-text">
                Seems like you have not made any transactions.
              </Box>
            </Grid>
            <Grid item>
              <Box component="p" className="body-text">
                Click <strong>"New Transaction"</strong> to add a new transaction.
              </Box>
            </Grid>
          </Grid>
        </>
      );
    }
  }


  render(){
  //console.log(this.props.user); // To log the fact the user data that is stored during signup is available here
  //console.log(this.props.transaction); // To log the transaction state after fetching it from the user
    return (
      <Box component="div">
        <Container>
          <NavBar />
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            className="row-header"
          >
            <h2 className="header-transaction">My Transactions</h2>
          </Grid>
          <this.RenderTransactionBody transaction = {this.props.transaction}/>
          <Grid container direction="row" justify="flex-end" alignitems="center">
            <Box component="div" m={-2}>
              <NewTransactionButton />
            </Box>
          </Grid>
        </Container>
      </Box>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(TransactionDasboard);
