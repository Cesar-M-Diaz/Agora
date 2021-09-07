import React from 'react';
import { TutorPageHead } from '../components/TutorPageHead';
import { TutorDescription } from '../components/TutorDescription';
import { tutor as tutors } from '../components/mock/tutor';
import { ReviewsContainer } from '../components/ReviewsContainer';
import { reviews } from '../components/mock/reviews';
import '../assets/styles/pages/TutorProfile.css';

function TutorProfile() {
  const tutor = tutors[0];

  return (
    <div className="tutor-profile__body">
      <TutorPageHead tutor={tutor} id={tutor._id} />
      <TutorDescription tutor={tutor} id={tutor._id} />
      <ReviewsContainer reviews={reviews} />
    </div>
  );
}

export { TutorProfile };
