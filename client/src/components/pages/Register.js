import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { StoreConsumer } from '../../context';

const Register = ({ register, isAuth }) => {


    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        school: "",
        major: "",
        minor: "",
        password: "",
        password2: "",
    });

    return (
        <section className='container'>
            <StoreConsumer>
                { value => {
                    if (value.auth.isAuth) {
                        return <Navigate to="/front-Page"/>
                    }
                    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
                    const onSubmit = async e => {
                        e.preventDefault();
                        if (password !== password2) {
                            alert('passwords do not match', 'danger');
                        } else { 
                
                            axios.post("http://127.0.0.1:8000/register/", {
                                "firstName": firstName,
                                "lastName": lastName,
                                "password": password,
                                "email": email,
                                "university": school,
                                "major": major,
                                "minor": minor,
                
                            })
                
                                .then(res => {
                                    console.log(res.data);
                                    const newAuth = {...value.auth};
                                    newAuth.loading = false;
                                    const newToken = localStorage.setItem('token', firstName + lastName + res.data.id);
                                    newAuth.token = newToken;
                                    newAuth.user = res.data.firstName;
                                    newAuth.isAuth = true
                                    console.log(`newAuth = ${newAuth}`);
                                    value.setAuth(oldAuth => {
                                        return {
                                            ...oldAuth, 
                                            loading:newAuth.loading,
                                            token:newAuth.token,
                                            isAuth: true,
                                            user:isAuth.user
                                        }
                                    });
                                    console.log(value.auth);
                                }).catch(function (error) {
                                    console.log(error.data.error.message);
                                    if (error.data.error.message == 'User already exists.') {
                                        alert('User already exists.', 'danger');
                                        return
                                    }
                                })
                            //   console.log(error);
                            // });
                
                        }
                        if (value.auth.isAuth) {
                            return <Navigate to="/front-Page"/>
                        }
                    }
                
                    const { firstName, lastName, email, school, major, minor, password, password2 } = formData;
                    return (
                        <>
                                <h1 className="large text-primary">Sign Up</h1>
                                    <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
                                <form className="form" onSubmit={e => onSubmit(e)}>
                        <div className="form-group">
                            <input type="text" placeholder="First Name" name="firstName" value={firstName} onChange={(e) => onChange(e)} required />
                        </div>
                        <div className="form-group">
                            <input type="text" placeholder="Last Name" name="lastName" value={lastName} onChange={(e) => onChange(e)} required />
                        </div>
                        <div className="form-group">
                            <input type="text" placeholder="School" name="school" value={school} onChange={(e) => onChange(e)} required />
                        </div>
                        <div className="form-group">
                            <input type="text" placeholder="Major" name="major" value={major} onChange={(e) => onChange(e)} required />
                        </div>
                        <div className="form-group">
                            <input type="text" placeholder="Minor" name="minor" value={minor} onChange={(e) => onChange(e)} required />
                        </div>
                        <div className="form-group">
                            <input type="email" placeholder="Email Address" name="email" value={email} onChange={(e) => onChange(e)} />
                        </div>



                        <div className="form-group">
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                minLength="6"
                                value={password}
                                onChange={(e) => onChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                name="password2"
                                minLength="6"
                                value={password2}
                                onChange={(e) => onChange(e)}
                            />
                        </div>
                        <input type="submit" className="btn btn-primary" value="Register" />
                    </form>
                    <p className="my-1">
                        Already have an account? <Link to="/login">Sign In</Link>
                    </p>
                    </>
                    )
                }}
            
            </StoreConsumer>
        </section>
    )
}


export default Register;
