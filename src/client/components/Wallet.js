import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Wallet extends Component {
    constructor(props) {
        super(props);

        this.renderWalletAmount = this.renderWalletAmount.bind(this);
    }

    renderWalletAmount() {
        if(this.props.wallet) {
            return (
                <div style={{padding: '5px'}}>
                    <span>Balance: </span>
                    <span>{this.props.wallet.balance}</span>
                </div>
            )
        }
        return <span> Loading... </span>
    }

    render() {
        return (
            <div>
                { this.renderWalletAmount() }
                <Link className='btn waves-effect waves-light' to="/payment">Add funds</Link>
            </div>
        )
    }
}



export default Wallet

