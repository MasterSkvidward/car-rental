import { IClient } from "../store/reducers/client/types";
import { stringCompare } from "../utils/utils";

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
    public treeLists: IClient[];

    constructor() {
        this.root = null;
        this.treeLists = [];
    }

    public insert(data:IClient):void {
        let newNode = new Node(data);

        if (this.root === null)
            this.root = newNode;
        else
            this.root = this.insertNode(this.root, newNode)
    }

    public detour(callback?: (data: IClient) => void):void {

        const func = (data: IClient) => {
            this.treeLists.push(data)
        }
        if (!callback)
            this.treeLists = [];
        this.detourTree(this.root, callback ? callback : func);
    }

    public delete(findLicence: string):void {
        this.root = this.deleteNode(this.root, findLicence);
        this.detour();
    }

    public Find(key: string):IClient[] {
        let list: IClient[] = [];

        const callback = (data: IClient) => {
            if (stringCompare(data.address, key) || stringCompare(data.fullName, key)) {
                list.push(data);
            }
        }
        this.detour(callback);

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
        this.treeLists = [];
    }


    private insertNode(current: Node | null, n: Node):Node {

        if (!current) {
            current = n;
            return current;
        }
        else if (n.data.driverLicenceNumber < current.data.driverLicenceNumber) {
            current.left = this.insertNode(current.left, n);
            current = this.balance(current);
        }
        else if (n.data.driverLicenceNumber > current.data.driverLicenceNumber) {
            current.right = this.insertNode(current.right, n);
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

    private deleteNode(current: Node | null, findLicence: string):Node | null {
        let parent: Node | null;

        if (!current)
            return null
        else {
            if (findLicence < current.data.driverLicenceNumber) {
                current.left = this.deleteNode(current.left, findLicence);
                if (this.bfactor(current) === -2)
                    if (this.bfactor(current.right) <= 0)
                        current = this.RotateRR(current);
                    else
                        current = this.RotateRL(current);
            }
            else if (findLicence > current.data.driverLicenceNumber) {
                current.right = this.deleteNode(current.right, findLicence);
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

    private balance(current: Node): Node {

        let b_factor = this.bfactor(current);

        if (b_factor > 1) {
            if (this.bfactor(current.left) > 0)
                current = this.RotateLL(current);
            else
                current = this.RotateLR(current);
        }
        else if (b_factor < -1) {
            if (this.bfactor(current.right) > 0)
                current = this.RotateRL(current);
            else 
                current = this.RotateRR(current);
        }

        return current;
    }

    private RotateRR(node:Node):Node {
        let pivot = node.right;
        if (pivot) {
            node.right = pivot.left;
            pivot.left = node;
            return pivot;
        }
        return node;
    }

    private RotateLL(node:Node):Node {
        let pivot = node.left;
        if (pivot) {
            node.left = pivot.right;
            pivot.right = node;
            return pivot      
        }
        return node;
    }

    private RotateLR(node:Node):Node {
        let pivot = node.left;
        if (pivot) {
            node.left = this.RotateRR(pivot);           
        }
        return this.RotateLL(node); 
    }

    private RotateRL(node:Node):Node {
        let pivot = node.right;
        if (pivot) {
            node.right = this.RotateLL(pivot);           
        }
        return this.RotateRR(node); 
    }
}