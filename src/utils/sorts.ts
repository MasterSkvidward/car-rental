import { IRent } from "../store/reducers/rent/types";

class Link {
    Value: IRent;
    Next: Link | null = null;
    Prev: Link | null = null;

    constructor(value: IRent) {
        this.Value = value;
    }
}

export class CircularLinkedList  {
    head: Link | null = null;
    tail: Link | null = null;
    count: number = 0;

    public Add(value: IRent):void {
        let link = new Link(value);

        if (!this.head)
            this.head = link;
        else if (this.tail) {
            this.tail.Next = link;
            link.Prev = this.tail;
        }
        this.count++;
        this.tail = link;
        this.Sort();
    }

    public DeleteByCarNumber(regNumber: string):void {
        let current: Link | null = this.head;
        while (current) {
            if (current.Value.stateRegistrationNumber === regNumber)
                break;
            current = current.Next;
        }

        if (current) {
            this.count--;
            if (current.Next)
                current.Next.Prev = current.Prev;
            else
                this.tail = current.Prev;

            if (current.Prev)
                current.Prev.Next = current.Next;
            else
                this.head = current.Next;
        }
    }

    public Remove(value: string):void {
        let current: Link | null = this.head;
        while (current) {
            if (current.Value.stateRegistrationNumber === value)
                break;
            current = current.Next;
        }

        if (current) {
            this.count--;
            if (current.Next)
                current.Next.Prev = current.Prev;
            else
                this.tail = current.Prev;

            if (current.Prev)
                current.Prev.Next = current.Next;
            else
                this.head = current.Next;
        }
    }

    public FindCarRent(value: string):IRent | null {
        let current: Link | null = this.head;

        while (current) {
            if (current.Value.stateRegistrationNumber === value)
                return current.Value;
            current = current.Next;
        }

        return null;
    }

    public FindClientRent(value: string):IRent[] {
        let result: IRent[] = [];
        let current: Link | null = this.head;

        while (current) {
            if (current.Value.driverLicenceNumber === value)
                result.push(current.Value);
            current = current.Next;
        }

        return result;
    }

    public GetArray(): IRent[] {
        let result:IRent[] = [];
        let current = this.head;
        while (current) {
            result.push(current.Value);
            current = current.Next;
        }
        return result;
    }

    public ClearList(): void {
        this.head = null;
        this.tail = null;
        this.count = 0;
    }

    private Sort(): void {
        let i = this.head;

        while (i) {
            let j = this.head;
            let prev:Link | null = null;
            while (j) {
                if (j.Next) {
                    if (j.Value.stateRegistrationNumber > j.Next.Value.stateRegistrationNumber) {
                        if (prev === null) {
                            let temp = j.Next;
                            this.head = j.Next;
                            j.Next = temp.Next;
                            temp.Next = j;
                        }
                        else {
                            let temp = j.Next;
                            j.Next = temp.Next;
                            prev.Next = temp;
                            temp.Next = j;
                        }
                    }
                }
                else {
                    if (i)
                        i = i.Next;
                    this.tail = j;
                }
                prev = j;
                j = j.Next;
            }

            j = prev;
            let next:Link | null = null;
            while (j) {
                if (j.Prev) {
                    if ( j.Prev.Value.stateRegistrationNumber > j.Value.stateRegistrationNumber) {
                        if (next === null) {
                            let temp = j.Prev;
                            this.tail = j.Prev;
                            j.Prev = temp.Prev;
                            temp.Prev = j;
                        }
                        else {
                            let temp = j.Prev;
                            j.Prev = temp.Prev;
                            next.Prev = temp;
                            temp.Prev = j;
                        }
                    }
                }
                else {
                    if (i)
                        i = i.Next;
                    this.head = j;
                }
                next = j;
                j = j.Prev;
            }
        }
    }
}