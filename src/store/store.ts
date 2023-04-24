import { legacy_createStore } from "redux";
import { rootReducer } from "./reducers/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";


export const store = legacy_createStore(rootReducer, composeWithDevTools())