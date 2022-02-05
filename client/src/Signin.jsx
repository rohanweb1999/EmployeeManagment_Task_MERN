/**
 * @author Rohan Gajjar
 */
///////////////////// Load module start /////////////////////
import { React, useContext } from 'react'
import { NavLink, useHistory } from "react-router-dom";
import { Button, Form } from 'antd';
import { useFormik } from "formik";
import { TextField } from "@material-ui/core";
import './App.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginUserData } from './actions';
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';

////////////////////// Load module End //////////////////

toast.configure()
const Signin = () => {
    const loginStatus = useSelector(state => state.employeeReducer.loginStatus)
    const dispatch = useDispatch()
    //navigate the page
    const history = useHistory();
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),

        password: Yup.string()
            .min(8, 'Password must be at least 8 charaters')
            .required('Password is required'),
    })

    const initialValues = {
        email: "", password: ""
    }
    const formik = useFormik({
        initialValues,
        validationSchema,

        onSubmit: (values) => {

            dispatch(loginUserData(values))

        }
    })


    return (
        <>
            <div className="signUp-Div">
                <div className="header_div">
                    <h1>SIGN IN</h1>
                </div>

                <div className="form_div">
                    <form onSubmit={formik.handleSubmit}>
                        <label>Email:-</label>
                        <TextField
                            type='text'
                            name="email"
                            // value={formik.values.email}
                            // onChange={formik.handleChange}
                            {...formik.getFieldProps("email")}

                            placeholder="Enter Email..." />

                        {formik.touched.email && formik.errors.email ? (
                            <div className="fv-plugins-message-container">
                                <div className="fv-help-block error">
                                    {formik.errors.email}
                                </div>
                            </div>
                        ) : null}
                        <div><br></br>
                            <label>Password:-</label>
                            <TextField
                                type='password'
                                name="password"
                                // value={formik.values.password}
                                // onChange={formik.handleChange}
                                {...formik.getFieldProps("password")}

                                placeholder="Enter Password ..." />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="fv-plugins-message-container">
                                    <div className="fv-help-block error">
                                        {formik.errors.password}
                                    </div>
                                </div>
                            ) : null}
                        </div><br></br>
                        <div className='signInButton'>
                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="signup-btn"

                                >
                                    LOG IN
                                </Button>
                            </Form.Item>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}


export default Signin;

