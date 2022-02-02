
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
import Stack from '@mui/material/Stack';
import debounce from 'lodash.debounce';
import { deleteSelectEmployee, fetchData, logoutUser } from "./actions";
toast.configure()
//*******************************Load Module End******************************* */


const Dashboard = () => {

    ///////////********Usestate***********************///////// */
    const [page, setpage] = useState(1)
    const [selectOption, setselectOption] = useState("ascending")


    ///////////////UseSelector/////////////////////////////////
    const employeeList = useSelector(state => state.employeeReducer.employeeList)

    const dispatch = useDispatch();

    /////////////// Useeffect for  fetchdata /////////////////////////////
    useEffect((e) => {
        dispatch(fetchData(page, selectOption))
    }, [page, selectOption, dispatch])


    ///////////////  UseEffect for Dispatch delete function API /////////////////////////////
    const handleDelete = (id) => {
        window.confirm("Confirm Delete User")
        dispatch(deleteSelectEmployee(id))
    }
    const onchangeChandler = event => {
        setselectOption(event.target.value)
    }
    const debouncedOnChange = debounce(onchangeChandler, 500)
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
                                employeeList.map((element, index, country) => {
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
                                                    <button onClick={() => handleDelete(element._id)}>Delete</button>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                            }


                        </div>
                        <div className="pagination" >

                            <Stack spacing={2} >
                                <Pagination count={5} color="secondary" onChange={(e, value) => setpage(value)} />
                            </Stack>

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