
import {IRent, RentAction, RentActionsEnum } from "./types";


export const RentActionCreators = {
    // InitializeCyclicList: ():RentAction => {  

    //     return {type: RentActionsEnum.INITIALIZE_CYCLIC_LIST, payload: {avlTree: avlTree, uniqueKeys: uniqueKeys}}
    // }, 

    AddRent: (rent: IRent):RentAction => ({type: RentActionsEnum.ADD_RENT, payload: rent}),

    DeleteRent: (regNumber: string):RentAction => ({type: RentActionsEnum.DELETE_RENT, payload: regNumber}),

    DeleteRentByCarNumber: (driverLicence: string):RentAction => ({type: RentActionsEnum.DELETE_RENT_BY_CAR_NUMBER, payload: driverLicence}),

    DeleteAllRents: ():RentAction => ({type: RentActionsEnum.DELETE_ALL_RENTS}),

}