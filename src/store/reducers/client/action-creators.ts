import { AVLTree } from "../../../data-structures/clients";
import { ClientAction, ClientActionsEnum, IClient } from "./types";

let avlTree: AVLTree;

export const ClientActionCreators = {
    InitializeAVLTREE: ():ClientAction => {  
        const response: IClient[] = require('../../server/clients.json')
        avlTree = new AVLTree()
        const uniqueKeys = [];

        for (const element of response) {
            avlTree.insert(element);
            uniqueKeys.push(element.driverLicenceNumber);
        }

        avlTree.detour();
        let clients: IClient[] = avlTree.treeLists;

        return {type: ClientActionsEnum.INITIALIZE_AVLTREE, payload: {clients: clients, uniqueKeys: uniqueKeys}}
    }, 

    FindClientList: (data:string):ClientAction => {
        let result = avlTree.Find(data);
        return {type: ClientActionsEnum.FIND_CLIENT_LIST, payload: result}
    },

    DeleteAll: ():ClientAction => {
        avlTree.clearTree();
        return {type: ClientActionsEnum.DELETE_ALL, payload: []}
    }

    // AddClient: (client: IClient):ClientAction => ({type: ClientActionsEnum.ADD_CLIENT, payload: client})
}