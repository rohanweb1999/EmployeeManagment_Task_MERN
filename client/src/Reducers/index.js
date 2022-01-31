/**
 * @author Rohan Gajjar
 */
import employeeReducer from './Reducer';

import { combineReducers } from "redux";

const rootReducer = combineReducers({
    employeeReducer,
})

export default rootReducer;