import React from 'react';
import './Transaction.css';
//Have to add a modal for the new tranaction here itself

function NewTransactionButton(props){
    return(
        <>
        <button type="button" className="btn btn-outline-primary btn-lg">+  New Transaction</button>
        </>
    );
}

export default NewTransactionButton;