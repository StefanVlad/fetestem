import { combineReducers } from "redux";
import productsReducer from "./productsReducer";
import deleteProductReducer from "./deleteProductReducer";
import modifyProductReducer from "./modifyProductReducer";
import addProductReducer from "./addProductReducer";
import getWalletReducer from "./getWalletReducer";
import updateWalletReducer from "./updateWalletReducer";

export default combineReducers({
    products: productsReducer,
    wallet: getWalletReducer,
    modifyProduct: modifyProductReducer,
    deleteProduct: deleteProductReducer,
    addProduct: addProductReducer,
    updateWallet: updateWalletReducer
})