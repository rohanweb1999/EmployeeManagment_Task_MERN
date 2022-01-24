import { React, useContext } from 'react'
import { NavLink, useHistory } from "react-router-dom";
import { Button, Form } from 'antd';
import { useFormik } from "formik";
import { TextField } from "@material-ui/core";
import './App.css';
import { loginContext } from './App.js'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginUserData } from './actions';
toast.configure()
const Signin = () => {

    const dispatch = useContext(loginContext);
    //navigate the page
    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            email: "", password: ""
        },

        onSubmit: (values) => {
            history.push("/dashboard")
            dispatch(loginUserData(values))
            // dispatch({ type: 'LoginUser', payload: true })


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
                        <label>Username:-</label>
                        <TextField
                            required
                            type='text'
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            placeholder="Enter Email ID..." />
                        <div><br></br>
                            <label>Password:-</label>
                            <TextField
                                required
                                type='password'
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                placeholder="Enter Password ..." />
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
            <div className="sign_div">
                <NavLink to="/signUp">Create an account</NavLink>
            </div>
        </>
    )
}


export default Signin;

