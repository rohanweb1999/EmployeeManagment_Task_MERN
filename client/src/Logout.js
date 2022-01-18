// import React, { useEffect, useContext } from 'react'
// import Axios from "axios";
// import { useHistory } from 'react-router-dom';
// import { loginContext } from './App'
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// toast.configure()
// const Logout = () => {

//     const dispatch = useContext(loginContext);

//     const history = useHistory();
//     useEffect(() => {
//         //for logout
//         Axios.get(`/logout`)
//             .then(() => {
//                 dispatch({ type: 'LoginUser', payload: false })
//                 toast.error('Logout', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
//                 history.push('/');
//             })
//             .catch(err => {
//                 console.log(err);
//                 history.push('/signin');
//             })

//     }, [])
//     return (
//         <>

//         </>
//     )
// }

// export default Logout