import { IClient } from "../store/reducers/client/types";
import { directSearch } from "../utils/utils";

class Node {
    data: IClient;
    left: Node | null;
    right: Node | null;

    constructor(data:IClient) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

export class AVLTree {

    private root: Node | null;
    public treeElements: IClient[];

    constructor() {
        this.root = null;
        this.treeElements = [];
    }

    public Insert(data:IClient):void {
        let newNode = new Node(data);

        if (this.root === null)
            this.root = newNode;
        else
            this.root = this.insertNode(this.root, newNode)
    }

    public Delete(findLicence: string):void {
        this.root = this.deleteNode(this.root, findLicence);
        this.Detour();
    }

    public Detour(callback?: (data: IClient) => void):void {

        const func = (data: IClient) => {
            this.treeElements.push(data)
        }

        if (!callback)
            this.treeElements = [];
        this.detourTree(this.root, callback ? callback : func);
    }

    public Find(key: string):IClient[] {
        if (!key) return this.treeElements;

        let list: IClient[] = [];

        const callback = (data: IClient) => {
            if (directSearch(data.address, key) || directSearch(data.fullName, key)) {
                list.push(data);
            }
        }
        this.Detour(callback);

        return list;
    }

    public FindSingle(key: string):IClient | null {
        if (this.root) {
            const finded: Node | null = this.FindSingleClient(key, this.root);

            if (finded?.data)
                return finded.data;
        }

        return null;
    }

    private FindSingleClient(key: string, current: Node):Node | null {
        if (key < current.data.driverLicenceNumber)
            if (key === current.data.driverLicenceNumber)
                return current;
            else {
                if (current.left)
                    return this.FindSingleClient(key, current.left);
                else return null;
            }
                
        else
            if (key === current.data.driverLicenceNumber)
                return current;
            else {
                if (current.right)
                    return this.FindSingleClient(key, current.right)
                else return null;
            }
                
    }

    public clearTree():void {
        this.root = null;
        this.treeElements = [];
    }


    private insertNode(current: Node | null, node: Node):Node {

        if (!current) {
            current = node;
            return current;
        }
        else if (node.data.driverLicenceNumber < current.data.driverLicenceNumber) {
            current.left = this.insertNode(current.left, node);
            current = this.balance(current);
        }
        else if (node.data.driverLicenceNumber > current.data.driverLicenceNumber) {
            current.right = this.insertNode(current.right, node);
            current = this.balance(current);
        }

        return current;
    }

    private detourTree(node:Node | null, callback: (data: IClient) => void):void {
        if (node) {
            this.detourTree(node.left, callback)
            this.detourTree(node.right, callback);
            callback(node.data);
        }
    }

    private deleteNode(current: Node | null, licenceNumber: string):Node | null {
        let parent: Node | null;

        if (!current)
            return null
        else {
            if (licenceNumber < current.data.driverLicenceNumber) {
                current.left = this.deleteNode(current.left, licenceNumber);
                if (this.bfactor(current) === -2)
                    if (this.bfactor(current.right) <= 0)
                        current = this.RotateRR(current);
                    else
                        current = this.RotateRL(current);
            }
            else if (licenceNumber > current.data.driverLicenceNumber) {
                current.right = this.deleteNode(current.right, licenceNumber);
                if (this.bfactor(current) === 2) 
                    if (this.bfactor(current.left) >= 0)
                        current = this.RotateLL(current);
                    else
                        current = this.RotateLR(current);
            }
            else {
                if (current.right) {
                    parent = current.right;
                    while (parent.left)
                        parent = parent.left;
                    current.data = parent.data;
                    current.right = this.deleteNode(current.right, parent.data.driverLicenceNumber)

                    if (this.bfactor(current) === 2) {
                        if (this.bfactor(current.left) >= 0)
                            current = this.RotateLL(current);
                        else 
                            current = this.RotateLR(current);
                    }
                }
                else 
                    return current.left;
            }
        }
        return current;
    }

    private bfactor(node: Node | null):number {
        if (!node) return 0;
        return this.getHeight(node.left) - this.getHeight(node.right);
    }

    private getHeight(node: Node | null):number {
        let height = 0;
        if (node) {
            let l = this.getHeight(node.left);
            let r = this.getHeight(node.right);
            let m = Math.max(l,r);
            height = m + 1;
        }
        return height;
    }

    private balance(currentElement: Node): Node {

        let b_factor = this.bfactor(currentElement);

        if (b_factor > 1) {
            if (this.bfactor(currentElement.left) > 0)
            currentElement = this.RotateLL(currentElement);
            else
            currentElement = this.RotateLR(currentElement);
        }
        else if (b_factor < -1) {
            if (this.bfactor(currentElement.right) > 0)
                currentElement = this.RotateRL(currentElement);
            else 
            currentElement = this.RotateRR(currentElement);
        }

        return currentElement;
    }

    private RotateRR(node:Node):Node {
        let tmp = node.right;
        if (tmp) {
            node.right = tmp.left;
            tmp.left = node;
            return tmp;
        }
        return node;
    }

    private RotateLL(node:Node):Node {
        let tmp = node.left;
        if (tmp) {
            node.left = tmp.right;
            tmp.right = node;
            return tmp      
        }
        return node;
    }

    private RotateLR(node:Node):Node {
        let tmp = node.left;
        if (tmp) {
            node.left = this.RotateRR(tmp);           
        }
        return this.RotateLL(node); 
    }

    private RotateRL(node:Node):Node {
        let tmp = node.right;
        if (tmp) {
            node.right = this.RotateLL(tmp);           
        }
        return this.RotateRR(node); 
    }
}