import { ClientActionsEnum } from "./types";
import { ClientAction } from "./types";
import { ClientState } from "./types";


const initialState = {
    clients: [],
    uniqueKeys: [],
}


export default function clientrReducer(state = initialState, action:ClientAction): ClientState {
    switch (action.type) {
        case ClientActionsEnum.INITIALIZE_AVLTREE:
            return {...state, clients: action.payload.clients, uniqueKeys: action.payload.uniqueKeys};

        case ClientActionsEnum.ADD_CLIENT:
            return {...state};

        default:
            return state;
    }
}