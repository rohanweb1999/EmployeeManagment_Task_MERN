/**
 * @author Rohan Gajjar
 */
////////////////    start load Modules //////////////////////////////////////
import { DELETE_SELECT_EMPLOYEE, GET_ALL_COUNTRY, GET_CITIES, GET_DATA, GET_STATE, LOGIN_USER, LOGOUT_USER, SELECT_EDIT_LIST, SERCH_USER_DATA, SUBMIT_DATA, UPDATE_USER } from "../actions/Type"
import Axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()
///////////////////// load modules end ///////////////////////////////////////




//******************************* */ Actions start *******************************************//
export const fetchData = (pageNumber, selectOption, searchUser) => {

    return (
        (dispatch) => {
            Axios.get(`/getUser/?Page=${pageNumber}&Sort=${selectOption}&Request=${searchUser}`)
                .then((res) => {
                    const data = res.data
                    console.log(data);
                    dispatch({ type: GET_DATA, payload: data })
                })
        }
    )
}


export const getAllCountries = () => {

    return (
        (dispatch) => {
            Axios.get("/getAllCountries")
                .then((res) => {
                    const result = res.data
                    dispatch({ type: GET_ALL_COUNTRY, payload: result })
                })
        }
    )
}
export const getState = (selectedCountryId) => {

    return (
        (dispatch) => {
            Axios.get(`/getState/${selectedCountryId}`)
                .then((res) => {
                    const result = res.data
                    dispatch({ type: GET_STATE, payload: result })
                })
        }
    )
}
export const getCities = (stateId) => {

    return (
        (dispatch) => {
            Axios.get(`/getcities/${stateId}`)
                .then((res) => {
                    const result = res.data
                    dispatch({ type: GET_CITIES, payload: result })
                })
        }
    )
}

export const submitData = (userData) => {
    Axios.post('/signUp', userData)
        .then((res) => {
            const result = res.data
            console.log(result);
            if (result === "user Already Exist") {
                toast.error(result, { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })

            } else {
                toast.success(result, { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });

            }
        })
        .catch(err => {
            toast.error("Invalid Registration", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
        })
    return {
        type: SUBMIT_DATA,
        userData
    }
}
export const deleteSelectEmployee = (id) => {
    Axios.delete(`/deleteUser/${id}`)
        .then(() => {
            toast.warning("Record deleted", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
            window.location.reload()
        })
        .catch(err => {
            console.log("error" + err);
        })
    return {
        type: DELETE_SELECT_EMPLOYEE,
        id,
    }
}

export const selectEditList = (id) => {
    return {
        type: SELECT_EDIT_LIST,
        id
    }
}
export const updateSelectedUserdata = (id, data, email) => {
    return (
        (dispatch) => {
            Axios.put(`/updateUser/${id}/${email}`, data)
                .then((res) => {
                    const error = res.data
                    dispatch({ type: UPDATE_USER, payload: error })
                })
        }
    )
}

export const loginUserData = (data) => {
    Axios.post(`/signIn`, data)
        .then((res) => {
            console.log("hello");
            const result = res.data
            console.log(result)
            window.location.reload()
            toast.success('Login successfully', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
        })
        .catch(err => {
            console.log("error" + err);
        })
}

export const logoutUser = () => {
    Axios.get(`/logout`)
        .then(() => {

            window.location.reload()
            toast.info('Logout', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
        })
    return {
        type: LOGOUT_USER
    }
}


export const searchUser = (searchData) => {
    return (
        (dispatch) => {
            Axios.get(`/dashboard/getData/search=${searchData}`)
                .then((res) => {
                    const data = res.data
                    dispatch({ type: SERCH_USER_DATA, payload: data })
                })
        }
    )

}