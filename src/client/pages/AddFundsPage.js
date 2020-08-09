import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getWallet, updateWallet } from "../actions";

class AddFundsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            wallet: {},
            name: '',
            creditCardNumber: '',
            month: '',
            year: '',
            cvv: '',
            amount: '',
            errors: {}
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.clearFields = this.clearFields.bind(this);
        this.formValidation = this.formValidation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({
            wallet: { ...this.props.wallet }
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.wallet !== prevProps.wallet) {
            this.setState({
                wallet: { ...this.props.wallet }
            })
        }
    }

    onInputChange(e) {
        e.preventDefault();
        let stateKey = e.target.id;
        let stateKeyValue = e.target.value;

        return this.setState({
            [stateKey]: stateKeyValue.toString()
        });
    }

    clearFields() {
        this.setState({
            wallet: {},
            name: '',
            creditCardNumber: '',
            month: '',
            year: '',
            cvv: '',
            amount: '',
            errors: {}
        })
    }

    formValidation() {
        let fields = this.state;
        let formIsValid = true;
        let errors = {};
        let today = new Date();
        let currentYear = today.getFullYear();
        let currentMonth = today.getMonth() + 1;

        if(fields['name'].length <= 0) {
            formIsValid = false;
            errors.name = 'Incorrect name'
        } else {
            errors.name = '';
        }


        if(fields['creditCardNumber'].length < 16 || fields['creditCardNumber'].length > 16) {
            formIsValid = false;
            errors.creditCardNumber = 'Invalid credit card number';
        } else {
            errors.creditCardNumber = '';
        }

        if(fields['month'].length === 0 || fields['month'].length > 2 || parseInt(fields['month']) > 12 || parseInt(fields['month']) < currentMonth) {
            formIsValid = false;
            errors.month = 'Invalid month';
        } else {
            errors.month = ''
        }

        if(fields['year'].length === 0 || fields['year'].length > 4 || parseInt(fields['year']) < currentYear) {
            formIsValid = false;
            errors.year = 'Invalid year';
        } else {
            errors.year = '';
        }

        if(fields['cvv'].length < 3 || fields['cvv'].length > 3 || parseInt(fields['cvv']) < 100 || parseInt(fields['cvv']) > 999) {
            formIsValid = false;
            errors.cvv = 'Invalid CVV code'
        } else {
            errors.cvv = ''
        }

        if(!fields['amount'] || parseInt(fields['amount']) === 0) {
            formIsValid = false;
            errors.amount = 'Please enter an amount bigger than 0'
        } else {
            errors.amount = ''
        }

        this.setState({ errors });
        return formIsValid;
    }

    handleSubmit(e) {
        e.preventDefault();
        if(!this.formValidation()){ return; }

        let wallet = { ...this.state.wallet };
        wallet.balance += parseInt(this.state.amount);
        this.props.updateWallet(wallet).then(() => {
            this.props.getWallet();
        }, (err) => {
            console.log('There was an error updating the wallet', err);
        })
    }

    render() {
        return (
            <div className="container center-align" style={{'padding-top' :'50px', width: '25%'}}>
                <div>
                    <span>Current wallet amount: </span>
                    <span>{this.state.wallet.balance}</span>
                </div>
                <form className='center-align col s2' onSubmit={this.handleSubmit}>
                    <div className='row'>
                        <label className='right' htmlFor='name'>Name:</label>
                        <input className="input-field col s12" id='name' value={this.state.name}
                               onChange={ this.onInputChange } type='text'/>
                               <span style={{color: "red", float: 'left'}}>{this.state.errors.name}</span>
                    </div>
                    <div className='row'>
                        <label className='right' htmlFor='creditCardNumber'>Credit card:</label>
                        <input className="input-field col s12" id='creditCardNumber' value={this.state.creditCardNumber}
                               onChange={ this.onInputChange } type='number' minLength={16} maxLength={16}/>
                        <span style={{color: "red", float: 'left'}}>{this.state.errors.creditCardNumber}</span>
                    </div>
                    <div className='row center'>
                        <label className='right' htmlFor='month'>Month:</label>
                        <input className="input-field col s12 right" id='month' value={this.state.month}
                               onChange={ this.onInputChange } type='number' maxLength='2' />
                        <span style={{color: "red", float: 'left'}}>{this.state.errors.month}</span>
                        <label className='right' htmlFor='year' >Year:</label>
                        <input className="input-field col s12 right" id='year' value={this.state.year}
                               onChange={ this.onInputChange } type='number' maxLength='4' />
                        <span style={{color: "red", float: 'left'}}>{this.state.errors.year}</span>
                    </div>
                    <div className='row'>
                        <label className="right" htmlFor='cvv'>CVV:</label>
                        <input className="input-field col s12 right" id='cvv' value={this.state.cvv}
                               onChange={ this.onInputChange } type="number" inputMode="numeric"/>
                        <span style={{color: "red", float: 'left'}}>{this.state.errors.cvv}</span>
                    </div>
                    <div className='row'>
                        <label className='right' htmlFor='amount'>Amount: </label>
                        <input className="input-field col s12 right" id='amount' value={this.state.amount}
                               onChange={ this.onInputChange } type='number'/>
                        <span style={{color: "red", float: 'left'}}>{this.state.errors.amount}</span>
                    </div>
                    <button className='btn waves-effect waves-light' style={{ height: '33px', margin: '3px'}}
                        type='submit' value='Submit'>Submit</button>
                </form>
                <button className='btn waves-effect waves-light' style={{ height: '33px', margin: '3px'}}
                    onClick={ this.clearFields }>Clear fields</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        wallet: state.wallet[0]
    }
}

function loadData(store) {
    return store.dispatch(getWallet());
}

export default {
    loadData,
    component: connect(mapStateToProps, { getWallet, updateWallet })(AddFundsPage)
}