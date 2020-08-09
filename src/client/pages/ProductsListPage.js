import React, { Component } from 'react';
import Keypad from "../components/Keypad";
import Wallet from "../components/Wallet";
import { connect } from 'react-redux';
import { fetchProducts, getWallet } from "../actions";
import _ from 'lodash';

class ProductsList extends Component {
    constructor(props) {
        super(props);

        console.log('ProductsList this.props', this.props);
    }

    componentDidMount() {
        this.props.fetchProducts();
        this.props.getWallet();
    }

    componentDidUpdate(prevProps) {
        if(this.props !== prevProps) {
            // console.log('this.props', this.props);
        }
    }

    renderProductsList() {
        if (!_.isEmpty(this.props.products)) {
            console.log('sloboz', this.props.products);
            return this.props.products.map((product) => {
                return (
                    <tr key={product['_id']}>
                        <td>{product.name}</td>
                        <td>{product.id}</td>
                        <td>{product.price} {product.currency}</td>
                        <td>{product.quantity}</td>
                    </tr>
                )
            })
        }
        console.log('slobozel', this.props.products);
        return <tr><td> Loading... </td></tr>
    }

    render() {
        return (
            <div className="ProductListContainer col-1">
                <h4 style={{ padding: '10px' }} > Products available: </h4>
                <div style={{width: "50%", float: "left", padding: "10px", border: 'thick solid #800000' }}>
                    <table className='striped' >
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>ID</th>
                                <th>Price</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderProductsList()}
                        </tbody>
                    </table>
                </div>
                <div style={{width: "50%", float: "right", padding: "10px"}}>
                    <div className='content' style={{ width: '40%', margin: '10px', float: 'left' }}>
                        <Keypad products={this.props.products} wallet={this.props.wallet[0]}/>
                    </div>
                    <div className='content' style={{ width: '25%', margin: '40px 0 15px 10px', float: 'left' }}>
                        <Wallet wallet={this.props.wallet[0]}/>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        products: state.products,
        wallet: state.wallet
    };
}

function loadData(store) {
    store.dispatch(getWallet());
    return store.dispatch(fetchProducts());
}

export default {
    loadData,
    component: connect(mapStateToProps, { fetchProducts, getWallet })(ProductsList)
}