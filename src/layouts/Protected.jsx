import { useNavigate } from "react-router-dom";
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setLocalSession } from "../redux/reducers/sessionSlice";

// eslint-disable-next-line react/prop-types
const Protected = ({ children }) => {

    const session = useSelector(session => session.session.session)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    React.useEffect(() => {
        const token = localStorage.getItem('user-session')
        if(!token) return
        dispatch(setLocalSession(token))
    }, [])

    React.useEffect(() => {
        if(!session) {
            navigate("/login")
        }
    }, [session])

    return (
        <>
            { children }
        </>
    )
}

export default Protected