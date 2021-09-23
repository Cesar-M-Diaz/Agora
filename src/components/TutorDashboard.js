import React from 'react';
import '../assets/styles/components/TutorDashboard.scss';

function TutorDashboard() {
  return (
    <main className="tutor-dashboard__body">
      <select name="page selector" className="tutor-dashboard__selector">
        <option className="tutor-dashboard__selector-element">Edit profile</option>
        <option className="tutor-dashboard__selector-element">Tutorships</option>
        <option className="tutor-dashboard__selector-element">Tutorships History</option>
      </select>
      <button className="tutor-dashboard__button">Edit profile</button>
      <button className="tutor-dashboard__button">Tutorships</button>
      <button className="tutor-dashboard__button">Tutorships History</button>
    </main>
  );
}

export default TutorDashboard;
