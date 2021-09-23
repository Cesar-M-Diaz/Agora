import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TutorDashboard from '../components/TutorDashboard';
import '../assets/styles/pages/TutorEditProfile.scss';

function TutorProfilePage() {
  const globalUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    tutor: {
      email: '',
      password: '',
      description: '',
    },
  });

  useEffect(() => {
    console.log('render');
  }, [globalUser, dispatch]);

  function onSubmit(e) {
    e.preventDefault();
    const { tutor } = userData;
    console.log(tutor);
    // dispatch();
  }

  function handleChange(e) {
    setUserData((userData) => ({
      tutor: {
        ...userData.tutor,
        [e.target.name]: e.target.value,
      },
    }));
  }

  return (
    <div className="tutor-edit__body">
      <TutorDashboard />
      <div className="tutor-edit__profile-body">
        <div className="tutor-edit__photo-container">
          <img src={globalUser.profile_photo} />
          <button>upload photo</button>
        </div>
        <form action="" className="" onSubmit={onSubmit}>
          <div className="tutor-edit__form-slot">
            <label>Email</label>
            <input
              type="text"
              name="email"
              className=""
              defaultValue={globalUser.email}
              onChange={handleChange}
            />
          </div>
          <div className="tutor-edit__form-slot">
            <label>Password</label>
            <input
              type="text"
              name="password"
              className=""
              placeholder="type new password"
              onChange={handleChange}
            />
          </div>
          <div className="tutor-edit__form-slot">
            <label>Description</label>
            <input
              type="text"
              name="description"
              defaultValue={globalUser.description}
              onChange={handleChange}
              className="tutor-edit__form-description"
              s
            />
          </div>
          <input
            type="submit"
            value="edit profile"
            className="tutor-edit__button-submit"
          />
        </form>
      </div>
    </div>
  );
}

export default TutorProfilePage;
