import { React, useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'animate.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { deleteSelectEmployee, fetchData, logoutUser, paggination, searchUser, sortUserData } from "./actions";
toast.configure()

const Dashboard = () => {
    const [page, setpage] = useState('')
    const [selectOption, setselectOption] = useState('')
    const [searchData, setSearchData] = useState('')
    const employeeList = useSelector(state => state.employeeReducer.employeeList)

    const dispatch = useDispatch();
    const history = useHistory();

    ///////////////  fetchdata /////////////////////////////
    useEffect(() => {
        dispatch(fetchData())
    }, [])
    ///////////////  fetchdata /////////////////////////////

    ///////////////////********** for sorting *********************///////////////
    useEffect(() => {
        dispatch(sortUserData(selectOption))
    }, [selectOption])
    ///////////////////********** for sorting *********************///////////////



    const handleDelete = (id) => {
        history.push('/')
        dispatch(deleteSelectEmployee(id))
    }


    ///////// for paggination ///////////////////////
    useEffect(() => {
        // console.log("page", page);
        history.push(`/dashboard/getUserBy/page/${page}`)
        dispatch(paggination(page))

    }, [page])
    return (
        <div className="das-main-div">
            <div className="das-sub-div">
                <input onChange={e => setSearchData(e.target.value)} value={searchData} placeholder="Search Employee..." />
                <button onClick={() => dispatch(searchUser(searchData), setSearchData(''), console.log("submittData", searchData))}>Search</button>
            </div>
            <div className="menu-bar" >
                <NavLink to="/logout"><button className='logout-btn' onClick={() => dispatch(logoutUser())}>LOG OUT</button></NavLink>
                <div className="custom-select" >
                    <NavLink to={`/dashboard/getUserBy/${selectOption}`}><select onClick={(e) => setselectOption(e.target.value)}>
                        <option disabled >sortBy</option>
                        <option value="ascending" >A-Z</option>
                        <option value="descending" >Z-A</option>

                    </select>
                    </NavLink>
                </div>
            </div>
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
        </div >

    );
};

export default Dashboard;