import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";

import "../assets/styles/pages/LoginPage.css";

function LoginPage(props) {
  const [state, setState] = useState({
    values: {
      email: "",
      password: "",
    },
    errors: {},
    isValid: false,
  });

  useEffect(() => {
    if(localStorage.getItem("token")){
      props.history.replace("/");
    }
  })

  const validateInputs = (e) => {
    const inputName = e.target.name;
    if (inputName === "email") {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(String(e.target.value).toLowerCase())) {
        setState((prevState) => ({
          ...prevState,
          errors: { ...prevState.errors, email: undefined },
          isValid: prevState.errors.length === 0,
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          errors: {
            ...prevState.errors,
            email: { message: "Invalid email, please enter a valid email" },
          },
          isValid: false,
        }));
        return;
      }
      setState((prevState) => ({
        ...prevState,
        errors: { ...prevState.errors, password: undefined },
        isValid: !(state.errors.email && state.errors.password),
      }));
      return;
    }
    if (inputName === "password") {
      if (e.target.value.length < 4) {
        setState((prevState) => ({
          ...prevState,
          errors: {
            ...prevState.errors,
            password: {
              message: "Invalid password, the password is too short",
            },
          },
          isValid: false,
        }));
        return;
      }
      setState((prevState) => ({
        ...prevState,
        errors: { ...prevState.errors, password: undefined },
        isValid: !(prevState.errors.email && prevState.errors.password),
      }));
      return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validCredentials = await validateCredentials(state.values);
    if(validCredentials){
      alert('Successful login');
      props.history.replace("/");
    } else {
      alert('Incorrect email or password')
    }
  };

  const validateCredentials = async ({ email, password }) => {
    console.log(email, password)
    let isValid = false;
    await axios.post('http://localhost:3001/login', { email, password } )
      .then(response => {
        console.log(response);
        localStorage.setItem("token", response.data.token);
        isValid = true;
      })
      .catch(() => {
        isValid = false;
      })
    return isValid;
  };

  const handleChange = (e, current) => {
    setState((prevState) => ({
      ...prevState,
      values: { ...prevState.values, [current]: e.target.value },
    }));
  };

  return (
    <div className="login-form-container">
      <form className="login-form">
        <fieldset className="login-login-fieldset">
          <h1 className="login-form__legend">Sign In</h1>
          <div className="login-input-container">
            <div className="input-container__input">
              <span className="login-input__icon">
                <FontAwesomeIcon icon={faUser} />
              </span>
              <input
                onBlur={validateInputs}
                onChange={(e) => handleChange(e, "email")}
                className="login-input__input"
                type="email"
                name="email"
                id="login-email"
                placeholder="Email"
                required
              />
            </div>
            <div className="input-container__error-message">
              <span
                style={{
                  color: "red",
                  visibility: state.errors.email ? "visible" : "hidden",
                }}
                className="email-error-span"
              >
                {state.errors.email
                  ? state.errors.email.message
                  : "No hay errores"}
              </span>
            </div>
          </div>
          <div className="login-input-container">
            <div className="input-container__input">
              <span className="login-input__icon">
                <FontAwesomeIcon icon={faKey} />
              </span>
              <input
                onBlur={validateInputs}
                onChange={(e) => handleChange(e, "password")}
                className="login-input__input"
                type="password"
                name="password"
                id="login-password"
                placeholder="Password"
                required
              />
            </div>
            <div className="input-container__error-message">
              <span
                style={{
                  color: "red",
                  visibility: state.errors.password ? "visible" : "hidden",
                }}
                className="password-error-span"
              >
                {state.errors.password
                  ? state.errors.password.message
                  : "No hay errores"}
              </span>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            disabled={!state.isValid}
            className={`login-form__submit ${!state.isValid && "disabled"}`}
            type="submit"
          >
            Sign In
          </button>
        </fieldset>
        <fieldset className="login-signup-fieldset">
          <p className="signup__text">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </fieldset>
      </form>
    </div>
  );
}

export default LoginPage;
