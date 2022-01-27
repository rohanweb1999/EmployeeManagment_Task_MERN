import { DELETE_SELECT_EMPLOYEE, SUBMIT_DATA, SELECT_EDIT_LIST, UPDATE_SELECTED_USERDATA, GET_DATA, ASSENDINGORDERDATA, PAGGINATION, GET_ALL_COUNTRY, GET_STATE, GET_CITIES } from "../actions/Type"

const initialState = {

    employeeList: [],
    data: [],
    newState: [],
    newcities: [],

}

const employeeReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_DATA:

            return {
                ...state,
                employeeList: action.payload
            }
        case GET_ALL_COUNTRY:

            return {
                ...state,
                data: action.payload
            }
        case GET_STATE:

            return {
                ...state,
                newState: action.payload
            }
        case GET_CITIES:

            return {
                ...state,
                newcities: action.payload
            }

        case ASSENDINGORDERDATA:
            return {
                ...state,
                employeeList: action.payload
            }
        case PAGGINATION:
            return {
                ...state,
                employeeList: action.payload
            }
        case SUBMIT_DATA:
            action.userData = {
                ...action.userData,
            }
            return {
                employeeList: [...state.employeeList, action.userData],
                tempData: [...state.employeeList, action.userData]

            }


        case DELETE_SELECT_EMPLOYEE:

            return {
                ...state,
                employeeList: state.employeeList.filter((e) => e.id !== action.id),
                tempData: state.employeeList.filter((e) => e.id !== action.id)
            }
        // case SERCH_USER_DATA:
        //     console.log("actionData", action.payload);
        //     return {
        //         ...state,
        //         employeeList: action.payload,
        //     }
        case SELECT_EDIT_LIST:
            console.log("action.id", action.id);
            const selectedObj = state.tempData.find(
                (element) => element.id === action.id
            );
            console.log(selectedObj);
            return {
                ...state,
                selectedEditId: action.id,
                formState: selectedObj,
            };

        case UPDATE_SELECTED_USERDATA:
            // const newUpdateData = state.employeeList.map((e) => e.id === state.selectedEditId ? { ...e, data: state.formState } : e)
            const empInd = state.employeeList.findIndex(res => res.id === action.id)
            // const tempInd = state.tempData.findIndex(res => res.id === action.id)
            state.employeeList[empInd] = action.data
            state.tempData[empInd] = action.data
            return {
                ...state
            }

        default:
            return state;
    }
}

export default employeeReducer;