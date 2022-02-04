/**
 * @author Rohan Gajjar
 */
import { SUBMIT_DATA, GET_DATA, ASSENDINGORDERDATA, PAGGINATION, GET_ALL_COUNTRY, GET_STATE, GET_CITIES, LOGIN_USER, LOGOUT_USER, UPDATE_USER } from "../actions/Type"

const initialState = {
    loginAuthenticateUser: "",
    employeeList: [],
    data: [],
    newState: [],
    newcities: [],
    page: [],
    loginStatus: true,
    emailExist: ""
}

const employeeReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_DATA: return { ...state, employeeList: action.payload.users, page: action.payload.totalPage, loginAuthenticateUser: action.payload.loginAuthenticateUser }

        case GET_ALL_COUNTRY: return { ...state, data: action.payload }

        case GET_STATE: return { ...state, newState: action.payload }

        case GET_CITIES: return { ...state, newcities: action.payload }

        case ASSENDINGORDERDATA: return { ...state, employeeList: action.payload }

        case PAGGINATION: return { ...state, employeeList: action.payload }

        case SUBMIT_DATA: return { ...state, emailExist: action.payload }
        case UPDATE_USER: return { ...state, emailExist: action.payload.msg }
        case LOGIN_USER: return { ...state, loginStatus: true }
        case LOGOUT_USER: return { ...state, employeeList: [] }

        default:
            return state;
    }
}

export default employeeReducer;