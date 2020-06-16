import React from 'react';
import NewTransactionButton from './NewTransactionButtonComponent';
import TranactionEmptyIllustration from '../../assets/transaction-empty.png';
import './Transaction.css';

function RenderTransactionBody({transactions}){ //Rendering the transaction page here
    if(transactions!=null){ //If no transactions exist
        return(
            <div>
            </div>
        );
    }
    else{ //If transactions exist
        return(
            <div id="transaction-dashboard-container">
                <div className="row justify-content-center row-header ">
                    <div className="col-6 offset-1">
                        <img src={TranactionEmptyIllustration} />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <h2 className="col-5 offset-1">Feels empty here...</h2>
                </div>
                <div className="row justify-content-center">
                    <p className="col-6">Seems like you have not made any transactions. Click "New Transaction" to add a new transaction.</p>
                </div>
            </div>
        );
    }
}


function TransactionDasboard(props){
    return(
        <body>
        <div className="container">
            <div clasName="row">
                {/* Serach bar goes here*/}
            </div>

            <div className="row row-header">
                <div className="col-3">
                    <h2>My Transaction</h2>
                </div>
            </div>

             <RenderTransactionBody transactions={props.transactions} />

             <div className="row row-header justify-content-end">
                 <div className="col-4">
                     <NewTransactionButton />
                 </div>
             </div>
        </div>
        </body>
    );
}

export default TransactionDasboard;