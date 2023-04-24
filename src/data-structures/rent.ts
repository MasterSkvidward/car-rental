import { IRent } from "../store/reducers/rent/types";

class Link {
    Value: IRent;
    Next: Link | null = null;
    Prev: Link | null = null;

    constructor(value: IRent) {
        this.Value = value;
    }
}

export class LinkedList {
    First: Link | null = null;
    Last: Link | null = null;
    count: number = 0;

    public Add(value: IRent):void {
        let link = new Link(value);

        if (!this.First)
            this.First = link;
        else if (this.Last) {
            this.Last.Next = link;
            link.Prev = this.Last;
        }
        this.count++;
        this.Last = link;
        this.Sort();
    }

    public Remove(value: string):void {
        let current: Link | null = this.First;
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
                this.Last = current.Prev;

            if (current.Prev)
                current.Prev.Next = current.Next;
            else
                this.First = current.Next;
        }
    }

    public FindCarRent(value: string):IRent | null {
        let current: Link | null = this.First;

        while (current) {
            if (current.Value.stateRegistrationNumber === value)
                return current.Value;
            current = current.Next;
        }

        return null;
    }

    public FindClientRent(value: string):IRent[] {
        let result: IRent[] = [];
        let current: Link | null = this.First;

        while (current) {
            if (current.Value.driverLicenceNumber === value)
                result.push(current.Value);
            current = current.Next;
        }

        return result;
    }

    public GetArray(): IRent[] {
        let result:IRent[] = [];
        let current = this.First;
        while (current) {
            result.push(current.Value);
            current = current.Next;
        }
        return result;
    }

    public ClearList(): void {
        this.First = null;
        this.Last = null;
        this.count = 0;
    }

    private Sort(): void {
        let i = this.First;

        while (i) {
            let j = this.First;
            let prev:Link | null = null;
            while (j) {
                if (j.Next) {
                    if (j.Value.stateRegistrationNumber > j.Next.Value.stateRegistrationNumber) {
                        if (prev === null) {
                            let temp = j.Next;
                            this.First = j.Next;
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
                    this.Last = j;
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
                            this.Last = j.Prev;
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
                    this.First = j;
                }
                next = j;
                j = j.Prev;
            }
        }
    }
}