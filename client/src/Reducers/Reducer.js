/**
 * @author Rohan Gajjar
 */
import { DELETE_SELECT_EMPLOYEE, SUBMIT_DATA, SELECT_EDIT_LIST, UPDATE_SELECTED_USERDATA, GET_DATA, ASSENDINGORDERDATA, PAGGINATION, GET_ALL_COUNTRY, GET_STATE, GET_CITIES, LOGIN_USER, LOGOUT_USER } from "../actions/Type"

const initialState = {

    employeeList: [],
    data: [],
    newState: [],
    newcities: [],
    loginStatus: false

}

const employeeReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_DATA: return { ...state, employeeList: action.payload }

        case GET_ALL_COUNTRY: return { ...state, data: action.payload }

        case GET_STATE: return { ...state, newState: action.payload }

        case GET_CITIES: return { ...state, newcities: action.payload }

        case ASSENDINGORDERDATA: return { ...state, employeeList: action.payload }

        case PAGGINATION: return { ...state, employeeList: action.payload }

        case SUBMIT_DATA: action.userData = { ...action.userData, }

            return {
                employeeList: [...state.employeeList, action.userData]
            }
        case LOGIN_USER: console.log("hello Login USer"); return { ...state, loginStatus: true }
        case LOGOUT_USER: console.log("hello"); return { ...state, employeeList: [] }

        default:
            return state;
    }
}

export default employeeReducer;