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
}

interface AddCarAction {
    type: CarActionsEnum.ADD_CAR;
    payload: ICar;
}

interface InitializeHashtableAction {
    type: CarActionsEnum.INITIALIZE_HASHTABLE;
    payload: (ICar | null)[];
}

export type CarAction = 
     InitializeHashtableAction | AddCarAction
