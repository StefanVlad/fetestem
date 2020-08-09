import { UPDATE_WALLET } from "../actions";

export default (state = 0, action) => {
    switch (action.type){
        case UPDATE_WALLET:
            return action.payload.data;
        default:
            return state;
    }
}