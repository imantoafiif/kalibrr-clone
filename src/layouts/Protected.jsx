import { useNavigate } from "react-router-dom";
import React from 'react';

// eslint-disable-next-line react/prop-types
const Protected = ({ children }) => {

    const session = localStorage.getItem('user-session')
    const navigate = useNavigate()

    React.useEffect(() => {
        if(!session) {
            navigate("/login")
        }
    }, [])

    return (
        <>
            { children }
        </>
    )
}

export default Protected