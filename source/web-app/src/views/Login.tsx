import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserLoginInput } from '../models/userLoginInput';
import { AuthenticateUser, IsUserAuthenticated, SaveAccessToken } from '../services/user.service';
import './Login.css';

interface LoginProps {
    setIsAuth: Function;
}

const Login = ({ setIsAuth } : LoginProps) => {
    const navigate = useNavigate();
    const [data, setData] = useState<UserLoginInput>({ Email: '', Password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    useEffect(() => {
        const checkUserAuthenticated = async () => {
            try {
                const response = await IsUserAuthenticated();
                if(response) {
                    setIsAuth(true);
                    navigate('/task');
                }
            }
            catch(err) {
                
            }
        }
        
        checkUserAuthenticated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onChangeEmail = (value: string) => {
        setData(prevData => {
            return { ...prevData, Email: value };
        })
        validateForm(value, data.Password);
    }

    const onChangePassword = (value: string) => {
        setData(prevData => {
            return { ...prevData, Password: value };
        })
        validateForm(data.Email, value);
    }

    const Authenticate = async () => {
        try {
            if(validateForm(data.Email, data.Password)) {
                const result = await AuthenticateUser(data);
                if(result.message === "Login success") {
                    SaveAccessToken(result.Token);
                    setIsAuth(true);
                    navigate('/task');
                }
                else {
                    setErrorMessage(result.message);
                }
            }
        }
        catch(err) {
            setErrorMessage("Unexpected error occurred");
        }
    }

    const validateForm = (email: string, password: string) => {
        let isValid = true;
        if (!email) {
            isValid = false;
            setEmailError(true);
        }
        else {
            setEmailError(false);
        }
        if(!password) {
            isValid = false;
            setPasswordError(true);
        }
        else {
            setPasswordError(false);
        }
        return isValid;
    }

    const GoToRegister = () => {
        navigate('/register');
    }

    return (
        <div className='container'>
            <div className='login-container'>
                <div>
                    <h2>Login</h2>
                </div>
                { errorMessage && 
                    <div className='error-message margin-bottom'>{ errorMessage }</div>
                }
                <div>
                    <input className={`input input-margin ${emailError ? 'input-error' : ''}`} type="text" value={data.Email} onChange={(e) => onChangeEmail(e.target.value)} placeholder="Email *" />
                </div>
                <div>
                    <input className={`input input-margin ${passwordError ? 'input-error' : ''}`} type="password" value={data.Password} onChange={(e) => onChangePassword(e.target.value)} placeholder="Password *" />
                </div>
                <div>
                    <button className='login-btn' onClick={Authenticate}>Login</button>
                </div>
                <div>
                    <p className='register-link' onClick={GoToRegister}>Register</p>
                </div>
            </div>
        </div>
    )
}

export default Login;
