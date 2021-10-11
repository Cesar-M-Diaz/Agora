import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import { useSelector } from 'react-redux';
import TutorDashboard from '../components/TutorDashboard';
import '../assets/styles/pages/TutorEditProfile.scss';
import history from '../utils/history';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function TutorProfilePage() {
  const MySwal = withReactContent(Swal);
  const globalUser = useSelector((state) => state.currentUser);
  const token = useSelector((state) => state.token);
  const [previewPhoto, setPreviewPhoto] = useState('');
  const [image, setImage] = useState('');
  const [profileMode, setProfileMode] = useState('view');
  const [previewData, setPreviewData] = useState({
    name: '',
    email: '',
    description: '',
    schedule: '',
  });
  const [userData, setUserData] = useState({
    inputs: {
      name: '',
      email: '',
      password: '',
      description: '',
      schedule: '',
    },
    errors: {
      name: '',
      email: '',
      password: '',
      schedule: '',
    },
    isValid: { name: true, password: true, email: true, schedule: true },
    enableUpload: true,
  });

  useEffect(() => {
    setPreviewData((state) => ({
      ...state,
      name: globalUser.name,
      email: globalUser.email,
      description: globalUser.description,
      schedule: globalUser.schedule,
    }));
    setPreviewPhoto(globalUser.profile_photo);
  }, [globalUser]);

  function handleChange(e) {
    setUserData((state) => ({
      ...state,
      inputs: {
        ...state.inputs,
        [e.target.name]: e.target.value,
      },
    }));
  }

  function enableEditMode(e) {
    e.preventDefault();
    setProfileMode('edit');
  }

  function cancelEdit(e) {
    e.preventDefault();
    setProfileMode('view');
    setPreviewPhoto(globalUser.profile_photo);
    setUserData((state) => ({
      ...state,
      inputs: {
        name: globalUser.name,
        email: globalUser.email,
        description: globalUser.description,
        schedule: globalUser.schedule,
        password: '',
      },
      errors: { name: '', email: '', password: '', schedule: '' },
      isValid: { name: true, password: true, email: true, schedule: true },
      enableUpload: true,
    }));
  }

  function validateInput(e) {
    const input = e.target.name;
    const value = e.target.value;
    if (input === 'name') {
      const re = /^[a-zA-Z\s]*$/;
      if (value.length < 4) {
        setUserData((state) => ({
          ...state,
          errors: {
            ...state.errors,
            name: 'Name is too short',
          },
          isValid: { ...state.isValid, name: false },
          enableUpload: false,
        }));
      } else if (!re.test(String(e.target.value).toLowerCase())) {
        setUserData((state) => ({
          ...state,
          errors: {
            ...state.errors,
            name: 'Name must only contain letters',
          },
          isValid: { ...state.isValid, name: false },
          enableUpload: false,
        }));
      } else {
        setUserData((state) => ({
          ...state,
          errors: {
            ...state.errors,
            name: '',
          },
          isValid: { ...state.isValid, name: true },
          enableUpload: state.isValid.password && state.isValid.email && state.isValid.schedule,
        }));
      }
    }
    if (input === 'email') {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(String(value).toLowerCase())) {
        setUserData((state) => ({
          ...state,
          errors: {
            ...state.errors,
            email: 'Invalid email, please enter a valid email',
          },
          isValid: { ...state.isValid, email: false },
          enableUpload: false,
        }));
      } else {
        setUserData((state) => ({
          ...state,
          errors: {
            ...state.errors,
            email: '',
          },
          isValid: { ...state.isValid, email: true },
          enableUpload: state.isValid.name && state.isValid.password && state.isValid.schedule,
        }));
      }
    }
    if (input === 'password') {
      if (value.length < 4 || value.length === null) {
        setUserData((state) => ({
          ...state,
          errors: {
            ...state.errors,
            password: 'Password is too short',
          },
          isValid: { ...state.isValid, password: false },
          enableUpload: false,
        }));
      } else {
        setUserData((state) => ({
          ...state,
          errors: {
            ...state.errors,
            password: '',
          },
          isValid: { ...state.isValid, password: true },
          enableUpload: state.isValid.name && state.isValid.email && state.isValid.schedule,
        }));
      }
    }
    if (input === 'schedule') {
      if (!value.includes('from') && !value.includes('to')) {
        setUserData((state) => ({
          ...state,
          errors: {
            ...state.errors,
            schedule: 'Invalid format, please type from (day) to (day), from (hour) to (hour)',
          },
          isValid: { ...state.isValid, schedule: false },
          enableUpload: false,
        }));
      } else {
        setUserData((state) => ({
          ...state,
          errors: {
            ...state.errors,
            schedule: '',
          },
          isValid: { ...state.isValid, schedule: true },
          enableUpload: state.isValid.name && state.isValid.password && state.isValid.email,
        }));
      }
    }
  }

  function onChangeFile(e) {
    setImage(e.target.files[0]);
    setPreviewPhoto(URL.createObjectURL(e.target.files[0]));
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (image) {
      formData.append('image', image);
    }
    updateTutorProfile(userData.inputs, formData, token);
  };

  const updateTutorProfile = async (inputs, formData, token) => {
    try {
      const { data: url } = await axios.patch('/uploadProfileImage', formData);
      const response = await axios.patch('/update', {
        formData,
        inputs,
        url,
        token,
        type: 'tutor',
      });
      localStorage.setItem('token', response.data);
      MySwal.fire({
        icon: 'success',
        title: <p className="swal__tittle">Your data was updated successfully!</p>,
        confirmButtonColor: '#0de26f',
      }).then(() => {
        history.go(0);
      });
    } catch (error) {
      setUserData((state) => ({
        ...state,
        errors: {
          ...state.errors,
          email: 'Email is taken, please use a different email',
        },
      }));
    }
  };

  return (
    <div className="tutor-edit__body">
      <TutorDashboard />
      <div className="tutor-edit__profile-body">
        <div className="tutor-edit__photo-container">
          <img src={previewPhoto} className="tutor-edit__photo" alt="user" />
          <label
            htmlFor="upload"
            className={profileMode === 'edit' ? 'tutor-edit__button-photo' : 'tutor-edit__button-photo-disabled'}
          >
            upload photo
          </label>
          <input type="file" id="upload" onChange={onChangeFile} hidden disabled={profileMode === 'view'} />
        </div>
        <form action="" className="tutor-edit__form" onSubmit={onSubmit}>
          {profileMode !== 'edit' && (
            <button className="tutor-edit__button-edit" onClick={enableEditMode}>
              Edit Profile
            </button>
          )}
          {profileMode !== 'view' && (
            <div className="tutor-edit__button-container">
              <input
                type="submit"
                value="save changes"
                className={`tutor-edit__button-submit ${!userData.enableUpload && 'disabled'}`}
                disabled={!userData.enableUpload}
              />
              <button className="tutor-edit__button-cancel" onClick={cancelEdit}>
                cancel
              </button>
            </div>
          )}
          <div className="tutor-edit__form-slot">
            <label>Name</label>
            <input
              onBlur={validateInput}
              type="text"
              name="name"
              defaultValue={previewData.name}
              onChange={handleChange}
              disabled={profileMode === 'view'}
            />
            <span className="tutor-edit__errors">{userData.errors.name}</span>
          </div>
          <div className="tutor-edit__form-slot">
            <label>Email</label>
            <input
              onBlur={validateInput}
              defaultValue={previewData.email}
              type="text"
              name="email"
              onChange={handleChange}
              disabled={profileMode === 'view'}
            />
            <span className="tutor-edit__errors">{userData.errors.email}</span>
          </div>
          <div className="tutor-edit__form-slot">
            <label>Password</label>
            <input
              onBlur={validateInput}
              defaultValue="12345"
              type="password"
              name="password"
              onChange={handleChange}
              disabled={profileMode === 'view'}
            />
            <span className="tutor-edit__errors">{userData.errors.password}</span>
            <div className="tutor-edit__form-slot">
              <label>Schedule</label>
              <input
                onBlur={validateInput}
                defaultValue={previewData.schedule}
                placeholder="please type your schedule, example from mondays to fridays, from 8:30am to 5:00pm"
                type="text"
                name="schedule"
                onChange={handleChange}
                disabled={profileMode === 'view'}
              />
              <span className="tutor-edit__errors">{userData.errors.schedule}</span>
            </div>
          </div>
          <div className="tutor-edit__form-slot">
            <label>Description</label>
            <textarea
              id="form"
              name="description"
              onChange={handleChange}
              defaultValue={previewData.description}
              placeholder="Let our students know something about you"
              cols="30"
              rows="10"
              className="tutor-edit__form-description"
              disabled={profileMode === 'view'}
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TutorProfilePage;
