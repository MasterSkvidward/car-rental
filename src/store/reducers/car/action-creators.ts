import { HashTable } from "../../../data-structures/cars";
import { CarAction, CarActionsEnum, ICar } from "./types";


let hashTable: HashTable;

export const CarActionCreators = {
    InitializeHashtable: ():CarAction => {
        const cars: string[] = [];
        hashTable = new HashTable();
        
        const response: ICar[] = require('../../server/cars.json');

        for (const element of response) {
            hashTable.Insert(element.stateRegistrationNumber, element);
            cars.push(element.stateRegistrationNumber)
        }

        let result:(ICar | null)[] = hashTable.GetArray();

        return {type: CarActionsEnum.INITIALIZE_HASHTABLE, payload: result};
    }, 

    AddCar: (car: ICar):CarAction => ({type: CarActionsEnum.ADD_CAR, payload: car}),

    FindCarList: (brand: string):CarAction => {
        let result:(ICar | null)[] = hashTable.FindList(brand);
        return {type: CarActionsEnum.FIND_CAR_LIST, payload: result}
    },

    DeleteAllCars: ():CarAction => {
        hashTable.ClearHash();
        return {type: CarActionsEnum.DELETE_ALL_CARS, payload: []}
    },
}