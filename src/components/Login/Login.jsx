import './login.scss'
import { GoogleLogin } from '@react-oauth/google';
import Guest from '../../layouts/Guest';
import { useDispatch } from 'react-redux';
import { setLocalSession } from '../../redux/reducers/sessionSlice';

const Login = () => {

    const dispatch = useDispatch()

    const onLoginSuccess = credential => {
        dispatch(setLocalSession(credential.credential))
    }

    return (
        <Guest>
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
                            onSuccess={credentialResponse => onLoginSuccess(credentialResponse)}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />
                    </div> 
                </div>
            </div>
        </Guest>
    )
}

export default Login