import { GET_WALLET } from "../actions";

export default (state = [], action) => {
    switch (action.type){
        case GET_WALLET:
            return action.payload.data;
        default:
            return state;
    }
}