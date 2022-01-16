import React, {useState} from 'react'
import { Link, Navigate } from 'react-router-dom';

 

const Register = ({ setAlert, register, isAuth }) => {

    const [formData, setFormData] = useState({
        name:'',
        email:'',
        school:'',
        major:'',
        minor:'',
        password: '',
        password2:''
    });
    
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value })
    const onSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('passwords do not match', 'danger');
        } else {
           // use axios to make a post request with the formData state
           // only pass in password1 no need to pass password 2 id passwords are equal 
           // sample code below just change the parameters
           /* const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ name, email, password });
    try {
        const res = await axios.post('/api/users', body, config);
        save the firstName and email address in the localstorage and put a timer on it
    } catch (err) {
        check what is your error
        console.log(error)
           
           */ 
        }
    }

    const {name, email, school, major, minor, password, password2} = formData;

    if(isAuth){
        return <Navigate to="/dashboard" />
    }

    return (
        <section className='container'>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                <input type="text" placeholder="Name" name="name" value={name} onChange={(e) => onChange(e)} required />
                </div>
                <div className="form-group">
                <input type="email" placeholder="Email Address" name="email" value={email} onChange={(e) => onChange(e)}  />
                <div className="form-group">
                <input type="text" placeholder="School" name="School" value={school} onChange={(e) => onChange(e)} required />
                </div>
                <div className="form-group">
                <input type="text" placeholder="Major" name="Major" value={major} onChange={(e) => onChange(e)} required />
                </div>
                <div className="form-group">
                <input type="text" placeholder="Minor" name="Minor" value={minor} onChange={(e) => onChange(e)} required />
                </div>
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
