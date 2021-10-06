import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import TutorDashboard from '../components/TutorDashboard';
import { useSelector } from 'react-redux';
import '../assets/styles/pages/TutorEditProfile.scss';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import '../assets/styles/pages/Tutorship.scss';

function TutorshipPage() {
  const MySwal = withReactContent(Swal);
  const tutor_id = useSelector((state) => state.currentUser._id);
  const [tutorshipData, setTutorshipData] = useState({
    name: '',
    email: '',
    description: '',
    tutor_id: '',
  });
  const [errors, setErrors] = useState({
    errors: {
      name: '',
      email: '',
      description: '',
    },
    isValid: { name: false, email: false, description: false },
    enableUpload: false,
  });

  useEffect(() => {
    setTutorshipData((state) => ({
      ...state,
      tutor_id: tutor_id,
    }));
  }, [tutor_id]);

  function handleChange(e) {
    setTutorshipData((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  }

  function validateInput(e) {
    const input = e.target.name;
    const value = e.target.value;
    if (input === 'name') {
      const re = /^[a-zA-Z\s]*$/;
      if (value.length < 4) {
        setErrors((state) => ({
          ...state,
          errors: {
            ...state.errors,
            name: 'Name is too short',
          },
          isValid: { ...state.isValid, name: false },
          enableUpload: false,
        }));
      } else if (!re.test(String(e.target.value).toLowerCase())) {
        setErrors((state) => ({
          ...state,
          errors: {
            ...state.errors,
            name: 'Name must only contain letters',
          },
          isValid: { ...state.isValid, name: false },
          enableUpload: false,
        }));
      } else {
        setErrors((state) => ({
          ...state,
          errors: {
            ...state.errors,
            name: '',
          },
          isValid: { ...state.isValid, name: true },
          enableUpload: state.isValid.email && state.isValid.description,
        }));
      }
    }
    if (input === 'email') {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(String(value).toLowerCase())) {
        setErrors((state) => ({
          ...state,
          errors: {
            ...state.errors,
            email: 'Invalid email, please enter a valid email',
          },
          isValid: { ...state.isValid, email: false },
          enableUpload: false,
        }));
      } else {
        setErrors((state) => ({
          ...state,
          errors: {
            ...state.errors,
            email: '',
          },
          isValid: { ...state.isValid, email: true },
          enableUpload: state.isValid.name && state.isValid.description,
        }));
      }
    }
    if (input === 'description') {
      if (value.length < 30) {
        setErrors((state) => ({
          ...state,
          errors: {
            ...state.errors,
            description: 'Description is to short',
          },
          isValid: { ...state.isValid, description: false },
          enableUpload: false,
        }));
      } else {
        setErrors((state) => ({
          ...state,
          errors: {
            ...state.errors,
            description: '',
          },
          isValid: { ...state.isValid, description: true },
          enableUpload: state.isValid.name && state.isValid.email,
        }));
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(tutorshipData);
    try {
      await axios.post('/tutorship', tutorshipData);
      MySwal.fire({
        icon: 'success',
        title: <p className="swal__tittle">Successful Registration</p>,
        text: 'tutorship created !',
        confirmButtonColor: '#0de26f',
      });
    } catch (err) {
      const errorMessage = err.response.data.message;
      MySwal.fire({
        icon: 'error',
        title: <p className="swal__tittle">Oops...</p>,
        text: errorMessage,
        confirmButtonColor: '#ce4c4c',
      });
    }
    setTutorshipData((state) => ({
      ...state,
      name: '',
      email: '',
      description: '',
    }));
  }

  return (
    <div className="tutorship__body">
      <TutorDashboard />
      <div className="tutorship__profile-body">
        <form action="" className="tutorship__form" onSubmit={handleSubmit}>
          <div className="tutorship__form-slot">
            <label>Student Name</label>
            <input
              onBlur={validateInput}
              type="text"
              name="name"
              placeholder="Student name"
              onChange={handleChange}
              value={tutorshipData.name}
            />
            <span className="tutorship__errors">{errors.errors.name}</span>
          </div>
          <div className="tutorship__form-slot">
            <label>Student Email</label>
            <input
              onBlur={validateInput}
              type="text"
              name="email"
              value={tutorshipData.email}
              placeholder="Student email"
              onChange={handleChange}
            />
            <span className="tutorship__errors">{errors.errors.email}</span>
          </div>
          <div className="tutorship__form-slot">
            <label>Description</label>
            <textarea
              id="form"
              name="description"
              placeholder="Tutorship description"
              onChange={handleChange}
              onBlur={validateInput}
              value={tutorshipData.description}
              cols="30"
              rows="10"
              className="tutorship__form-description"
            ></textarea>
            <span className="tutorship__errors">{errors.errors.description}</span>
          </div>
          <div className="tutorship__button-container">
            <input
              type="submit"
              value="Save Tutorship"
              className="tutorship__button-submit"
              disabled={!errors.enableUpload}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default TutorshipPage;
