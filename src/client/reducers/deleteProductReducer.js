import { DELETE_PRODUCT } from "../actions";

export default (state = [], action) => {
    switch (action.type) {
        case DELETE_PRODUCT:
            return action.payload.data;
        default:
            return state;

    }
}