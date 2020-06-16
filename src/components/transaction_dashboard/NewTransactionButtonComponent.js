import React from 'react';
import './Transaction.css';
//Have to add a modal for the new tranaction here itself

function NewTransactionButton(props) {
    return(
        <div id="transaction-dashboard-container">
            <button type="button" className="btn btn-outline-primary btn-lg">+  New Transaction</button>
        </div>
    );
}

export default NewTransactionButton;