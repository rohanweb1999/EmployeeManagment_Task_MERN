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
import { Button } from "antd";
import { useFormik, Formik, ErrorMessage, Form } from "formik";
import queryString from 'query-string';
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllCountries, getCities, getState, submitData, updateSelectedUserdata } from "./actions";
import * as Yup from 'yup'
import TextError from './TextField'
/////////////////////////////////////////////////////////////////////////////////////
/******************Load module End ***********************************************/
/////////////////////////////////////////////////////////////////////////////////////
toast.configure()
const Signup = () => {
    const validate = Yup.object({
        firstName: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
        lastName: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 charaters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Password must match')
            .required('Confirm password is required'),
    })
    return (
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: ''
            }}
            validationSchema={validate}
            onSubmit={values => {
                console.log(values)
            }}
        >
            {formik => (
                <div>
                    <h1 className="my-4 font-weight-bold .display-4">Sign Up</h1>
                    <Form>
                        <TextField label="First Name" name="firstName" type="text" />
                        <TextField label="last Name" name="lastName" type="text" />
                        <TextField label="Email" name="email" type="email" />
                        <TextField label="password" name="password" type="password" />
                        <TextField label="Confirm Password" name="confirmPassword" type="password" />
                        <button className="btn btn-dark mt-3" type="submit">Register</button>
                        <button className="btn btn-danger mt-3 ml-3" type="reset">Reset</button>
                    </Form>
                </div>
            )}
        </Formik>
    )
};

export default Signup;