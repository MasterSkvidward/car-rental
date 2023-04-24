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
}

interface InitializeAVLTREE {
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

export type ClientAction = 
    AddClientAction | InitializeAVLTREE
