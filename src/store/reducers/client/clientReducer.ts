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

        // case ClientActionsEnum.ADD_CLIENT:
        //     return {...state, clients: state.clients.push(action.payload)};

        case ClientActionsEnum.FIND_CLIENT_LIST:
            return {...state, clients: action.payload};

        case ClientActionsEnum.DELETE_ALL:
            console.log('AVLTREE --');
            return {...state, clients: action.payload};

        default:
            return state;
    }
}