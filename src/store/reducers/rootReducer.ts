import {combineReducers} from 'redux';
import { store } from '../store';
import carReducer from './car/carReducer';
import clientrReducer from './client/clientReducer';
import rentReducer from './rent/rentReducer';


export const rootReducer = combineReducers({
    car: carReducer,
    client: clientrReducer,
    rent: rentReducer,
})


export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch;