import { AVLTree } from "../../../data-structures/clients";
import { ClientActionsEnum } from "./types";
import { ClientAction } from "./types";
import { ClientState } from "./types";


const initialState:ClientState = {
    avlTree: new AVLTree(),
    clients: [],
    uniqueKeys: [],
    currentClient: {
        driverLicenceNumber: '',
        fullName: '',
        passportInfo: '',
        address: '',
    },
}


export default function clientrReducer(state = initialState, action:ClientAction): ClientState {
    switch (action.type) {
        case ClientActionsEnum.INITIALIZE_AVLTREE:
            return {...state, avlTree: action.payload.avlTree, clients: action.payload.avlTree.treeElements, uniqueKeys: action.payload.uniqueKeys};

        case ClientActionsEnum.ADD_CLIENT:
            state.avlTree.Insert(action.payload);
            state.avlTree.Detour();
            return {...state, clients: [...state.clients, action.payload], uniqueKeys: [...state.uniqueKeys, action.payload.driverLicenceNumber]};

        case ClientActionsEnum.DELETE_CLIENT:
            state.avlTree.Delete(action.payload);
            state.avlTree.Detour();
            return {...state, clients: state.avlTree.treeElements, uniqueKeys: state.uniqueKeys.filter((driverLicence) => driverLicence !== action.payload)};

        case ClientActionsEnum.FIND_CLIENT:
            const client = state.avlTree.FindSingle(action.payload);
            return {...state, currentClient: client};

        case ClientActionsEnum.FIND_CLIENT_LIST:
            return {...state, clients: state.avlTree.Find(action.payload)};

        case ClientActionsEnum.DELETE_ALL:
            state.avlTree.clearTree();
            return {...state, clients: [], uniqueKeys: []};

        default:
            return state;
    }
}