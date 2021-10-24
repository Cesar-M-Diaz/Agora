import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function TutorPageHead({ tutor, tutorId }) {
  const starNodes = [];

  for (let i = 1; i <= tutor.rating; i++) {
    starNodes.push(<FontAwesomeIcon icon={faStar} key={i} title="tutor-rating-star" />);
  }

  return (
    <main className="tutor-profile__profile-container">
      <img src={tutor.profile_photo} alt="tutor profile" className="tutor-profile__photo" />
      <div className="tutor-profile__profile-container-text">
        <h1 className="tutor-profile__title">{tutor.name}</h1>
        <h2 className="tutor-profile__subtitle">{tutor.profession}</h2>
        <h2 className="tutor-profile__subtitle">Area: {tutor.focus}</h2>
        <p className="tutor-profile__subtitle">Tutorship Fee: COP ${tutor.price.toLocaleString()}</p>
        <div className="tutor-profile__stars">{starNodes}</div>
      </div>
      <div className="tutor-profile__schedule-container">
        <h2 className="tutor-profile__subtitle">Availability</h2>
        <h3 className="tutor-profile__availability">{tutor.schedule}</h3>
        <Link to={`/tutor/${tutorId}/schedule`} className="tutor-profile__schedule-button">
          Schedule Appointment
        </Link>
      </div>
    </main>
  );
}

export { TutorPageHead };
