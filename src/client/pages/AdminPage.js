import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchProducts, addProduct, deleteProduct, modifyProduct} from "../actions";
import _ from 'lodash';

class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            method: 'add',
            id: '',
            quantity: '',
            price: '',
            name: '',
            currency: '$',
            errors: {}
        };

        this.deleteProduct = this.deleteProduct.bind(this);
        this.prepareModifyItem = this.prepareModifyItem.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderForm = this.renderForm.bind(this);
        this.resetFields = this.resetFields.bind(this);
        this.formValidation = this.formValidation.bind(this);
    }

    componentDidMount() {
        this.props.fetchProducts();
    }

    deleteProduct(e) {
        e.preventDefault();
        let productID = e.target.value;
        this.props.deleteProduct(productID).then(() => {
            this.props.fetchProducts();
        }, (err) => {
            console.log('There was an error deleting the product: ', err);
        })
    }

    prepareModifyItem(product) {
        this.setState({
            method: 'modify',
            ...product
        });
    }

    onInputChange(e) {
        e.preventDefault();
        let stateKey = e.target.id;
        let stateKeyValue = e.target.value;
        if(stateKey === 'id' || stateKey === 'quantity' || stateKey === 'price') {
            this.setState({
                [stateKey]: parseInt(stateKeyValue)
            })
        } else {
            this.setState({
                [stateKey]: stateKeyValue.toString()
            })
        }
    }

    resetFields(e) {
        e.preventDefault();
        this.setState({
            method: 'add',
            id: '0',
            quantity: '0',
            price: '0',
            name: '',
            currency: '$',
            errors: {}
        });
    }

    formValidation() {
        let fields = this.state;
        let formIsValid = true;
        let errors = {};

        if(!_.isNumber(fields['id']) && fields['id'] <= 0) {
            formIsValid = false;
            errors.id = 'Invalid ID'
        } else {
            errors.id = ''
        }
        if(!_.isNumber(fields['quantity']) && fields['quantity'] <= 0) {
            formIsValid = false;
            errors.quantity = 'Invalid quantity'
        } else {
            errors.quantity = ''
        }
        if(!_.isNumber(fields['price']) && fields['price'] <= 0) {
            formIsValid = false;
            errors.price = 'Invalid price'
        } else {
            errors.price = ''
        }
        if(fields['name'].length <= 0) {
            formIsValid = false;
            errors.name = 'Invalid name'
        } else {
            errors.name = ''
        }

        this.setState({ errors });
        return formIsValid;
    }

    handleSubmit(e) {
        e.preventDefault();
        if(!this.formValidation()){ return; }
        let product = { ...this.state };
        if(this.state.method === 'add'){
            //add product here
            this.props.addProduct(product).then(() => {
                this.props.fetchProducts();
            }, (err) => {
                console.log('There was an error adding the new product: ', err);
            })
        } else if(this.state.method === 'modify'){
            //modify product here
            this.props.modifyProduct(product).then(() => {
                this.props.fetchProducts();
            }, (err) => {
                console.log('There was an error modifying the current product: ', err);
            })
        }
        this.resetFields();

    }

    renderProductList() {
        return this.props.products.map((product) => {
            return (
                <tr key={product['_id']}>
                    <td style={{'min-width': '100px'}}>{product.name}</td>
                    <td style={{'min-width': '100px'}}>{product.id}</td>
                    <td style={{'min-width': '100px'}}>{product.price} {product.currency}</td>
                    <td style={{'min-width': '100px'}}>{product.quantity}</td>
                    <td><button className='waves-effect waves-light btn center' style={{ height: '33px', margin: '3px'}}
                                onClick={ this.deleteProduct } value={product['_id']}>Delete</button></td>
                    <td><button className='waves-effect waves-light btn center' style={{ height: '33px', margin: '3px'}}
                                onClick={ () => { this.prepareModifyItem(product) } } value={product}>Modify item</button></td>
                </tr>
            )
        })
    }

    renderForm() {
        return (
            <div>
                <form className='col s6' onSubmit={this.handleSubmit}>
                    <div className="row">
                        <label htmlFor="id">Id</label>
                        <input className="input-field col s12" value={this.state.id} onChange={ this.onInputChange }
                               type="number" id="id"/>
                        <span style={{color: "red", float: 'left'}}>{this.state.errors.id}</span>
                    </div>
                    <div className="row">
                        <label htmlFor="name">Name:</label>
                        <input className="input-field col s12" value={this.state.name} onChange={ this.onInputChange }
                               type="text" id="name"/>
                        <span style={{color: "red", float: 'left'}}>{this.state.errors.name}</span>
                    </div>
                    <div className="row">
                        <label htmlFor="quantity">Quantity: </label>
                        <input className="input-field col s12" value={this.state.quantity} onChange={ this.onInputChange }
                               type="number" id="quantity"/>
                        <span style={{color: "red", float: 'left'}}>{this.state.errors.quantity}</span>
                    </div>
                    <div className="row">
                        <label htmlFor="price">Price: </label>
                        <input className="input-field col s12" value={this.state.price} onChange={ this.onInputChange }
                               type="number" id="price"/>
                        <span style={{color: "red", float: 'left'}}>{this.state.errors.price}</span>
                    </div>
                    <button className='btn waves-effect waves-light' style={{ height: '33px', margin: '3px'}}
                            type="submit" value="Submit">Submit</button>
                    <button className='btn waves-effect waves-light' style={{ height: '33px', margin: '3px'}}
                            onClick={ this.resetFields }>Clear</button>
                </form>
            </div>
        )
    }

    render() {
        return (
            <div className="ProductListContainer col-1">
                <h4 style={{ padding: '10px' }}>Welcome to the admin page</h4>
                <div className='content' style={{width: '50%', float:'left', padding: '10px', border: 'thick solid #800000'}}>
                    <table className='striped' style={{ width: '50%' }}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>ID</th>
                                <th>Price</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderProductList()}
                        </tbody>
                    </table>
                </div>
                <div className="row" style={{width: '50%', float: 'right', 'padding-left': '30px'}}>
                    {this.renderForm()}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { products: state.products }
}

function loadData(store) {
    return store.dispatch(fetchProducts())
}

export default {
    loadData,
    component: connect(mapStateToProps, { fetchProducts, addProduct, deleteProduct, modifyProduct })(AdminPage)
}