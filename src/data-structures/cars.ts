import { ICar } from '../store/reducers/car/types';
import { directSearch } from '../utils/utils';

class Element {
    Key: string | null;
    Value: ICar | null;
    OriginalAddress: number;
    isEmpty: boolean;
    isDeleted: boolean;

    constructor() {
        this.Key = null;
        this.Value = null;
        this.OriginalAddress = 0;
        this.isEmpty = true;
        this.isDeleted = false;
    }
}

export class HashTable {
    tableSegments: Element[] = new Array(HashTable.segmentsSize);
    static segmentsSize: number = 100;
    maxCollision: number = 5;

    constructor() {
        for (let i = 0; i < HashTable.segmentsSize; i++) {
            this.tableSegments[i] = new Element();
        }
    }

    Insert(key:string, value:ICar | null, flag:boolean = false):void {     
        let collision:number = 0;
        let originalAddress:number = (this.HashFunc(key) + collision * this.SecondHashFunc(key)) % HashTable.segmentsSize;

        while (true) {
            let address:number = (this.HashFunc(key) + collision * this.SecondHashFunc(key)) % HashTable.segmentsSize;
            let segment:Element = this.tableSegments[address];

            if (segment.isEmpty || segment.isDeleted) {
                segment.Key = key;
                segment.Value = value;
                segment.OriginalAddress = originalAddress;
                segment.isEmpty = false;
                segment.isDeleted = false;
                return;
            }

            if (collision > this.maxCollision && flag) {
                collision = 0;
                this.ReHashFunc()
                continue;
            }

            collision += 1;
        }
    }

    Delete(key:string):number {
        let collision:number = 0;

        while (true) {
            let address:number = (this.HashFunc(key) + collision * this.SecondHashFunc(key)) % HashTable.segmentsSize;

            let segment:Element = this.tableSegments[address];

            if (segment.Key === key) {
                segment.Key = null;
                segment.Value = null;
                segment.isDeleted = true;
                return segment.OriginalAddress;
            }

            if (segment.isEmpty)
                return -1;
            
            collision +=1;
        }
    }


    FindElement(key:string):ICar | null {
        let collision:number = 0;

        while (true) {
            let address:number = (this.HashFunc(key) + collision * this.SecondHashFunc(key)) % HashTable.segmentsSize;
            let segment:Element = this.tableSegments[address];

            if (segment.Key === key)
                return segment.Value;
            if (segment.isEmpty || collision > this.maxCollision)
                return null;
            collision +=1;
        }
    }

    FindSegment(key:string):Element | null {
        let collision:number = 0;

        while (true) {
            let address:number = (this.HashFunc(key) + collision * this.SecondHashFunc(key)) % HashTable.segmentsSize;
            let segment:Element = this.tableSegments[address];

            if (segment.Key === key)
                return segment;
            if (segment.isEmpty || collision > this.maxCollision)
                return null;
            collision +=1;
        }
    }

    FindList(key:string):Array<ICar | null> {

        if (!key) return this.GetAllCars();

        let arr:Array<ICar | null> = [];
        
        for (let i = 0; i < HashTable.segmentsSize; i++) {
            const text = this.tableSegments[i].Value?.brand;
            if (text)
                if (directSearch(text, key))
                    arr.push(this.tableSegments[i].Value)
        }

        return arr;
    }

    GetAllCars():Array<ICar | null> {
        let arr: Array<ICar | null> = [];
        for (let i = 0; i < HashTable.segmentsSize; i++) {
            if (this.tableSegments[i].Key)
                arr.push(this.tableSegments[i].Value);
        }
        return arr;
    }


    ClearHash():void {
        this.tableSegments = new Array(HashTable.segmentsSize);
        for (let i = 0; i < HashTable.segmentsSize; i++) {
            this.tableSegments[i] = new Element();
        }
        HashTable.segmentsSize = 100;
        this.maxCollision = 5;
    }

    HashFunc(currentKey:string):number {
        let hashSum = 0;
        
        for (let i = 0; i < currentKey?.length; i++) {
            hashSum += Math.pow(currentKey[i].charCodeAt(0), 2)
        }

        hashSum %= HashTable.segmentsSize;
        return hashSum;
    }

    SecondHashFunc(currentKey:string):number {
        let hashSum = 0;
        let count = 2;

        for (let i = 0; i < currentKey.length; i++) {
            hashSum += Math.pow(currentKey[i].charCodeAt(0) * count, 2);
            count += 1;
        }

        hashSum %= HashTable.segmentsSize;
        return hashSum;
    }

    ReHashFunc():void {
        let coeff:number = 2;

        let newtableSegments:Element[] = new Array(HashTable.segmentsSize);

        for (let i = 0; i < HashTable.segmentsSize; i++) {
            newtableSegments[i] = this.tableSegments[i];
        }

        this.tableSegments = new Array(HashTable.segmentsSize * coeff);

        for (let j = 0; j < HashTable.segmentsSize * coeff; j++) {
            this.tableSegments[j] = new Element();
        }

        HashTable.segmentsSize *= coeff;

        for (const item of newtableSegments) {
            if (item.Key)
                this.Insert(item.Key, item.Value, true)
        }
    }
}