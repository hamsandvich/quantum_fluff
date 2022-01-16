import React, {useState} from 'react'
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';


const Register = ({ setAlert, register, isAuth }) => {

   
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email:'',
        school:'',
        major:'',
        minor:'',
        password: '',
        password2:'',
    });
    
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value })
    const onSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('passwords do not match', 'danger');
        } else {

            axios.post('/user', {
                "firstName": firstName,
                "lastName": lastName,
                "Password": password,
                "Email": email,
                "University": school,
                "Major": major,
                "Minor": minor,

              })

              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });

        }
    }

    const {firstName, lastName, email, school, major, minor, password, password2} = formData;

    if(isAuth){
        return <Navigate to="/dashboard" />
    }

    return (
        <section className='container'>
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
                <input type="email" placeholder="Email Address" name="email" value={email} onChange={(e) => onChange(e)}  />
                </div>
                <div className="form-group">
                <input type="text" placeholder="School" name="School" value={school} onChange={(e) => onChange(e)} required />
                </div>
                <div className="form-group">
                <input type="text" placeholder="Major" name="Major" value={major} onChange={(e) => onChange(e)} required />
                </div>
                <div className="form-group">
                <input type="text" placeholder="Minor" name="Minor" value={minor} onChange={(e) => onChange(e)} required />
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
        </section>
    )
} 


export default Register;
