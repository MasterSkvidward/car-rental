import { HashTable } from "../../../data-structures/cars";

export interface ICar {
    stateRegistrationNumber: string;
    brand: string;
    color: string;
    releaseYear: number;
    isAvailable: boolean;
}


export interface CarState {
    cars: (ICar | null)[];
}

export enum CarActionsEnum {
    ADD_CAR = "ADD_CAR",
    INITIALIZE_HASHTABLE = "INITIALIZE_HASHTABLE",
    DELETE_ALL_CARS = "DELETE_ALL_CARS",
    FIND_CAR_LIST = "FIND_CAR_LIST",
}

interface InitializeHashtableAction {
    type: CarActionsEnum.INITIALIZE_HASHTABLE;
    payload: (ICar | null)[];
}

interface AddCarAction {
    type: CarActionsEnum.ADD_CAR;
    payload: ICar;
}

interface FindCarListAction {
    type: CarActionsEnum.FIND_CAR_LIST;
    payload: (ICar|null)[];
}

interface DeleteAllCarsAction {
    type: CarActionsEnum.DELETE_ALL_CARS;
    payload: [];
}


export type CarAction = 
     InitializeHashtableAction | AddCarAction | FindCarListAction | DeleteAllCarsAction
