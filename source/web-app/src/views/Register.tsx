import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateUserInput } from '../models/createUserInput';
import {  RegisterUser } from '../services/user.service';
import './Login.css';


const Register = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<CreateUserInput>({ Email: '', Password: '', ConfirmPassword: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const onChangeEmail = (value: string) => {
        setData(prevData => {
            return { ...prevData, Email: value };
        })
        validateForm(value, data.Password, data.ConfirmPassword);
    }

    const onChangePassword = (value: string) => {
        setData(prevData => {
            return { ...prevData, Password: value };
        })
        validateForm(data.Email, value, data.ConfirmPassword);
    }

    const onChangeConfirmPassword = (value: string) => {
        setData(prevData => {
            return { ...prevData, ConfirmPassword: value };
        })
        validateForm(data.Email, data.Password, value);
    }

    const Register = async () => {
        try {
            if(validateForm(data.Email, data.Password, data.ConfirmPassword)) {
                const result = await RegisterUser(data);
                if(result) {
                    navigate("/login");
                }
                else {
                    setErrorMessage("Register failed"); 
                }
            }
        }
        catch(err) {
            setErrorMessage("Unexpected error occurred");
        }
    }

    const validateForm = (email: string, password: string, confirmPassword: string) => {
        let regex = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
        let emailRegex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
        let isValid = true;

        if (!email) {
            isValid = false;
            setEmailError('Email is required');
        }
        else if(!emailRegex.test(email)) {
            isValid = false;
            setEmailError('Invalid email');
        }
        else {
            setEmailError('');
        }

        if(!password) {
            isValid = false;
            setPasswordError('Password is required');
        }
        else if(!regex.test(password)) {
            isValid = false;
            setPasswordError('Password must contain at least one uppercase character one lowercase character and one number and be at least 8 characters');
        }
        else {
            setPasswordError('');
        }

        if(!confirmPassword) {
            isValid = false;
            setConfirmPasswordError('Confirm password is required');
        }
        else if(password !== confirmPassword){
            isValid = false;
            setConfirmPasswordError('Password and confirm password do not match');
        }
        else {
            setConfirmPasswordError('');
        }

        return isValid;
    }

    const OnGoBack = () => {
        navigate("/login");
    }

    return (
        <div className='container'>
            <div className='register-container'>
                <div>
                    <h2>Register</h2>
                </div>
                { errorMessage && 
                    <div className='error-message margin-bottom'>{ errorMessage }</div>
                }
                <div className='input-margin'>
                    <input className={`input ${emailError ? 'input-error' : ''}`} type="text" value={data.Email} onChange={(e) => onChangeEmail(e.target.value)} placeholder="Email *" />
                    <div className='error-message'>{ emailError }</div>
                </div>
                <div className='input-margin'>
                    <input className={`input ${passwordError ? 'input-error' : ''}`} type="password" value={data.Password} onChange={(e) => onChangePassword(e.target.value)} placeholder="Password *" />
                    <div className='error-message'>{ passwordError }</div>
                </div>
                <div className='input-margin'>
                    <input className={`input ${confirmPasswordError ? 'input-error' : ''}`} type="password" value={data.ConfirmPassword} onChange={(e) => onChangeConfirmPassword(e.target.value)} placeholder="Confirm Password *" />
                    <div className='error-message'>{ confirmPasswordError }</div>
                </div>
                <div>
                    <button className='login-btn' onClick={Register}>Register</button>
                </div>
                <div>
                    <p className='register-link' onClick={OnGoBack}>Back to login</p>
                </div>
            </div>
        </div>
    )
}

export default Register;
