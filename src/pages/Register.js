import { render } from '@testing-library/react';
import React, { Fragment } from 'react'
import register from '../assets/styles/pages/register.css'
import { FaUserAlt, FaEnvelope, FaKey } from "react-icons/fa";
import { useState } from 'react'
import FormTutor from '../components/FormTutor';
import { Link, link } from 'react-router-dom';
import { appendErrors, useForm } from 'react-hook-form'

function Register() {
  const [form, setForm] = useState({ role: 'student' })

  const { register, handleSubmit, formState: { errors } } = useForm();

  function onSubmit(){
    console.log(form)
  }
  const addData = (e) => {
    setForm((form) => ({...form, [e.target.name]: e.target.value }))
  }
  return (
    <Fragment>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Register</h2>
        <div className="form__inputs">
          <FaUserAlt className="form__icon" />
          <input type="text" placeholder="Name" name="name"
            {...register('name', {
              required: 'This is required',
              pattern: { value: /\s*([A-Za-z]+)+\s*/, message: "Your name must have only letters" },
            })}
            onChange={addData} />
        </div>
        {errors.name && <p className="form__v">{errors.name.message}</p>}
        <div className="form__inputs">
          <FaEnvelope className="form__icon" />
          <input type="text" placeholder="Email" name="email"
            {...register('email', {
              required: 'This is required',
              pattern: { value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/, message: " Your email is incorrect" },
            })}
            onChange={addData} />
        </div>
        {errors.email && <p className="form__v">{errors.email.message}</p>}
        <div className="form__inputs">
          <FaKey className="form__icon" />
          <input type="password" placeholder="Password" name="password"
            {...register('password', {
              required: 'This is required',
              minLength: { value: 8, message: 'minimum password of 8 characters' }
            })}
            onChange={addData} />
        </div>
        {errors.password && <p className="form__v">{errors.password.message}</p>}
        <div className="form__choose-role">
          <h5 className="form__t-s">Do you want being student or tutor?</h5>
          <select name='role' onChange={addData}>
            <option>student</option>
            <option>tutor</option>
          </select>
        </div>
        <p className="form__tutor">{form.role === 'tutor' ? <FormTutor addData={addData} /> : ""}</p>
        <button type="submit" className="form__button">Register</button>
        <p className="form__account">Do you already have an account? <Link to="/sign in">Sign in</Link></p>
      </form>
    </Fragment>
  )
}
export default Register;