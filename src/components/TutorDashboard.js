import React, { useState } from 'react';
import '../assets/styles/components/TutorDashboard.scss';
import history from '../utils/history';

function TutorDashboard() {
  const location = history.location.pathname;
  function handleClick(e) {
    e.preventDefault();
    history.push(`/${e.target.name}`);
  }
  function handleChange(e) {
    history.push(`/${e.target.value}`);
  }

  return (
    <main className="tutor-dashboard__body">
      <select name="page selector" className="tutor-dashboard__selector" onChange={handleChange}>
        <option className="tutor-dashboard__selector-element" value="profile">
          Profile
        </option>
        <option className="tutor-dashboard__selector-element" value="tutorship">
          Tutorships
        </option>
        <option className="tutor-dashboard__selector-element" value="tutorship history">
          Tutorships History
        </option>
      </select>
      <button
        className={location === '/profile' ? 'tutor-dashboard__button-selected' : 'tutor-dashboard__button'}
        onClick={handleClick}
        name="profile"
      >
        Profile
      </button>
      <button
        className={location === '/create tutorship' ? 'tutor-dashboard__button-selected' : 'tutor-dashboard__button'}
        onClick={handleClick}
        name="create tutorship"
      >
        Create Tutorship
      </button>
      <button
        className={location === '/tutorship history' ? 'tutor-dashboard__button-selected' : 'tutor-dashboard__button'}
        onClick={handleClick}
        name="tutorship history"
      >
        Tutorships History
      </button>
    </main>
  );
}

export default TutorDashboard;
