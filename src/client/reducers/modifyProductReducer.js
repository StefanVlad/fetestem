import { MODIFY_PRODUCT } from "../actions";

export default (state = [], action) => {
    switch (action.type) {
        case MODIFY_PRODUCT:
            return action.payload.data;
        default:
            return state;

    }
}