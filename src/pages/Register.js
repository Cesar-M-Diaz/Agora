import { useState, useEffect } from 'react';
import { FaUserAlt, FaEnvelope, FaKey } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { register as registerAction } from '../actions/register';
import { useDispatch } from 'react-redux';
import FormTutor from '../components/FormTutor';

import '../assets/styles/pages/register.scss';

function Register() {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    type: 'student',
    inputs: {
      name: '',
      email: '',
      password: '',
      profession: '',
      focus: '',
      profile_photo:
        'https://therminic2018.eu/wp-content/uploads/2018/07/dummy-avatar-300x300.jpg',
    },
    errors: {
      name: true,
      email: true,
      password: true,
      profession: true,
      focus: true,
    },
    isValid: false,
  });

  function validateInputs(e) {
    const inputName = e.target.name;
    if (inputName === 'name') {
      if (e.target.value.length < 4) {
        setState((prevState) => ({
          ...prevState,
          errors: {
            ...prevState.errors,
            name: 'Name is too short',
          },
          isValid: false,
        }));
        return;
      }
      const re = /^[a-zA-Z\s]*$/;
      if (re.test(String(e.target.value).toLowerCase())) {
        setState((prevState) => ({
          ...prevState,
          errors: { ...prevState.errors, name: '' },
          isValid:
            prevState.type === 'student'
              ? !(state.errors.email || state.errors.password)
              : !(
                  state.errors.email ||
                  state.errors.password ||
                  state.errors.profession ||
                  state.errors.focus
                ),
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          errors: {
            ...prevState.errors,
            name: 'Your name must only contain letters',
          },
        }));
      }
    }
    if (inputName === 'email') {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(String(e.target.value).toLowerCase())) {
        setState((prevState) => ({
          ...prevState,
          errors: { ...prevState.errors, email: '' },
          isValid:
            prevState.type === 'student'
              ? !(state.errors.password || state.errors.name)
              : !(
                  state.errors.password ||
                  state.errors.name ||
                  state.errors.profession ||
                  state.errors.focus
                ),
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          errors: {
            ...prevState.errors,
            email: 'Invalid email, please enter a valid email',
          },
          isValid: false,
        }));
        return;
      }
    }
    if (inputName === 'password') {
      if (e.target.value.length < 4) {
        setState((prevState) => ({
          ...prevState,
          errors: {
            ...prevState.errors,
            password: 'Invalid password, the password is too short',
          },
          isValid: false,
        }));
        return;
      } else {
        setState((prevState) => ({
          ...prevState,
          errors: { ...prevState.errors, password: '' },
          isValid:
            prevState.type === 'student'
              ? !(state.errors.email || state.errors.name)
              : !(
                  state.errors.email ||
                  state.errors.name ||
                  state.errors.profession ||
                  state.errors.focus
                ),
        }));
      }
    }
    if (inputName === 'profession') {
      if (e.target.value.length < 4) {
        setState((prevState) => ({
          ...prevState,
          errors: {
            ...prevState.errors,
            profession: 'Profession name is too short',
          },
          isValid: false,
        }));
        return;
      }
      const re = /^[a-zA-Z\s]*$/;
      if (re.test(String(e.target.value).toLowerCase())) {
        setState((prevState) => ({
          ...prevState,
          errors: { ...prevState.errors, profession: '' },
          isValid: !(
            state.errors.email ||
            state.errors.password ||
            state.errors.name ||
            state.errors.focus
          ),
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          errors: {
            ...prevState.errors,
            profession: 'Your profession name must only contain letters',
          },
        }));
      }
    }
    if (inputName === 'focus') {
      if (e.target.value !== '0') {
        setState((prevState) => ({
          ...prevState,
          errors: {
            ...prevState.errors,
            focus: '',
          },
          isValid: !(
            state.errors.email ||
            state.errors.password ||
            state.errors.name ||
            state.errors.profession
          ),
        }));
      }
    }
  }

  const handleSubmit = (e) => {
    // destructure the state, less variables declared
    e.preventDefault();
    const { type, inputs } = state;
    dispatch(registerAction(type, inputs));
  };

  const handleChange = (e) => {
    // changes the inputs values
    setState((state) => ({
      ...state,
      inputs: {
        ...state.inputs,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleTypeChange = (e) => {
    // change type student or tutor
    setState((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <form className="register-form">
        <h2 className="register-form__title">Register</h2>

        <div className="register-form__choose-role">
          <h5 className="register-form__t-s">Are you a student or a tutor?</h5>
          <select
            name="type"
            onChange={handleTypeChange}
            className="register-form__dropdown"
          >
            <option>student</option>
            <option>tutor</option>
          </select>
        </div>

        <div className="register-form__inputs">
          <FaUserAlt className="register-form__icon" />
          <input
            onBlur={validateInputs}
            onChange={handleChange}
            type="text"
            placeholder="Name"
            name="name"
            required
          />
        </div>
        <span>{state.errors.name}</span>

        <div className="register-form__inputs">
          <FaEnvelope className="register-form__icon" />
          <input
            onBlur={validateInputs}
            type="text"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
        </div>
        <span>{state.errors.email}</span>
        <div className="register-form__inputs">
          <FaKey className="register-form__icon" />
          <input
            onBlur={validateInputs}
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <span>{state.errors.password}</span>
        {state.type === 'tutor' && (
          <FormTutor
            handleChange={handleChange}
            validateInputs={validateInputs}
            errors={{
              profession: state.errors.profession,
              focus: state.errors.focus,
            }}
          />
        )}
        <button
          type="submit"
          className={`register-form__button ${!state.isValid && 'disabled'}`}
          disabled={!state.isValid}
          onClick={handleSubmit}
        >
          Register
        </button>
        <p className="register-form__account">
          Do you already have an account? <Link to="/sign in">Sign in</Link>
        </p>
      </form>
    </>
  );
}
export default Register;
