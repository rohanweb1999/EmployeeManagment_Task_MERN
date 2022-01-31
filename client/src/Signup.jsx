/**
 * @author Rohan Gajjar
 */

/////////////////////////////////////////////////////////////////////////////////////
/******************Load module start ***********************************************/
/////////////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from "react";
import Axios from 'axios'
import { TextField } from "@material-ui/core";
import "./App.css";
import { NavLink, useHistory } from "react-router-dom";
import sideImg from "../src/employee.png";
import { Form, Button } from "antd";
import { useFormik } from "formik";
import queryString from 'query-string';
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from "react-redux";
import { getAllCountries, getCities, getState, submitData, updateSelectedUserdata } from "./actions";
/////////////////////////////////////////////////////////////////////////////////////
/******************Load module End ***********************************************/
/////////////////////////////////////////////////////////////////////////////////////


const Signup = () => {


    const dispatch = useDispatch()
    const history = useHistory();
    //Here ID will find
    const { id } = queryString.parse(window.location.search)
    // const formState = useSelector((state) => state.employeeReducer.formState)


    ///////////////////////////////  UseState Start /////////////////////////////////////////
    const [editedData, seteditedData] = useState([])  //Here Edited Data store
    const [selectedCountryId, setselectedCountryId] = useState();  //user Selected  country Id
    const [stateId, setStateId] = useState(''); // user Selected State Id
    ///////////////////////////////  UseState End /////////////////////////////////////////

    ///////////////////////////////  UseSelector Start /////////////////////////////////////////
    const data = useSelector((state) => state.employeeReducer.data);
    const newState = useSelector((state) => state.employeeReducer.newState);
    const newcities = useSelector((state) => state.employeeReducer.newcities);
    ///////////////////////////////  UseSelector End /////////////////////////////////////////


    ///////////////////////////////  UseEffect Start /////////////////////////////////////////
    useEffect(() => {
        dispatch(getAllCountries())
    }, [])
    useEffect(() => {
        if (selectedCountryId) {
            dispatch(getState(selectedCountryId))
        }

    }, [selectedCountryId])


    useEffect(() => {
        if (stateId) {
            dispatch(getCities(stateId))
        }

    }, [stateId])
    ///////////////////////////////  UseEffect End /////////////////////////////////////////

    ////////////////// HandleChange Events start //////////////////////////////
    const handleCountryChange = (e) => {
        formik.values.countryId = e.target.value
        setselectedCountryId(e.target.value)
    }

    const handleStateChange = (e) => { setStateId(e.target.value) }

    ////////////////// HandleChange Events End //////////////////////////////

    console.log("countryId", selectedCountryId);
    //use UseFormik
    const formik = useFormik({
        initialValues: {
            id: new Date().getTime().toString(),
            firstName: "",
            lastName: "",
            email: "",
            contact: "",
            profession: "",
            salaryJan: "",
            salaryFeb: "",
            salaryMar: "",
            password: "",
            countryId: "",
            stateId: "",
            cityId: "",
            confirmPassword: "",
        },

        onSubmit: (values) => {
            //update the user data
            if (id) {
                history.push('/dashboard')
                dispatch(updateSelectedUserdata(id, values))

            }

            else {
                //add new user
                if (values.password === values.confirmPassword) {
                    formik.handleReset()
                    console.log("values", values);
                    dispatch(submitData(values))
                    history.push('/signIn');

                } else { alert("confirm password not match") }

            }
        }
    });

    //for getting the edited user data
    useEffect(() => {
        if (id) {
            Axios.get(`/editUser/${id}`)

                .then(res => {
                    console.log("hello", res.data);
                    seteditedData(res.data);
                })
                .catch(err => {
                    console.log("error: " + err);
                })
        }
    }, [id]);


    //set inputfield when editedData state changed
    useEffect(() => {
        if (id && editedData) {
            formik.setValues(editedData)
        } else {
            Cookies.remove('jwtLogin')
        }
    }, [editedData])

    return (
        <>
            <div className="main-div">
                <form className="signupUser" onSubmit={formik.handleSubmit}>
                    <h2>
                        <strong>SIGN UP</strong>
                    </h2>

                    <TextField
                        label="First Name"
                        variant="standard"
                        name="firstName"
                        type="text"
                        required
                        onChange={formik.handleChange}
                        value={formik.values.firstName}
                    />
                    <TextField
                        label="Last Name"
                        variant="standard"
                        name="lastName"
                        type="text"

                        required
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                    />
                    <TextField
                        label="Email"
                        variant="standard"
                        name="email"
                        type="email"

                        required
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    <TextField
                        label="Contact"
                        variant="standard"
                        name="contact"
                        type="number"
                        required
                        onChange={formik.handleChange}
                        value={formik.values.contact}
                    />
                    <TextField
                        label="profession"
                        variant="standard"
                        name="profession"
                        type="text"
                        required
                        onChange={formik.handleChange}
                        value={formik.values.profession}
                    />
                    <TextField
                        label="salary of Jan"
                        variant="standard"
                        name="salaryJan"
                        type="number"
                        required
                        onChange={formik.handleChange}
                        value={formik.values.salaryJan}
                    />
                    <TextField
                        label="salary of Feb"
                        variant="standard"
                        name="salaryFeb"
                        type="number"
                        required
                        onChange={formik.handleChange}
                        value={formik.values.salaryFeb}
                    />
                    <TextField
                        label="salary of Mar"
                        variant="standard"
                        name="salaryMar"
                        type="number"
                        required
                        onChange={formik.handleChange}
                        value={formik.values.salaryMar}
                    />
                    <div className="DropDownMenu">

                        <div className="countryClass">
                            <select name="countryId"
                                onChange={(e) => handleCountryChange(e)}

                            >
                                <option value="">Select Country</option>
                                {data && data.map(element => <option value={element._id} key={element._id}>{element.countryName}</option>)}
                            </select></div>

                        <div className="countryClass"> <select name="stateId" onChange={(e) => handleStateChange(e)}>
                            <option value="">Select State</option>

                            {newState && newState.map(element => <option value={formik.values.stateId = element._id} key={element._id}>{element.stateName}</option>)}
                        </select></div>

                        <div className="countryClass"> <select name="cityId" >
                            <option value="">Select City</option>

                            {newcities && newcities.map(element => <option value={formik.values.cityId = element._id} key={element.cityName}>{element.cityName}</option>)}
                        </select></div>

                    </div>

                    <TextField
                        label="Password"
                        variant="standard"
                        name="password"
                        type="password"
                        required
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    <TextField
                        label="Confirm Password"
                        variant="standard"
                        name="confirmPassword"
                        required
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                    />

                    <div className="Bottom-class">
                        {!id ?
                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="signup-btn"
                                // onClick={settoggleButton(true)}
                                >
                                    SIGN UP
                                </Button>
                            </Form.Item>
                            : (
                                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="signup-btn"
                                    // onClick={settoggleButton(false)}
                                    // onClick={() => dispatch(updateSelectedUserdata())}
                                    >
                                        UPDATE
                                    </Button>
                                </Form.Item>
                            )}
                    </div>
                    <NavLink to="/signIn">I have already Registered</NavLink>

                </form>

                <div className="Side-image">
                    <img className="img" src={sideImg} alt="side view" />
                </div>
            </div>
        </>
    );
};

export default Signup;