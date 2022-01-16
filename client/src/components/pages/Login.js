import React, {useState} from 'react'
import { Link, Navigate } from 'react-router-dom';
const Login = ({ login, isAuth}) => {
    const [formData, setFormData] = useState({
        email:'',
        password: ''
    });
    const { email, password} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value })
    const onSubmit = async e => {
        e.preventDefault();
        login(email, password)
    }
    // redirect if the user is logged in
    if(isAuth){
        return <Navigate to="/Reviews" />
    }
    

    return (
        <section className='container'>
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
        </section>
    )
}

export default Login;