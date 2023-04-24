import { RentAction } from "./types";
import { RentState } from "./types";



const initialState = {
    cars: [],
}


export default function rentReducer(state = initialState, action:RentAction): RentState {
    switch (action.type) {
        // case CarActionsEnum.ADD_CAR:
        //     return {...state};

        default:
            return state;
    }
}