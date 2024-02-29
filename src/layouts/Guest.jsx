import { useNavigate } from "react-router-dom";
import React from 'react';
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
const Guest = ({ children }) => {

    const session = useSelector(session => session.session.session)
    const navigate = useNavigate()

    React.useEffect(() => {
        if(session) {
            navigate("/")
        }
    }, [session])

    

    return (
        <>
            { children }
        </>
    )
}

export default Guest