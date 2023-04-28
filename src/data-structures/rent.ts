import { IRent } from "../store/reducers/rent/types";

class Node {
    value: IRent;
    next: Node | null = null;

    constructor(value: IRent) {
        this.value = value;
    }
}

export class CircularLinkedList {
    head: Node | null = null;
    tail: Node | null = null;
    length: number = 0;

    constructor () {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    public Append(value: IRent):void {
        let node = new Node(value);

        if (!this.head) {
            this.head = node;
            this.tail = node;
        }
        else if (this.tail) {
            this.tail.next = node;
            this.tail = node;
        }

        this.length++;
        if (this.tail) {
            this.tail.next = this.head;
        }
       
        this.Sort();
    }


    public Delete(value: string):void {
        let current: Node | null = this.head;

        if (current?.value) {
            this.length--;
            if (this.head) this.head = this.head?.next;
            if (this.tail?.next) this.tail.next = this.head;
            return;
        }

        while (current?.next) {
            if (current.value.stateRegistrationNumber === value) {
                if (current.next === this.tail) {
                    this.tail = current;
                }
            }
                
            current.next = current.next.next;
            this.length--;
            return;
        }

    }

    public FindCarRent(value: string):IRent | null {
        let current: Node | null = this.head;

        while (current) {
            if (current.value.stateRegistrationNumber === value)
                return current.value;
            current = current.next;
        }

        return null;
    }

    public FindClientRent(value: string):IRent[] {
        let result: IRent[] = [];
        let current: Node | null = this.head;

        while (current) {
            if (current.value.driverLicenceNumber === value)
                result.push(current.value);
            current = current.next;
        }

        return result;
    }

    public GetAllElements(): IRent[] {
        let result:IRent[] = [];
        let current = this.head;
        while (current) {
            result.push(current.value);
            current = current.next;
        }
        return result;
    }

    public ClearList(): void {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    private Sort(): void {
        const counts: number[] = [];
        let current: Node | null = this.head;

        while (current !== null) {
            let tmp = current.value;
            counts[Number(tmp.stateRegistrationNumber)] = (counts[Number(tmp.stateRegistrationNumber)] || 0) + 1;
            current = current.next;
          }
          
          let sortedPositions: number[] = [];
          sortedPositions.length = this.length;
          let index = 0;
          
          for (let i = 0; i < counts.length; i++) {
            if (counts[i] !== undefined) {
              for (let j = 0; j < counts[i]; j++) {
                sortedPositions[index] = i;
                index++;
              }
            }
          }
          
          let currentNode = this.head;
          for (let i = 0; i < sortedPositions.length; i++) {
            if (currentNode) currentNode.value.stateRegistrationNumber = String(sortedPositions[i]);
            if (currentNode) currentNode = currentNode.next;
          }
    }
}