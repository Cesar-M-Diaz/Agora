import React from 'react';
import TutorDashboard from '../components/TutorDashboard';
import '../assets/styles/pages/TutorEditProfile.scss';

function TutorshipPage() {
  return (
    <div className="tutor-edit__body">
      <TutorDashboard />
      <div className="tutor-edit__profile-body">
        <h1>create tutorship</h1>
      </div>
    </div>
  );
}

export default TutorshipPage;
