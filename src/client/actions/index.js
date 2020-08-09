import axios from 'axios';

axios.defaults.headers.common['x-apikey'] = '5f2bfd89358f8075789dc7ba';
const baseUrl = 'https://emfetest-3e98.restdb.io/rest';

export const FETCH_PRODUCTS = 'fetch_products';
export const fetchProducts = () => async dispatch => {
    const res = await axios.get(`${baseUrl}/products`);
    dispatch({
        type: FETCH_PRODUCTS,
        payload: res
    });
};

export const ADD_PRODUCT = 'add_product';
export const addProduct = (product) => async dispatch => {
    let body = {
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        id: product.id,
        currency: product.currency
    };
    const res = await axios.post(`${baseUrl}/products`, body);

    dispatch({
        type: ADD_PRODUCT,
        payload: res
    })
};

export const MODIFY_PRODUCT = 'modify_product';
export const modifyProduct = (product) => async dispatch => {
    let body = {
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        id: product.id,
        currency: product.currency
    };
    console.log('body', body);
    const res = await axios.put(`${baseUrl}/products/${product['_id']}`, body);

    dispatch({
        type: MODIFY_PRODUCT,
        payload: res
    })
};

export const DELETE_PRODUCT = 'delete_product';
export const deleteProduct = (productID) => async dispatch => {
    const res = await axios.delete(`${baseUrl}/products/${productID}`);

    dispatch({
        type: DELETE_PRODUCT,
        payload: res
    })
};

export const GET_WALLET = 'get_wallet';
export const getWallet = () => async dispatch => {
    const res = await axios.get(`${baseUrl}/wallet`);

    dispatch({
        type: GET_WALLET,
        payload: res
    })
};

export const UPDATE_WALLET = 'update_wallet';
export const updateWallet = (wallet) => async dispatch => {
    let body = { balance: wallet.balance };
    const res = await axios.put(`${baseUrl}/wallet/${wallet['_id']}`, body);

    dispatch({
        type: UPDATE_WALLET,
        payload: res
    })
};
