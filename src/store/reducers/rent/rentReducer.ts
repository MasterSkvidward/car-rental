import { RentAction, RentActionsEnum } from "./types";
import { CircularLinkedList } from "../../../utils/sorts";
import { RentState } from "./types";



const initialState: RentState = {
    CircularLinkedList: new CircularLinkedList(),
}


export default function rentReducer(state = initialState, action:RentAction): RentState {
    switch (action.type) {
        case RentActionsEnum.ADD_RENT:
            state.CircularLinkedList?.Add(action.payload);
            return {...state};

        case RentActionsEnum.DELETE_RENT:
            state.CircularLinkedList?.Remove(action.payload);
            return {...state};

        
        case RentActionsEnum.DELETE_RENT_BY_CAR_NUMBER:
            state.CircularLinkedList?.DeleteByCarNumber(action.payload);
            return {...state};

        case RentActionsEnum.DELETE_ALL_RENTS:
            state.CircularLinkedList?.ClearList();
            return {...state};

        default:
            return state;
    }
}