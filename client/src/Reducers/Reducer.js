/**
 * @author Rohan Gajjar
 */
import { SUBMIT_DATA, GET_DATA, ASSENDINGORDERDATA, PAGGINATION, GET_ALL_COUNTRY, GET_STATE, GET_CITIES, LOGIN_USER, LOGOUT_USER, UPDATE_USER, DELETE_SELECT_EMPLOYEE, VALID_REGISTER_CHECK, FILE_UPLOAD, FETCH_FILES, LOADER, DELETE_TOGGLE_FILES } from "../actions/Type"

const initialState = {
    loginAuthenticateUser: "",
    employeeList: [],
    data: [],
    newState: [],
    newcities: [],
    page: [],
    pageNumberForFiles: [],
    usersFiles: [],
    loginStatus: true,
    emailExist: false,
    deleteUser: false,
    validUser: false,
    loader: false,
    deleteFileToggle: false
}

const employeeReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_DATA:
            return {
                ...state,
                employeeList: action.payload.users,
                page: action.payload.totalPage,
                loginAuthenticateUser: action.payload.loginAuthenticateUser,
                emailExist: false,
                deleteUser: false,
                loginStatus: false

            }

        case GET_ALL_COUNTRY: return { ...state, data: action.payload }

        case GET_STATE: return { ...state, newState: action.payload }

        case GET_CITIES: return { ...state, newcities: action.payload }

        case ASSENDINGORDERDATA: return { ...state, employeeList: action.payload }

        case PAGGINATION: return { ...state, employeeList: action.payload }

        case SUBMIT_DATA: return { ...state, emailExist: action.payload, validUser: true }
        case VALID_REGISTER_CHECK: return { ...state, validUser: false }
        case UPDATE_USER: return { ...state, emailExist: true }
        case LOGIN_USER:

            return {
                ...state,
                loginStatus: false
            }
        case DELETE_SELECT_EMPLOYEE:
            return {
                ...state,
                deleteUser: true,
                loginStatus: action.payload,

            }
        case LOGOUT_USER:
            return {
                ...state,
                employeeList: [],
                loginStatus: true,
                loginAuthenticateUser: ""
            }
        case LOADER:
            return {
                ...state,
                loader: false
            }
        case FILE_UPLOAD:
            return {
                ...state,
                loader: true

            }
        case FETCH_FILES:
            return {
                ...state,
                usersFiles: action.payload.result,
                pageNumberForFiles: action.payload.totalPage,
                deleteFileToggle: false,
                loginStatus: false,
                loginAuthenticateUser: action.payload.loginAuthenticateUser
            }
        case DELETE_TOGGLE_FILES:
            return {
                ...state,
                deleteFileToggle: true
            }
        default:
            return state;
    }
}

export default employeeReducer;