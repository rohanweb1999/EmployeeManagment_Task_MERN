/**
 * @author Rohan Gajjar
 */

/////////////////////////////////////////////////////////////////////////////////////
/******************Load module start ***********************************************/
/////////////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import "./App.css";
import { NavLink, useHistory } from "react-router-dom";
import sideImg from "../src/employee.png";
import { Form, Button } from "antd";
import { useFormik } from "formik";
import queryString from 'query-string';
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllCountries, getCities, getState, submitData, updateSelectedUserdata } from "./actions";
import * as Yup from 'yup'
import debounce from 'lodash.debounce';

/////////////////////////////////////////////////////////////////////////////////////
/******************Load module End ***********************************************/
/////////////////////////////////////////////////////////////////////////////////////
toast.configure()


const Signup = () => {


    const dispatch = useDispatch()
    const history = useHistory();
    //Here ID will find
    const { id } = queryString.parse(window.location.search)
    // const formState = useSelector((state) => state.employeeReducer.formState)


    ///////////////////////////////  UseState Start /////////////////////////////////////////
    const [editedData, seteditedData] = useState([])  //Here Edited Data store
    const [selectedCountryId, setselectedCountryId] = useState();  //user Selected  country Id
    const [stateId, setStateId] = useState('') // user Selected State Id
    ///////////////////////////////  UseState End /////////////////////////////////////////

    ///////////////////////////////  UseSelector Start /////////////////////////////////////////
    const employeeList = useSelector(state => state.employeeReducer.employeeList)
    const data = useSelector((state) => state.employeeReducer.data);
    const newState = useSelector((state) => state.employeeReducer.newState);
    const newcities = useSelector((state) => state.employeeReducer.newcities);
    const emailExist = useSelector((state) => state.employeeReducer.emailExist);


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

    //for getting the edited user data
    useEffect(() => {
        if (id) {

            seteditedData(editUser)
            // Axios.get(`/editUser/${id}`)

            //     .then(res => {
            //         seteditedData(res.data[0]);
            //     })
            //     .catch(err => {
            //         console.log("error: " + err);
            //     })
        }
    }, [id]);
    const editUser = employeeList.find((ele) => ele._id === id ? ele : null);
    const countryEdit = editUser && editUser.country.map(item => item.countryName)
    const stateEdit = editUser && editUser.state.map(item => item.stateName)
    const cityEdit = editUser && editUser.city.map(item => item.cityName)


    //set inputfield when editedData state changed
    useEffect(() => {
        if (id && editedData) {
            formik.setValues(editedData)

        } else {
            Cookies.remove('jwtLogin')
        }
    }, [editedData])
    useEffect(() => {
        if (emailExist === true) {
            history.push('/dashboard')
        }
    }, [emailExist])

    ///////////////////////////////  UseEffect End /////////////////////////////////////////

    ////////////////// HandleChange Events start //////////////////////////////
    const handleCountryChange = (e) => {
        formik.values.countryId = e.target.value
        setselectedCountryId(e.target.value)
    }

    const handleStateChange = (e) => {
        formik.values.stateId = e.target.value

        setStateId(e.target.value)
    }
    const handleCityChange = (e) => {
        formik.values.cityId = e.target.value

    }
    ////////////////// HandleChange Events End //////////////////////////////

    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .max(30, 'Must be 30 characters or less')
            .required('Required'),
        lastName: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        contact: Yup.string()
            .required("required")
            .min(10, "to short")
            .max(13, "to long"),
        profession: Yup.string()
            .max(30, 'It Shoud be less than 30')
            .required('Profession is Required'),
        salaryJan: Yup.number()
            .required('SalaryJan must be Required'),
        salaryFeb: Yup.number()
            .required('salaryFeb must be Required'),
        salaryMar: Yup.number()
            .required('salaryMar must be Required'),
        // countryId: Yup.string()
        //     .required('Please Select Country'),
        // stateId: Yup.string()
        //     .required('Please Select State'),
        // city: Yup.string()
        //     .required('Please Select city'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 charaters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Confirm Password Not Match')
            .required('Confirm password is required'),
    })
    // const debouncedOnChange = debounce(emailCheck, 500)
    const initialValues = {
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
    }
    //use UseFormik
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            //update the user data
            if (id) {
                dispatch(updateSelectedUserdata(id, values, editedData.email))
            }
            else {
                //add new user
                if (values.password === values.confirmPassword) {
                    formik.handleReset()
                    history.push('/signin')

                    dispatch(submitData(values))


                }
            }
        }
    });
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
                        // onChange={formik.handleChange}
                        // value={formik.values.firstName}
                        {...formik.getFieldProps("firstName")}
                    />
                    {formik.touched.firstName && formik.errors.firstName ? (
                        <div className="fv-plugins-message-container">
                            <div className="fv-help-block error">
                                {formik.errors.firstName}
                            </div>
                        </div>
                    ) : null}
                    <TextField
                        label="Last Name"
                        variant="standard"
                        name="lastName"
                        type="text"

                        // onChange={formik.handleChange}
                        // value={formik.values.lastName}
                        {...formik.getFieldProps("lastName")}
                    />
                    {formik.touched.lastName && formik.errors.lastName ? (
                        <div className="fv-plugins-message-container">
                            <div className="fv-help-block error">
                                {formik.errors.lastName}
                            </div>
                        </div>
                    ) : null}

                    <TextField
                        label="Email"
                        variant="standard"
                        name="email"
                        type="email"
                        // onChange={(e) => emailCheck(e)}
                        // value={formik.values.email}
                        {...formik.getFieldProps("email")}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="fv-plugins-message-container">
                            <div className="fv-help-block error">
                                {formik.errors.email}
                            </div>
                        </div>
                    ) : null}

                    <TextField
                        label="Contact"
                        variant="standard"
                        name="contact"
                        type="number"
                        // onChange={formik.handleChange}
                        // value={formik.values.contact}
                        {...formik.getFieldProps("contact")}
                    />
                    {formik.touched.contact && formik.errors.contact ? (
                        <div className="fv-plugins-message-container">
                            <div className="fv-help-block error">
                                {formik.errors.contact}
                            </div>
                        </div>
                    ) : null}

                    <TextField
                        label="profession"
                        variant="standard"
                        name="profession"
                        type="text"
                        // onChange={formik.handleChange}
                        // value={formik.values.profession}
                        {...formik.getFieldProps("profession")}

                    />
                    {formik.touched.profession && formik.errors.profession ? (
                        <div className="fv-plugins-message-container">
                            <div className="fv-help-block error">
                                {formik.errors.profession}
                            </div>
                        </div>
                    ) : null}

                    <TextField
                        label="salary of Jan"
                        variant="standard"
                        name="salaryJan"
                        type="number"
                        // onChange={formik.handleChange}
                        // value={formik.values.salaryJan}
                        {...formik.getFieldProps("salaryJan")}

                    />
                    {formik.touched.salaryJan && formik.errors.salaryJan ? (
                        <div className="fv-plugins-message-container">
                            <div className="fv-help-block error">
                                {formik.errors.salaryJan}
                            </div>
                        </div>
                    ) : null}

                    <TextField
                        label="salary of Feb"
                        variant="standard"
                        name="salaryFeb"
                        type="number"
                        // onChange={formik.handleChange}
                        // value={formik.values.salaryFeb}
                        {...formik.getFieldProps("salaryFeb")}

                    />
                    {formik.touched.salaryFeb && formik.errors.salaryFeb ? (
                        <div className="fv-plugins-message-container">
                            <div className="fv-help-block error">
                                {formik.errors.salaryFeb}
                            </div>
                        </div>
                    ) : null}
                    <TextField
                        label="salary of Mar"
                        variant="standard"
                        name="salaryMar"
                        type="number"
                        // onChange={formik.handleChange}
                        // value={formik.values.salaryMar}
                        {...formik.getFieldProps("salaryMar")}

                    />
                    {formik.touched.salaryMar && formik.errors.salaryMar ? (
                        <div className="fv-plugins-message-container">
                            <div className="fv-help-block error">
                                {formik.errors.salaryMar}
                            </div>
                        </div>
                    ) : null}
                    <br></br>
                    <input type="number" placeholder="Total Salary" value={formik.values.salaryJan + formik.values.salaryFeb + formik.values.salaryMar} disabled></input>

                    <div className="DropDownMenu">

                        <div className="countryClass">
                            <select name="countryId"
                                onChange={(e) => handleCountryChange(e)}

                            >
                                <option >{countryEdit ? countryEdit : "select Country"}</option>
                                {data && data.map(element => <option value={element._id} key={element._id}>{element.countryName}</option>)}
                            </select>


                            {formik.touched.countryId && formik.errors.countryId ? (
                                <div className="fv-plugins-message-container">
                                    <div className="fv-help-block error">
                                        {formik.errors.countryId}
                                    </div>
                                </div>
                            ) : null}
                        </div>


                        <div className="countryClass">
                            <select name="stateId"
                                onChange={(e) => handleStateChange(e)}>
                                <option value="">{stateEdit ? stateEdit : "select state"}</option>

                                {newState && newState.map(element => <option value={element._id} key={element._id}>{element.stateName}</option>)}
                            </select>
                            {formik.touched.stateId && formik.errors.stateId ? (
                                <div className="fv-plugins-message-container">
                                    <div className="fv-help-block error">
                                        {formik.errors.stateId}
                                    </div>
                                </div>
                            ) : null}</div>

                        <div className="countryClass">
                            <select name="cityId" onChange={(e) => handleCityChange(e)}>
                                <option value="">{cityEdit ? cityEdit : "select city"}</option>

                                {newcities && newcities.map(element => <option value={element._id} key={element.cityName}>{element.cityName}</option>)}
                            </select>
                            {formik.touched.cityId && formik.errors.cityId ? (
                                <div className="fv-plugins-message-container">
                                    <div className="fv-help-block error">
                                        {formik.errors.cityId}
                                    </div>
                                </div>
                            ) : null}</div>

                    </div>
                    <br></br>
                    <TextField
                        label="Password"
                        variant="standard"
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        // value={formik.values.password}
                        {...formik.getFieldProps("password")}

                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="fv-plugins-message-container">
                            <div className="fv-help-block error">
                                {formik.errors.password}
                            </div>
                        </div>
                    ) : null}

                    <TextField
                        label="Confirm Password"
                        variant="standard"
                        name="confirmPassword"
                        type="password"
                        onChange={formik.handleChange}
                        // value={formik.values.confirmPassword}
                        {...formik.getFieldProps("confirmPassword")}

                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                        <div className="fv-plugins-message-container">
                            <div className="fv-help-block error">
                                {formik.errors.confirmPassword}
                            </div>
                        </div>
                    ) : null}
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