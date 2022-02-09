
/**
 * @author Rohan Gajjar
 */

//*******************************Load Module Start******************************* */
import { React, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'animate.css';
import Pagination from '@mui/material/Pagination';
import debounce from 'lodash.debounce';
import { deleteSelectEmployee, fetchData } from "./actions";

toast.configure()
//*******************************Load Module End******************************* */


const Dashboard = () => {

    ///////////********Usestate***********************///////// */
    const [pageNumber, setpageNumber] = useState(1)
    const [selectOption, setselectOption] = useState("ascending")
    const [request, setRequest] = useState("")
    ///////////////UseSelector/////////////////////////////////

    const employeeList = useSelector(state => state.employeeReducer.employeeList)
    const deleteUser = useSelector(state => state.employeeReducer.deleteUser)
    const page = useSelector(state => state.employeeReducer.page)

    const dispatch = useDispatch();

    ///////////////  UseEffect for Dispatch delete function API /////////////////////////////
    const handleDelete = (id) => {

        if (window.confirm("Confirm Delete User")) {
            dispatch(deleteSelectEmployee(id))
        }

    }
    const onchangeChandler = event => {
        setpageNumber(1)
        setRequest(event.target.value)
    }
    const debouncedOnChange = debounce(onchangeChandler, 500)

    /////////////// Useeffect for  fetchdata /////////////////////////////
    useEffect((e) => {
        dispatch(fetchData(pageNumber, selectOption, request))
    }, [pageNumber, dispatch, selectOption, request, deleteUser])


    return (
        <>        <div className="das-main-div">

            <div className="das-sub-div">
                <input onChange={debouncedOnChange} placeholder="Search Employee..." />
            </div>
            <div className="menu-bar" >

                <div className="custom-select" >
                    <select onClick={(e) => setselectOption(e.target.value)}>
                        <option disabled >sortBy</option>
                        <option value="ascending" >A-Z</option>
                        <option value="descending" >Z-A</option>

                    </select>
                </div>
            </div>
            {
                page !== 0 ? (
                    <>
                        <div className="list-div" >
                            {
                                employeeList.map((element) => {
                                    return (
                                        <>
                                            <div className="employeeData" key={element._id}>
                                                <div className="employeeFeild">
                                                    <label>FirstName:-</label>
                                                    <p>{element.firstName}</p>
                                                </div>
                                                <div className="employeeFeild">
                                                    <label>LastName:-</label>
                                                    <p>{element.lastName}</p>
                                                </div>
                                                <div className="employeeFeild">
                                                    <label>Email:-</label>
                                                    <p>{element.email}</p>
                                                </div>
                                                <div className="employeeFeild">
                                                    <label>Contact:-</label>
                                                    <p>{element.contact}</p>
                                                </div>
                                                <div className="employeeFeild">
                                                    <label>Profession:-</label>
                                                    <p>{element.profession}</p>
                                                </div>

                                                <div className="employeeFeild">
                                                    <label>Country:-</label>
                                                    <p>{element.country && element.country.map((item => item.countryName))}</p>
                                                </div>
                                                <div className="employeeFeild">
                                                    <label>State:-</label>
                                                    <p>{element.state && element.state.map((item => item.stateName))}</p>
                                                </div>
                                                <div className="employeeFeild">
                                                    <label>City:-</label>
                                                    <p>{element.city && element.city.map((item => item.cityName))}</p>
                                                </div>
                                                <div className="employeeFeild">
                                                    <label>Salary of Jan:-</label>
                                                    <p>{element.salaryJan}</p>
                                                </div>
                                                <div className="employeeFeild">
                                                    <label>Salary of Feb:-</label>
                                                    <p>{element.salaryFeb}</p>
                                                </div>
                                                <div className="employeeFeild">
                                                    <label>Salary of Mar:-</label>
                                                    <p>{element.salaryMar}</p>
                                                </div>
                                                <div className="employeeFeild">
                                                    <label>Total salary:-</label>
                                                    <p>{element.totalSalary}</p>
                                                </div>

                                                <div className="functionalButtons">
                                                    <NavLink to={`/editUser/:?id=${element._id}`}>
                                                        <button>Edit</button>
                                                    </NavLink>
                                                    <button onClick={() => handleDelete(element.email)}>Delete</button>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                            }


                        </div>
                        <div className="pagination" >

                            <Pagination count={page} variant="outlined" color="secondary" onChange={(e, value) => {
                                setpageNumber(value)
                            }} />

                        </div>
                    </>
                ) : (
                    <>
                        <div><h1>NO DATA FOUND</h1></div>
                    </>
                )
            }

        </div >
        </>


    )
}

export default Dashboard;