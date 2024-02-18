import './login.scss'
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";
import React, { useRef } from 'react';

const Login = () => {
    const session = localStorage.getItem('user-session')
    const navigate = useNavigate()
    const googleAuth = useRef(null)

    React.useEffect(() => {
        if(session) {
            navigate("/")
        }
    }, [])

    return (
        <div className='login-container'>
            <div className='login-container__navbar'>
                <img src='https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png' alt='main-logo' />
            </div>
            <div className='login-container__body'>
                <div className='login-content'>
                    <div className='login-content__div'>
                        <p>Masuk ke akun kamu</p>
                    </div>
                    <GoogleLogin
                        ref={googleAuth}
                        onSuccess={credentialResponse => {
                            localStorage.setItem('user-session', credentialResponse.credential)
                            navigate("/")
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />
                </div> 
            </div>
        </div>
    )
}

export default Login