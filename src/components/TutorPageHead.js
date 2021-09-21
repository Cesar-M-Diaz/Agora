import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function TutorPageHead({ tutor }) {
  const starNodes = [];

  for (let i = 1; i <= tutor.rating; i++) {
    starNodes.push(<FontAwesomeIcon icon={faStar} />);
  }

  function onClick(e) {
    e.preventDefault();
    console.log('click');
  }

  return (
    <main>
      <img src={tutor.profile_photo} alt="" />
      <div>
        <h1>{tutor.name}</h1>
        <h2>{tutor.profession}</h2>
        <h2>{tutor.focus}</h2>
        <div className="profile-stars">{starNodes}</div>
      </div>
      <div>
        <h2>Availability</h2>
        <h3>{tutor.schedule}</h3>
        <button onClick={onClick}>Schedule Appointment</button>
      </div>
    </main>
  );
}

export { TutorPageHead };
