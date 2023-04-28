import { HashTable } from "../../../data-structures/cars";
import { CarAction, CarActionsEnum, ICar } from "./types";



export const CarActionCreators = {
    InitializeHashtable: ():CarAction => {
        const carKeys: string[] = [];
        const hashTable = new HashTable();
        
        const response: ICar[] = require('../../server/cars.json');

        for (const element of response) {
            hashTable.Insert(element.stateRegistrationNumber, element);
            carKeys.push(element.stateRegistrationNumber)
        }

        return {type: CarActionsEnum.INITIALIZE_HASHTABLE, payload: {hashTable: hashTable, carKeys:carKeys}};
    }, 

    AddCar: (car: ICar):CarAction => ({type: CarActionsEnum.ADD_CAR, payload: car}),

    DeleteCar: (registrationNumber: string):CarAction => ({type: CarActionsEnum.DELETE_CAR, payload: registrationNumber}),

    FindCar: (registrationNumber: string):CarAction => ({type: CarActionsEnum.FIND_CAR, payload: registrationNumber}),

    FindCarList: (brand: string):CarAction => {
        return {type: CarActionsEnum.FIND_CAR_LIST, payload: brand}
    },

    DeleteAllCars: ():CarAction => {
        return {type: CarActionsEnum.DELETE_ALL_CARS}
    },

    ChangeAvailableStatus: (registrationNumber: string, available: boolean):CarAction => ({type: CarActionsEnum.CHANGE_AVAILABLE_STATUS, payload: {registrationNumber: registrationNumber, available: available}}),
}
