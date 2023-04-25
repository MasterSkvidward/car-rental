export interface IClient {
    driverLicenceNumber: string;
    fullName: string;
    passportInfo: string;
    address: string;
}

export interface ClientState {
    clients: IClient[];
    uniqueKeys: string[];
}

export enum ClientActionsEnum {
    ADD_CLIENT = "ADD_CLIENT",
    INITIALIZE_AVLTREE = "INITIALIZE_AVLTREE",
    FIND_CLIENT_LIST = "FIND_CLIENT_LIST",
    DELETE_ALL = "DELETE_ALL",
}

interface InitializeAVLTreeAction {
    type: ClientActionsEnum.INITIALIZE_AVLTREE;
    payload: {
        clients: IClient[],
        uniqueKeys: string[],
    };
}

interface AddClientAction {
    type: ClientActionsEnum.ADD_CLIENT;
    payload: IClient[];
}

interface FindClientListAction {
    type: ClientActionsEnum.FIND_CLIENT_LIST;
    payload: IClient[];
}

interface DeleteAllAction {
    type: ClientActionsEnum.DELETE_ALL;
    payload: [];
}

export type ClientAction = 
    AddClientAction | InitializeAVLTreeAction | FindClientListAction | DeleteAllAction
