import Cars from "../../../pages/Cars";
import { CarActionsEnum } from "./types";
import { CarAction } from "./types";
import { CarState } from "./types";


const initialState = {
    cars: [],
    car: {},
}


export default function carReducer(state = initialState, action:CarAction): CarState {
    switch (action.type) {
        case CarActionsEnum.INITIALIZE_HASHTABLE:
            return {...state, cars: action.payload};

        case CarActionsEnum.ADD_CAR:
            return {...state, cars: [...state.cars, action.payload]};

        default:
            return state;
    }
}