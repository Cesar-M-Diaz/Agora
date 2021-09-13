import React from 'react';
import { FaUserAlt, FaEnvelope, FaKey } from 'react-icons/fa';
import { useState } from 'react';
import FormTutor from '../components/FormTutor';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import '../assets/styles/pages/register.scss';

function Register() {
  const [form, setForm] = useState({ role: 'student' });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit() {
    console.log(form);
  }
  const addData = (e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  };
  return (
    <>
      <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="register-form__title">Register</h2>
        <div className="register-form__choose-role">
          <h5 className="register-form__t-s">Are you a student or a tutor?</h5>
          <select
            name="role"
            className="register-form__dropdown"
            onChange={addData}
          >
            <option>student</option>
            <option>tutor</option>
          </select>
        </div>
        <p className="register-form__tutor">
          {form.role === 'tutor' ? <FormTutor addData={addData} /> : ''}
        </p>
        <div className="register-form__inputs">
          <FaUserAlt className="register-form__icon" />
          <input
            type="text"
            placeholder="Name"
            name="name"
            {...register('name', {
              required: 'This is required',
              pattern: {
                value: /\s*([A-Za-z]+)+\s*/,
                message: 'Your name must have only letters',
              },
            })}
            onChange={addData}
          />
        </div>
        {errors.name && (
          <p className="register-form__v">{errors.name.message}</p>
        )}
        <div className="register-form__inputs">
          <FaEnvelope className="register-form__icon" />
          <input
            type="text"
            placeholder="Email"
            name="email"
            {...register('email', {
              required: 'This is required',
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
                message: ' Your email is incorrect',
              },
            })}
            onChange={addData}
          />
        </div>
        {errors.email && (
          <p className="register-form__v">{errors.email.message}</p>
        )}
        <div className="register-form__inputs">
          <FaKey className="register-form__icon" />
          <input
            type="password"
            placeholder="Password"
            name="password"
            {...register('password', {
              required: 'This is required',
              minLength: {
                value: 8,
                message: 'minimum password of 8 characters',
              },
            })}
            onChange={addData}
          />
        </div>
        {errors.password && (
          <p className="register-form__v">{errors.password.message}</p>
        )}

        <button type="submit" className="register-form__button">
          Register
        </button>
        <p className="register-form__account">
          Do you already have an account? <Link to="/login">Sign in</Link>
        </p>
      </form>
    </>
  );
}
export default Register;
