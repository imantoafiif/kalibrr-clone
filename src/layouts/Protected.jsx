import { useNavigate } from "react-router-dom";
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setLocalSession } from "../redux/reducers/sessionSlice";
import { jwtDecode } from "jwt-decode";
import moment from 'moment'

// eslint-disable-next-line react/prop-types
const tokenValidity = time => {
    //1709572560

    const currentTime = moment()
    // const specificTime = moment.unix(time)
    // const diff = currentTime.diff(specificTime)
    // return diff

}

// eslint-disable-next-line react/prop-types
const Protected = ({ children }) => {

    const session = useSelector(session => session.session.session)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    React.useEffect(() => {
        const token = localStorage.getItem('user-session')
        const parsed = jwtDecode(token)
        if(!token) return
        
        // const validity = tokenValidity(1677992930)

        const mock_validity = parsed.exp
        //parsed.exp

        const currentTime = Date.now() / 1000

        console.log('currentTime', currentTime)
        console.log('exp', parsed.exp)

        const validity = currentTime <= parsed.exp

        console.log('validity', validity)        

        if(!validity) {
            // dispatch(setLocalSession(null))
            localStorage.removeItem('user-session')
            dispatch(setLocalSession(null))
            // navigate("/login")
        }
        
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