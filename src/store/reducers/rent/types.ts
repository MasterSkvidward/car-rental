import { CircularLinkedList } from "../../../utils/sorts";

export interface IRent {
    driverLicenceNumber: string;
    stateRegistrationNumber: string;
    rentDate: string;
    returnDate: string;
}


export interface RentState {
    CircularLinkedList: CircularLinkedList;
}

export enum RentActionsEnum {
    ADD_RENT = "ADD_RENT",
    DELETE_RENT = "DELETE_RENT",
    DELETE_ALL_RENTS = "DELETE_ALL_RENTS",
    DELETE_RENT_BY_CAR_NUMBER ="DELETE_RENT_BY_CAR_NUMBER"
}

interface AddRentAction {
    type: RentActionsEnum.ADD_RENT;
    payload: IRent;
}

interface DeleteRentAction {
    type: RentActionsEnum.DELETE_RENT;
    payload: string;
}

interface DeleteRentByCarNumberAction {
    type: RentActionsEnum.DELETE_RENT_BY_CAR_NUMBER;
    payload: string;
}

interface DeleteAllRentsAction {
    type: RentActionsEnum.DELETE_ALL_RENTS;
}


export type RentAction = 
     AddRentAction | DeleteRentAction | DeleteRentByCarNumberAction | DeleteAllRentsAction
