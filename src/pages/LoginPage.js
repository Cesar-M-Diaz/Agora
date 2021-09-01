import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import '../assets/styles/pages/LoginPage.css';

function LoginPage(props){

    const [state, setState] = useState({
        "emailErrorVisibility": 'hidden',
        "passwordErrorVisibility": 'hidden',
        "emailErrorMessage": '',
        "passwordErrorMessage": '',
        "currentEmail": '',
        "currentPassword": ''
    })

    const validateInputs = (currentEmail, currentPassword) => {
        let emailIsValid = true;
        let passwordIsValid = true;
        let emailHasAnAt = false;
        let emailHasADomain = true;
        currentEmail.split('').forEach((char, index, arr) => {
            if(char === '@'){
                emailHasAnAt = true;
            }
            if(arr.indexOf('@') === arr.length - 1){
                emailHasADomain = false;
            }
        })
        if(currentEmail === ''){
            emailIsValid = false;
            setState(prevState => ({...prevState, emailErrorMessage: 'Please enter your email', emailErrorVisibility: 'visible'}));
        } else if(!emailHasAnAt){
            emailIsValid = false;
            setState(prevState => ({...prevState, emailErrorMessage: 'Invalid email, please add an @ to the email', emailErrorVisibility: 'visible'}));
        } else if(!emailHasADomain){
            emailIsValid = false;
            setState(prevState => ({...prevState, emailErrorMessage: 'Invalid email, add a domain next to the @', emailErrorVisibility: 'visible'}));
        }

        if(currentPassword.length < 4){
            passwordIsValid = false;
            if(currentPassword === ''){
                setState(prevState => ({...prevState, passwordErrorMessage: 'Please enter your password', passwordErrorVisibility: 'visible'}));
            } else {
                setState(prevState => ({...prevState, passwordErrorMessage: 'Invalid password, the password is too short', passwordErrorVisibility: 'visible'}));
            }  
        }

        if(emailIsValid && passwordIsValid){
            return true
        }
        return false;           
    }

    const handleSubmit = e => {
        e.preventDefault();

        setState(prevState => (
            {...prevState, 
            setEmailErrorMessage: '', 
            setPasswordErrorMessage: '', 
            setEmailErrorVisibility: '', 
            setPasswordErrorVisibility: ''
            }))

        if(validateInputs(state.currentEmail, state.currentPassword)){
            props.history.replace('/'); 
        }
        
    }

    const handleChange = (e, current) => {
        setState((prevState) => ({...prevState, [current]: e.target.value}));
    }

    return(
        <div className="login-form-container">
            <form className="login-form">
                <fieldset className="login-login-fieldset">
                    <h1 className="login-form__legend">Sign In</h1>
                    <div className="login-input-container">
                        <div className="input-container__input">
                            <span className="login-input__icon"><FontAwesomeIcon icon={faUser}/></span>
                            <input onChange={e => handleChange(e, 'currentEmail')} className="login-input__input" type="email" name="login-email" id="login-email" placeholder="Email" required />
                        </div>
                        <div className="input-container__error-message">
                            <span style={{color: 'red', visibility: state.emailErrorVisibility}} className="email-error-span">{state.emailErrorMessage}</span>
                        </div>
                    </div>
                    <div className="login-input-container">
                        <div className="input-container__input">
                            <span className="login-input__icon"><FontAwesomeIcon icon={faKey}/></span>
                            <input onChange={e => handleChange(e, 'currentPassword')} className="login-input__input" type="password" name="login-password" id="login-password" placeholder="Password" required />
                        </div>
                        <div className="input-container__error-message">
                            <span style={{color: 'red', visibility: state.passwordErrorVisibility}} className="password-error-span">{state.passwordErrorMessage}</span>
                        </div>
                    </div>
                    <button onClick={handleSubmit} className="login-form__submit" type="submit">Sign In</button>
                </fieldset>
                <fieldset className="login-signup-fieldset">
                    <p className="signup__text">Don't have an account? <Link to="/register">Register</Link></p>
                </fieldset>
            </form>
        </div>
    )
}

export default LoginPage; 