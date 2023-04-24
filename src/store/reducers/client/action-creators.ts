import { AVLTree } from "../../../data-structures/clients";
import { ClientAction, ClientActionsEnum, IClient } from "./types";

export const ClientActionCreators = {
    InitializeAVLTREE: ():ClientAction => {
        const response: IClient[] = require('../../server/clients.json')
        const avlTree = new AVLTree()
        const uniqueKeys = [];

        for (const element of response) {
            avlTree.insert(element);
            uniqueKeys.push(element.driverLicenceNumber);
        }

        avlTree.detour();
        let clients: IClient[] = avlTree.treeLists;

        return {type: ClientActionsEnum.INITIALIZE_AVLTREE, payload: {clients: clients, uniqueKeys: uniqueKeys}}
    }, 

    // AddClient: (client: IClient):ClientAction => ({type: ClientActionsEnum.ADD_CLIENT, payload: client})
}