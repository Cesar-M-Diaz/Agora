import React from 'react';

import TutorDashboard from '../components/TutorDashboard';
import TutorProfileTutorships from '../components/tutorProfileTutorships.js'

import '../assets/styles/pages/TutorEditProfile.scss';

function TutorshipHistory() {

  return (
    <div className="tutor-edit__body">
      <TutorDashboard />
      <TutorProfileTutorships/>
      
    </div>
  );
}

export default TutorshipHistory;
