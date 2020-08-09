import { ADD_PRODUCT } from "../actions";

export default (state = [], action) => {
    switch (action.type) {
        case ADD_PRODUCT:
            return action.payload.data;
        default:
            return state;

    }
}