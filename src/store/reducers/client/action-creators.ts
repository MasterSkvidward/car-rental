import { AVLTree } from "../../../data-structures/clients";
import { ClientAction, ClientActionsEnum, IClient } from "./types";


export const ClientActionCreators = {
    InitializeAVLTREE: ():ClientAction => {  
        const response: IClient[] = require('../../server/clients.json')
        const avlTree = new AVLTree()
        const uniqueKeys = [];

        for (const element of response) {
            avlTree.Insert(element);
            uniqueKeys.push(element.driverLicenceNumber);
        }

        avlTree.Detour(); 

        return {type: ClientActionsEnum.INITIALIZE_AVLTREE, payload: {avlTree: avlTree, uniqueKeys: uniqueKeys}}
    }, 

    AddClient: (client: IClient):ClientAction => ({type: ClientActionsEnum.ADD_CLIENT, payload: client}),

    DeleteClient: (driveNumber: string):ClientAction => ({type: ClientActionsEnum.DELETE_CLIENT, payload: driveNumber}),

    FindClient: (driveNumber:string):ClientAction => ({type: ClientActionsEnum.FIND_CLIENT, payload: driveNumber}),

    FindClientList: (data:string):ClientAction => {
        return {type: ClientActionsEnum.FIND_CLIENT_LIST, payload: data}
    },

    DeleteAll: ():ClientAction => {
        return {type: ClientActionsEnum.DELETE_ALL}
    }
}