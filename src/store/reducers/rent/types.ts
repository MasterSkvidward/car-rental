export interface IRent {
    driverLicenceNumber: string;
    stateRegistrationNumber: string;
    rentDate: string;
    returnDate: string;
}


export interface RentState {
    cars: IRent[];
}

export enum RentActionsEnum {
    ADD_RENT = "ADD_RENT",
}


interface AddRentAction {
    type: RentActionsEnum.ADD_RENT;
    payload: {};
}

export type RentAction = 
    AddRentAction
