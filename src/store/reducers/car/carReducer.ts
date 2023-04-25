import Cars from "../../../pages/Cars";
import { CarActionsEnum } from "./types";
import { CarAction } from "./types";
import { CarState } from "./types";


const initialState = {
    cars: [],
}


export default function carReducer(state = initialState, action:CarAction): CarState {
    switch (action.type) {
        case CarActionsEnum.INITIALIZE_HASHTABLE:
            return {...state, cars: action.payload};

        case CarActionsEnum.ADD_CAR:
            return {...state, cars: [...state.cars, action.payload]};

        case CarActionsEnum.FIND_CAR_LIST:
            return {...state, cars: action.payload};

        case CarActionsEnum.DELETE_ALL_CARS:
            console.log('CarActions DELETE_ALL');
            
            return {...state, cars: action.payload};

        default:
            return state;
    }
}