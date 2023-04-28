import { HashTable } from "../../../data-structures/cars";

export interface ICar {
    stateRegistrationNumber: string;
    brand: string;
    color: string;
    releaseYear: number;
    isAvailable: boolean;
}


export interface CarState {
    carKeys: string[];
    HashTable: HashTable | null;
    cars: (ICar | null)[];
    currentCar: ICar | null;
}

export enum CarActionsEnum {
    ADD_CAR = "ADD_CAR",
    DELETE_CAR = "DELETE_CAR",
    FIND_CAR = "FIND_CAR",
    INITIALIZE_HASHTABLE = "INITIALIZE_HASHTABLE",
    DELETE_ALL_CARS = "DELETE_ALL_CARS",
    FIND_CAR_LIST = "FIND_CAR_LIST",
    CHANGE_AVAILABLE_STATUS = "CHANGE_AVAILABLE_STATUS"
}

interface InitializeHashtableAction {
    type: CarActionsEnum.INITIALIZE_HASHTABLE;
    payload: {
        hashTable: HashTable,
        carKeys: string[],
    }
}

interface AddCarAction {
    type: CarActionsEnum.ADD_CAR;
    payload: ICar;
}

interface DeleteCarAction {
    type: CarActionsEnum.DELETE_CAR;
    payload: string;
}


interface FindCarListAction {
    type: CarActionsEnum.FIND_CAR_LIST;
    payload: string;
}

interface FindCarAction {
    type: CarActionsEnum.FIND_CAR;
    payload: string;
}

interface DeleteAllCarsAction {
    type: CarActionsEnum.DELETE_ALL_CARS;
    // payload: [];
}

interface ChangeAvailableStatus {
    type: CarActionsEnum.CHANGE_AVAILABLE_STATUS;
    payload: {
        registrationNumber: string,
        available: boolean
    }
}


export type CarAction = 
     InitializeHashtableAction | DeleteCarAction | AddCarAction | FindCarListAction | FindCarAction | ChangeAvailableStatus | DeleteAllCarsAction
