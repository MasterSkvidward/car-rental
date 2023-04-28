import { AVLTree } from "../../../data-structures/clients";

export interface IClient {
    driverLicenceNumber: string;
    fullName: string;
    passportInfo: string;
    address: string;
}

export interface ClientState {
    avlTree: AVLTree;
    clients: IClient[];
    uniqueKeys: string[];
    currentClient: IClient | null;
}

export enum ClientActionsEnum {
    ADD_CLIENT = "ADD_CLIENT",
    DELETE_CLIENT = "DELETE_CLIENT",
    FIND_CLIENT = "FIND_CLIENT",
    INITIALIZE_AVLTREE = "INITIALIZE_AVLTREE",
    FIND_CLIENT_LIST = "FIND_CLIENT_LIST",
    DELETE_ALL = "DELETE_ALL",
}

interface InitializeAVLTreeAction {
    type: ClientActionsEnum.INITIALIZE_AVLTREE;
    payload: {
        avlTree: AVLTree,
        uniqueKeys: string[],
    };
}

interface AddClientAction {
    type: ClientActionsEnum.ADD_CLIENT;
    payload: IClient;
}

interface DeleteClientAction {
    type: ClientActionsEnum.DELETE_CLIENT;
    payload: string;
}

interface FindClientAction {
    type: ClientActionsEnum.FIND_CLIENT;
    payload: string;
}

interface FindClientListAction {
    type: ClientActionsEnum.FIND_CLIENT_LIST;
    payload: string;
}

interface DeleteAllAction {
    type: ClientActionsEnum.DELETE_ALL;
    // payload: [];
}

export type ClientAction = 
    AddClientAction | DeleteClientAction | InitializeAVLTreeAction | FindClientListAction | FindClientAction | DeleteAllAction
