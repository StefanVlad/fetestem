import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts, modifyProduct, deleteProduct, getWallet, updateWallet } from "../actions";

class Keypad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wallet: {},
            productId: '0',
            errMsg: '',
            successMsg: ''
        };

        this.updateProductId = this.updateProductId.bind(this);
        this.clearInput = this.clearInput.bind(this);
        this.buyProduct = this.buyProduct.bind(this);
    }

    componentDidMount() {
        this.props.getWallet();

    }

    componentDidUpdate(prevProps) {
        if(this.props.wallet[0] !== prevProps.wallet[0]) {
            this.setState({
                wallet: this.props.wallet[0]
            });
        }
    }

    updateProductId (e) {
        let value = this.state.productId === '0' ? e.target.value : this.state.productId + e.target.value;
        this.setState({
            productId: value
        })
    }

    buyProduct () {
        let idFound = false;
        let currentProduct = {};
        this.props.products.forEach((product) => {
            if(product.id == this.state.productId) {
                currentProduct = product;
                return idFound = true;
            }
        });
        if(!idFound) {
            return this.setState({
                errMsg: 'ID-ul produsului este incorect!'
            });
        } else {
            if(currentProduct.price > this.state.wallet.balance) {
                return this.setState({
                    errMsg: 'Bani insuficienti!'
                })
            } else {
                let updatedWallet = {
                    '_id': this.state.wallet['_id'],
                    balance: this.state.wallet.balance - currentProduct.price
                };
                if(currentProduct.quantity > 1) {
                    currentProduct.quantity -= 1;
                    let promises = [this.props.updateWallet(updatedWallet), this.props.modifyProduct(currentProduct)];

                    Promise.all(promises).then(() => {
                        this.props.getWallet();
                        this.props.fetchProducts();
                        return this.setState({
                            successMsg: 'Ai cumparat produsul cu succes!'
                        })
                    }, (err) => {
                        console.log('There was an error: ', err);
                    });
                } else {
                    let promises = [this.props.updateWallet(updatedWallet), this.props.deleteProduct(currentProduct['_id'])];

                    Promise.all(promises).then(() => {
                        this.props.getWallet();
                        this.props.fetchProducts();
                        return this.setState({
                            successMsg: 'Ai cumparat produsul cu succes!'
                        })
                    }, (err) => {
                        console.log('There was an error: ', err);
                    });
                }
            }
        }
    }

    //create render keypad buttons here

    clearInput () {
        this.setState({
            productId: '0',
            errMsg: '',
            successMsg: ''
        });
    }

    render() {
        return (
            <div style={{ width: "300px"}}>
                <input type="text" value={this.state.productId} readOnly/>
                <span style={{display: 'block', margin: '5px'}}>{this.state.errMsg}</span>
                <div>
                    <button style={{margin: '2px'}} onClick={ this.updateProductId } value="1">1</button>
                    <button style={{margin: '2px'}} onClick={ this.updateProductId } value="2">2</button>
                    <button style={{margin: '2px'}} onClick={ this.updateProductId } value="3">3</button>
                    <button style={{margin: '2px'}} onClick={ this.updateProductId } value="4">4</button>
                    <button style={{margin: '2px'}} onClick={ this.updateProductId } value="5">5</button>
                    <button style={{margin: '2px'}} onClick={ this.updateProductId } value="6">6</button>
                    <button style={{margin: '2px'}} onClick={ this.updateProductId } value="7">7</button>
                    <button style={{margin: '2px'}} onClick={ this.updateProductId } value="8">8</button>
                    <button style={{margin: '2px'}} onClick={ this.updateProductId } value="9">9</button>
                    <button style={{margin: '2px'}} onClick={ this.updateProductId } value="0">0</button>
                    <button className='btn waves-effect waves-light' style={{margin: '2px'}} onClick={ this.buyProduct }>Buy product</button>
                    <button className='btn waves-effect waves-light' style={{margin: '2px'}} onClick={ this.clearInput }>Clear</button>
                </div>
                <span style={{display: 'block', margin: '5px'}}>{this.state.successMsg}</span>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        wallet: state.wallet
    }
}

export default connect(mapStateToProps, { fetchProducts, modifyProduct, deleteProduct, getWallet, updateWallet })(Keypad)