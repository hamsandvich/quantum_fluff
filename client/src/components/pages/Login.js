import React, {useState} from 'react'
import { Link, Navigate } from 'react-router-dom';
import { StoreConsumer } from '../../context';
import axios from 'axios';
const Login = ({ login, isAuth}) => {
    const [formData, setFormData] = useState({
        email:'',
        password: '',
        isAuth
    });
   
    

    return (
        <section className='container'>
            <StoreConsumer>
                { value => {
                     const { email, password} = formData;

                     const onChange = e => setFormData({...formData, [e.target.name]: e.target.value })
                    const onSubmit = async e => {
                            e.preventDefault();
                                axios.post("http://127.0.0.1:8000/authenticate/", {
                                    "email": email,
                                    "password": password
                                })
                    
                                    .then(res => {
                                        console.log(res.data)
                                        const newAuth = {};
                                        newAuth.loading = false;
                                        const newToken = localStorage.setItem('token', email + res.data.id);
                                        newAuth.token = newToken;
                                        newAuth.user = res.data.email;
                                        newAuth.isAuth = true
                                        console.log(`newAuth = ${newAuth}`);
                                        value.setAuth(oldAuth => {
                                            return {
                                                ...oldAuth, 
                                                isAuth: true,
                                            }
                                        });
                                        setFormData({...formData, isAuth:true});
                                        console.log(formData);
                                    }).catch(function (error) {
                                        console.log(error);
                            
                                            alert('Authentication Failed', 'danger');
                                            return
                                
                                    })
                                //   console.log(error);
                                // });
                           
                        }
                        if (formData.isAuth) {
                            return <Navigate to="/front-Page"/>
                        }
                     // redirect if the user is logged in
                    return (
                        <>
                            <h1 className="large text-primary">Sign In</h1>
                            <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
                            <form className="form" onSubmit={e => onSubmit(e)}>
                                <div className="form-group">
                                <input type="email" placeholder="Email Address" name="email" value={email} onChange={(e) => onChange(e)}  />
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
                                </div>
                                <input type="submit" className="btn btn-primary" value="Login" />
                            </form>
                            <p className="my-1">
                                Don't have an account <Link to="/register">Sign Up</Link>
                            </p>
                        
                        </>
                    )
                }}
            </StoreConsumer>
            
        </section>
    )
}

export default Login;