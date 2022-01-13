import { React, useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'animate.css';
import { assendingOrderGetData, deleteSelectEmployee, fetchData, logoutUser, searchUser, sortUserData } from "./actions";
toast.configure()

const Dashboard = () => {
    const employeeList = useSelector(state => state.employeeReducer.employeeList)
    // console.log("empdata", employeeList);
    // const dispatch = useContext(loginContext);
    const dispatch = useDispatch();

    //store the user data
    // const [employeeList, setEmployeeList] = useState([]);

    //destructuring the user data
    // const { _id, firstName, lastName, email, contact, profession, salary } = employeeList;
    const [searchData, setSearchData] = useState('')
    const history = useHistory();
    const [selectOption, setselectOption] = useState('')
    useEffect(() => {
        dispatch(fetchData())
    }, [])

    const handleDelete = (id) => {
        history.push('/')
        dispatch(deleteSelectEmployee(id))
    }
    // useEffect(() => {
    //     dispatch(sortUserData(selectOption))
    // }, [selectOption])
    console.log(selectOption);
    return (
        <div className="das-main-div">
            <div className="das-sub-div">
                <input onChange={e => setSearchData(e.target.value)} value={searchData} placeholder="Search Employee..." />
                <button onClick={() => dispatch(searchUser(searchData), setSearchData(''), console.log("submittData", searchData))}>Search</button>
            </div>
            <div className="menu-bar" >
                <NavLink to="Logout"><button className='logout-btn' onClick={() => dispatch(logoutUser())}>LOG OUT</button></NavLink>
                <div className="custom-select" >

                    <NavLink to={`/:sortBy=${selectOption}`}><select onClick={(e) => setselectOption(e.target.value)}>
                        <option  >Sort By</option>
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
                                <div className="employeeData">
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
        </div >

    );
};

export default Dashboard;