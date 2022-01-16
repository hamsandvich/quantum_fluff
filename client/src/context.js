import React, { useState, useEffect } from 'react'
const StoreContext = React.createContext();


function StoreProvider(props) {
    const [auth, setAuth] = useState({
        isAuth:null,
        token: localStorage.getItem('userName'), // the token will be the first name followed by email address together;
        loading: true,
        user: null
    })
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        getCourses();
    }, [])

    const getCourses = () => {
        console.log(courses);
    }

    const handleAuth = (newObj) => {
        setAuth(newObj);
    }
    return (
        <StoreContext.Provider value={{
           auth, 
           courses,
           getCourses,
           setAuth
            }}>
            {props.children}
        </StoreContext.Provider>
    )
}

const StoreConsumer = StoreContext.Consumer;

export {StoreProvider, StoreConsumer}
