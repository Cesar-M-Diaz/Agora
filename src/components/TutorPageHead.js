import React from 'react';
import history from '../utils/history';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function TutorPageHead({ tutor }) {
  const starNodes = [];

  for (let i = 1; i <= tutor.rating; i++) {
    starNodes.push(<FontAwesomeIcon icon={faStar} />);
  }

  function onClick(e) {
    e.preventDefault();
    history.push('/pay');
  }

  return (
    <main className="tutor-profile__profile-container">
      <img src={tutor.profile_photo} alt="" className="tutor-profile__photo" />
      <div className="tutor-profile__profile-container-text">
        <h1 className="tutor-profile__title">{tutor.name}</h1>
        <h2 className="tutor-profile__subtitle">{tutor.profession}</h2>
        <h2 className="tutor-profile__subtitle">Area: {tutor.focus}</h2>
        <div className="tutor-profile__stars">{starNodes}</div>
      </div>
      <div className="tutor-profile__schedule-container">
        <h2 className="tutor-profile__subtitle">Availability</h2>
        <h3 className="tutor-profile__availability">{tutor.schedule}</h3>
        <button onClick={onClick} className="tutor-profile__schedule-button">
          Schedule Appointment
        </button>
      </div>
    </main>
  );
}

export { TutorPageHead };
