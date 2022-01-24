////////////////    start load Modules //////////////////////////////////////
import { DELETE_SELECT_EMPLOYEE, GET_DATA, LOGOUTUSR, SELECT_EDIT_LIST, SERCH_USER_DATA, SUBMIT_DATA, UPDATE_SELECTED_USERDATA } from "../actions/Type"
import Axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()
///////////////////// load modules end ///////////////////////////////////////




//******************************* */ Actions start *******************************************//
export const fetchData = (pageNumber, selectOption, searchData) => {

    return (
        (dispatch) => {
            Axios.get(`/dashboard/getData/page=${pageNumber}/${selectOption}`)
                .then((res) => {
                    const data = res.data
                    dispatch({ type: GET_DATA, payload: data })
                })
        }
    )
}

export const submitData = (userData) => {
    Axios.post('/signUp', userData)
        .then((res) => {
            toast.success("Registered Sucessfully", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
        })
        .catch(err => {
            toast.error("Invalid Registration", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
        })
    return {
        type: SUBMIT_DATA,
        userData,
    }
}
export const deleteSelectEmployee = (id) => {
    // Axios.post(`/deleteUser/${id}`, id)
    Axios.delete(`/deleteUser/${id}`)
        .then(() => {
            window.location.reload()
            toast.warning("Record deleted", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
        })
        .catch(err => {
            console.log("error" + err);
        })
    return {
        type: DELETE_SELECT_EMPLOYEE,
        id,
    }
}
// export const searchInputData = (data) => {
//     // axios.get(`http://localhost:3001/getEmployee?name='xyz'&salary='500'`)
//     // axios.post(`http://localhost:3001/getEmployee`, {name: 'xyz', salary: '500'})
//     return {
//         type: SERCH_USER_DATA,
//         data
//     }
// }
export const selectEditList = (id) => {
    return {
        type: SELECT_EDIT_LIST,
        id
    }
}
export const updateSelectedUserdata = (id, data) => {
    Axios.put(`/updateUser/${id}`, data)
        .then(() => {
            toast.success("Data Update Successfully", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })

        })
    return {
        type: UPDATE_SELECTED_USERDATA,
        id,
        data
    }
}

export const loginUserData = (data) => {
    // console.log("data", data);
    Axios.post(`/signIn`, data)
        .then(() => {
            toast.success('Login successfully', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
        })
}

export const logoutUser = () => {
    Axios.get(`/logout`)
        .then(() => {
            toast.info('Logout', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
        })
    return {
        type: LOGOUTUSR
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

// export const sortUserData = (pageNumber, selectOption) => {
//     // console.log("selectOption", selectOption);
//     return (
//         (dispatch) => {
//             Axios.get(`/dashboard/getData/sort=${selectOption}`)
//                 .then((res) => {
//                     const data = res.data
//                     console.log("Assending Api", res.data);
//                     dispatch({ type: ASSENDINGORDERDATA, payload: data })
//                 })
//         }
//     )

// }

// export const paggination = (pageNumber) => {
//     console.log("pageNumber", pageNumber);
//     return (
//         (dispatch) => {
//             Axios.get(`/dashboard/getData/page=${pageNumber}`)
//                 .then((res) => {
//                     const data = res.data
//                     dispatch({ type: PAGGINATION, payload: data })
//                 })
//         }
//     )

// }   