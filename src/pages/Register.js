import { render } from '@testing-library/react';
import React from 'react'
import register from '../assets/styles/pages/register.css'
import { FaUserAlt, FaEnvelope, FaKey } from "react-icons/fa";
import { useState } from 'react'
import FormTutor from '../components/FormTutor';
import { Link, link } from 'react-router-dom'

function Register() {
  const [form, setForm] = useState({ role: 'student' })
  const [errorData, setErrorData] = useState('')

  function addData(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  function validateInfo() {
    !form.Name || !form.Email || !form.Password ? setErrorData("please fill in all the fields") : setErrorData("")
  }
  function handleSubmit(e) {
    validateInfo()
    e.preventDefault();
  }
  return (
    <>
      <form className="form">
        <h2>Register</h2>
        <div className="form__inputs">
          <FaUserAlt className="form__icon" />
          <input type="text" placeholder="Name" name="Name" onChange={addData} />
        </div>
        <div className="form__inputs">
          <FaEnvelope className="form__icon" />
          <input type="text" placeholder="Email" name="Email" onChange={addData} />
        </div>
        <div className="form__inputs">
          <FaKey className="form__icon" />
          <input type="password" placeholder="Password" name="Password" onChange={addData} />
        </div>
        <div className="form__choose-role">
          <h5 className="form__t-s">Do you want being student or tutor?</h5>
          <select name='role' onChange={addData}>
            <option>student</option>
            <option>tutor</option>
          </select>
        </div>
        <p className="form__tutor">{form.role === 'tutor' ? <FormTutor addData={addData} /> : ""}</p>
        <div>
          <p className="form__error">{errorData}</p>
        </div>
        <button className="form__button" onClick={handleSubmit}>Register</button>
        <p className="form__account">Do you already have an account? <Link to="/sign in">Sign in</Link> </p>
      </form>
    </>
  )
}
export default Register;