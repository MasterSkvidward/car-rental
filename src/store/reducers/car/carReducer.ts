import { HashTable } from "../../../data-structures/cars";
import { CarActionsEnum } from "./types";
import { CarAction } from "./types";
import { CarState } from "./types";


const initialState = {
    HashTable: new HashTable(),
    carKeys: [],
    cars: [],
    currentCar: null,
}


export default function carReducer(state = initialState, action:CarAction): CarState {
    switch (action.type) {
        case CarActionsEnum.INITIALIZE_HASHTABLE:
            return {...state, HashTable: action.payload.hashTable, carKeys: action.payload.carKeys, cars: action.payload.hashTable.GetAllCars()};

        case CarActionsEnum.ADD_CAR:
            state.HashTable.Insert(action.payload.stateRegistrationNumber, action.payload);
            return {...state, cars: [...state.cars, action.payload], carKeys: [...state.carKeys, action.payload.stateRegistrationNumber] };

        case CarActionsEnum.DELETE_CAR:
            state.HashTable.Delete(action.payload)
            return {...state, cars: state.HashTable.GetAllCars(), carKeys: state.carKeys.filter(regNumber => regNumber !== action.payload) };

        case CarActionsEnum.FIND_CAR:
            const car = state.HashTable.FindElement(action.payload);
            return {...state, currentCar: car, cars: state.HashTable.GetAllCars()};

        case CarActionsEnum.FIND_CAR_LIST:
            return {...state, cars: state.HashTable.FindList(action.payload)};
       
        case CarActionsEnum.DELETE_ALL_CARS:
            state.HashTable?.ClearHash();
            return {...state, cars: [], carKeys: []};

        case CarActionsEnum.CHANGE_AVAILABLE_STATUS: 
            let selectedCar = state.HashTable.FindSegment(action.payload.registrationNumber)
            if (selectedCar?.Value) selectedCar.Value.isAvailable = action.payload.available
            return {...state, cars: state.HashTable.GetAllCars()};

        default:
            return state;
    }
}