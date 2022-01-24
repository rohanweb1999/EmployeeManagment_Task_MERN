
import React, { useState, useEffect } from "react";
import Axios from 'axios'
import { TextField } from "@material-ui/core";
import "./App.css";
import { NavLink, useHistory } from "react-router-dom";
import sideImg from "../src/employee.jpg";
import { Form, Button } from "antd";
import { useFormik } from "formik";
import queryString from 'query-string';
import Cookies from 'js-cookie'
import { useDispatch } from "react-redux";
import { submitData, updateSelectedUserdata } from "./actions";


const Signup = () => {

    const [data, setData] = useState([])
    const [getCountry, setCountry] = useState()
    const [getState, setState] = useState([])
    const [selectedState, setSelectedState] = useState();
    const [cities, setcities] = useState([]);
    useEffect(() => {
        Axios.get("https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json")
            .then(res => {
                // console.log(res.data);
                setData(res.data)
            })
            .catch(err => {
                console.log("error: " + err);
            })
    }, [])
    const country = [...new Set(data.map(items => items.country))]
    country.sort();
    const handleCountryChange = (e) => {
        let states = data.filter(state => state.country === e.target.value);
        states = [...new Set(states.map(item => item.subcountry))];
        console.log("states", states);
        setState(states)
    }
    const handleStateChange = (e) => {
        let cities = data.filter(city => city.subcountry === e.target.value)
        setcities(cities)
    }
    //navigate the page
    const dispatch = useDispatch()
    const history = useHistory();
    //for store the edited user data
    const [editedData, seteditedData] = useState([])


    //Here ID will find
    const { id } = queryString.parse(window.location.search)


    // const formState = useSelector((state) => state.employeeReducer.formState);
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
            country: "",
            state: "",
            city: "",
            confirmPassword: "",
        },

        onSubmit: (values) => {
            //update the user data
            if (id) {
                dispatch(updateSelectedUserdata(id, values))
                history.push('/dashboard')
            }

            else {
                //add new user
                if (values.password === values.confirmPassword) {
                    formik.handleReset()
                    console.log("values", values);
                    dispatch(submitData(values))
                    history.push('/signIn');

                } else {
                    alert("confirm password not match")
                }

            }
        }
    });

    //for getting the edited user data
    useEffect(() => {
        if (id) {
            Axios.get(`/editUser/${id}`)
                .then(res => {
                    seteditedData(res.data);
                    console.log("res.data", res.data);
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
    }, [editedData, id, formik])




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
                    <div>
                        <label>Country</label>
                        <select onChange={(e) => handleCountryChange(e)}>
                            <option value="">Select Country</option>
                            {country.map(items => <option value={getCountry} key={items}>{items}</option>)}
                        </select>
                    </div>
                    <div>
                        <label>State</label>
                        <select onChange={(e) => handleStateChange(e)}>
                            <option value="">Select State</option>

                            {getState.map(items => <option value={selectedState} key={items}>{items}</option>)}
                        </select>
                    </div>

                    <div>
                        <label>City</label>
                        <select>
                            <option value="">Select City</option>

                            {cities.map(items => <option value={items.name} key={items.name}>{items.name}</option>)}
                        </select>
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